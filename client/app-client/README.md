## 管理系统由 Vue 3 + Typescript + Vite 搭建
---

#### **目录结构**
```
|-- dist
|-- node_modules
|-- public
|-- src
    |-- api                 // 后端接口目录
        |-- result.ts       // 请求状态码文件
        |-- ....
    |-- assets              // 静态资源目录
    |-- components          // 组件
    |-- composition         // 页面逻辑代码
        |-- base.ts         // 常用变量和方法     
        |-- ....              
    |-- config              // 系统配置
        |-- settings.ts     
    |-- layout              // 布局
    |-- libs                // 登录权限验证
        |-- checkRule.ts    // 判断权限加载异步路由      
        |-- http.ts         // 发送请求模块
        |-- index.ts        // 路由判断 
        |-- wxAuth.ts       // 微信登录验证    
    |-- router              // 路由
    |-- store               // 全局状态管理
    |-- styles              // 全局样式
    |-- utils               // 工具函数
    |-- views               // 页面
|-- .env.development        // 开发环境变量
|-- .env.production         // 生产环境变量
|-- index.html
|-- package.json
|-- tsconfig.json
|-- vite.config.ts
```


#### 路由权限控制
* src/api/user.ts 文件getUserInfo中，请求用户模块权限返回
* 路由meta对象中添加rule属性，例：`rule: ["userManager"]`


#### 导航
`仅有一个子菜单时，若要保留当前导航层级结构，需要在父级路由的meta对象中设置useDropDown为true即可`

#### 第三方模块
```
axios
element-plus
lodash
nprogress             // 页面加载进度条
vue
vue-router
vuex
wx-auth               //微信授权模块
tslib                 //微信授权模块依赖
```

