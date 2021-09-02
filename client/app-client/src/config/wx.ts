export default {
    config: {
        appId: 'ww8aa94842ca99adeb', // 企业微信 id
        debug: true,
        nonceStr: '6_GM7j-HNb9Db_xvqTsMbOwviYkPvE-08jgKfvPXj_k', // 加密字符串
        timestamp: (new Date()).getTime(), // 加密时间戳
    },
    // 这里的 agentid 为企业微信申请的 应用 id
    agentid: '1000020',
    // 这里的 appName 为 http://weichat-certcenter.talefun.com/ 认证中心配置的 appName
    appName: 'talefun-timesheet-server',
};