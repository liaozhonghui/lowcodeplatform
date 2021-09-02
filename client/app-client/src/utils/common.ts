// 获取URL参数
export const getURLParameters = (url: string) => {
    return (url.match(/([^?=&]+)(=([^&]*))/g) || []).reduce((a: any, v: any) => {
        a[v.slice(0, v.indexOf('='))] = v.slice(v.indexOf('=') + 1)
        return a
    }, {})
};