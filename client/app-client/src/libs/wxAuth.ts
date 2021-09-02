import axios from 'axios'
import wx from '../config/wx'
import { WXUserInfo, WeChart } from 'wx-auth'
import { ElMessageBox, ElMessage } from 'element-plus'
import { getURLParameters } from '../utils/common'

const { appName, agentid } = wx;

const jsApiList = [
    'onMenuShareAppMessage',
    'onMenuShareWechat',
    'onMenuShareTimeline',
    'startRecord',
    'stopRecord',
    'onVoiceRecordEnd',
    'playVoice',
    'pauseVoice',
    'stopVoice',
    'onVoicePlayEnd',
    'uploadVoice',
    'downloadVoice',
    'chooseImage',
    'previewImage',
    'uploadImage',
    'downloadImage',
    'getLocalImgData',
    'previewFile',
    'getNetworkType',
    'onNetworkStatusChange',
    'openLocation',
    'getLocation',
    'startAutoLBS',
    'stopAutoLBS',
    'onLocationChange',
    'onHistoryBack',
    'hideOptionMenu',
    'showOptionMenu',
    'hideMenuItems',
    'showMenuItems',
    'hideAllNonBaseMenuItem',
    'showAllNonBaseMenuItem',
    'closeWindow',
    'openDefaultBrowser',
    'scanQRCode',
    'selectEnterpriseContact',
    'openEnterpriseChat',
    'chooseInvoice',
    'selectExternalContact',
    'getCurExternalContact',
    'openUserProfile',
    'shareAppMessage',
    'shareWechatMessage',
    'startWifi',
    'stopWifi',
    'connectWifi',
    'getWifiList',
    'onGetWifiList',
    'onWifiConnected',
    'getConnectedWifi',
    'setClipboardData',
    'getClipboardData',
];

const wxConfig = {...wx.config, jsApiList };

const wechart = WeChart.init(wxConfig, {}, agentid);

const http = axios.create({
    baseURL: 'http://weichat-certcenter.talefun.com/',
    headers: {
        'Content-Type': 'application/json',
    }
});

// 获取accessToken
const getAccessToken = async () => {
    return await http.get('/auth/weichat/getAccessToken', { params: { appName }})
        .then(function (resp) { return resp.data; })
        .then(function (resp) {
            if (resp?.data?.['talefun-weichat-certcenter']?.accessToken) {
                return resp.data['talefun-weichat-certcenter'].accessToken;
            } else {
                return '';
            }
        })
}

// 获取用户信息
const getUserInfo = async (code: string, accessToken: string) => {
    return await http.get('/auth/weichat/getWeichatUserInfo', { params: { appName: appName, code, accToken: accessToken }})
        .then(function (resp) {
            sessionStorage.setItem('freshtoken', resp.headers.freshtoken);
            sessionStorage.setItem('sessiontoken', resp.headers.sessiontoken);
            return resp.data;
        })
        .then(function (resp) {
            if (resp?.data) {
                if (resp.data?.['talefun-weichat-certcenter']?.userInfo) {
                    return resp.data['talefun-weichat-certcenter'].userInfo;
                } else {
                    return resp.data;
                }
            }
            else {
                return false;
            }
        })
}

const setToken = () => {
    const userInfo = sessionStorage.getItem('userInfo') || '';
    sessionStorage.setItem('sessiontoken', userInfo);
    sessionStorage.setItem('freshtoken', userInfo);   
}

const clearToken = () => {
    sessionStorage.removeItem('sessiontoken');
    sessionStorage.removeItem('freshtoken');
    sessionStorage.removeItem('userInfo');
}

// 重新验证
const resetToken = (type: string, userInfo?: any) => {
    clearToken();
    let title = '', content = '';
    if (type == 'checkerr') {
        title = '请重新验证';
        content = '验证错误！';
    } else if (type == 'codeerr') {
        title = '企业微信验证错误';
        content = `错误代码: ${(userInfo as any).errcode} .\n错误信息: ${(userInfo as any).errmsg}\n点击确定重新请求！`;
    }
    ElMessageBox.confirm(content, title, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
    }).then(function () { 
        return wechart.reCode(); 
    }).catch(function () { 
        return ElMessage({
            type: 'info', message: '请刷新页面！'
        }); 
    });
}

// 开发环境模拟用户
const devlopmentUser: WXUserInfo = {
    userId: '',
    name: '开发者',
    department: [],
    position: '开发者',
    mobile: '13211111111',
    gender: '1',
    email: '',
    avatar: '',
    status: 1,
    isleader: 0,
    extartter: {
        attrs: ['开发者'],
        english_name: 'string',
        telephone: 'string',
        enable: 0,
        hide_mobile: 0,
        order: [],
        qrcode: 'string',
    }
}

// 微信授权登录
const wxAuth = async () => {

    return new Promise(async (resolve, reject) => {

        const productionEnv = import.meta.env.MODE == 'production' ? true : false;

        // 开发环境
        if (!productionEnv) {
            wechart.cacheUser(devlopmentUser);
            setToken();
            resolve(true);
            return;
        }

        // 已登录跳过微信验证
        if (sessionStorage.getItem('sessiontoken') && sessionStorage.getItem('freshtoken') && sessionStorage.getItem('userInfo')) {
            await wechart.checkUser();
            resolve(true);
            return;
        }
        
        await wechart.bootstrap(async () => {
            if (!wechart.userInfo) {
                // 获取微信用户信息
                const accessToken = await getAccessToken();
                const userInfo: WXUserInfo | false = await getUserInfo(wechart.code, accessToken);
                if (userInfo !== false) {

                    // 验证码错误
                    if ((userInfo as any).errcode !== 0) {
                        resetToken('codeerr', userInfo);
                        resolve(true);
                        return;
                    }

                    // 缓存用户
                    await wechart.cacheUser(userInfo);
                    await wechart.checkUser();
                    setToken();
                    
                    // url参数剔除
                    let url = window.location.search;
                    const params = getURLParameters(url);
                    const paramsArr = [];
                    for (const key in params) {
                        if (!['appid', 'code', 'state'].includes(key)) {
                            paramsArr.push(`${key}=${params[key]}`);
                        }
                    }
                    url = paramsArr.join('&');
                    url = url ? '/?' + url : '/';
                    window.history.pushState(null, '', url);
                } else {
                    resetToken('checkerr');
                }
            }
            else {
                clearToken();
            }
            resolve(true)
        }).catch((err) => {
            resetToken('checkerr');
            resolve(true);
        });
    })
}

export {
    wxAuth
}
