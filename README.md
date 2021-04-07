# vueschool-forum

> awesome forum
* 使用vue-cli 搭建，[模板](https://github.com/vuejs-templates/webpack)
* 用到 firebase 作为后台【所以需要梯子】
* 使用 netlify  部署 ，[在线例子](https://epic-brown-5d42be.netlify.app/)

#### features
- [x] 游客可以查看讨论，可以根据分类找到不同的论坛，查看讨论
- [ ] 查看其他用户的基本信息
- [x] 用户查看自己的profile,与最近发表的言论并进行修改
- []  修改之后可以看到修改的时间
- [x] 用户登录，注册
- [x] 注册等表单校验 【用到 vuelidate】
    * [x] 对于已经注册的用户名即邮箱进行限制
    * [x] 对于发表言论长度，密码等进行限制
- [x] 用户发送讨论，可以查看发表的时间
- [x] 可以修改评论
- [] 在其他用户发言下发表言论
- [x] 用户可以发起讨论
- [x] 响应式

#### 使用到的依赖
* momentjs
* vuelidate
* nprogress
## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

> 注意：可能会遇到循环依赖的警告。这是因为node 14.0 以上的错误，使用nvm 把版本切换为12.* 就可以了，我这里使用12.18.4

pagckage.json 参数 https://nodejs.org/api/cli.html#cli_unhandled_rejections_mode
如果不添加的话：产生如下错误 ，大意是有异步erro 没有被异常处理
>UnhandledPromiseRejectionWarning: Error: spawn cmd ENOENT

并且会有提示：【也就是所之后的的这种waring 也被废弃，无关紧要的问题】
[DEP0018] DeprecationWarning: Unhandled promise rejections are deprecated. In the future, promise rejections that are 
not handled will terminate the Node.js process with a non-zero exit code.