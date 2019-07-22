# react 常用组件API调用的模块化封装

## 项目启动
####  npm install
####  npm run server

####  npm run build   发布  npm install  webpack-cli --save-dev  配置环境变量  cross-env

## 项目介绍
>  工作中发现我们在做react后台管理系统的时候，会有大量重复的页面（如下图），比如form表单和table组件、以及接口通讯，新增修改modal等。虽然antd里面的组件已经很简便了，但是遇到众多功能类似的页面，每次都复制大量的代码还是会耗费很大的时间而且不易维护，看起来很不清爽，于是找了个时间就把他们做了二次封装。 尽量涵盖了大多数的业务。

- form表单的README.md、请查看README.Form.md

- table表格的README.md、请查看README.Table.md

- Modal的README.md、请查看README.Modal.md

- webpack+antd+fetch 通讯、查看README.fetch.md