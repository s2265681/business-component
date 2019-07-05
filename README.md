# 从零开始一个webpack+react项目

> 最近在做react组件化的分享，从项目中抽离组件，那么第一步自然是搭建相关的环境
> 本篇旨在从零开始，用最少的配置、最少的代码、最少的依赖来搭建一个最简单的webpack+react环境


> **第一步，初始化项目**
   - npm init  (注意文件名符合规范)

> **第二步，安装webpack、webpack-cli和webpack-dev-server，执行命令**
   - npm install webpack webpack-dev-server webpack-cli--save-dev
> **第三步，当前项目中新建一个public，并在下面新建一个index页面，写上内容，在文件夹下新建一个webpack.config.js,如图**
   - ![](https://images2018.cnblogs.com/blog/1131813/201808/1131813-20180817223642863-828558272.jpg)

> **第四步，接下来在package.json中配置web服务启动命令，该命令配置在scripts中的，其命令名称为“server”，命令详情为“webpack-dev-sever --open”：**
 
   ![](https://blog.rockshang.cn/WeChat033baab65ae9047d59153b4cbf27e9e2.png)

  - 这时执行 npm run server 就可以启动起页面了 
   ![](https://blog.rockshang.cn/WeChat8bd1e542412f897c51115bd981b387bb.png)

> **第五步，安装react和react-dom**（--save 本地和正式环境都需要不要带dev）
  - npm install react react-dom --save 
> **第六步，修改index页面，引入buble.js**

 ```
  <body>
    <div id='root'></div>
    <script  src='bundle.js'></script>
  </body>
 ```

> **第七步，在public 文件下面新建一个index.jsx文件，内容如下**

```
import React from 'react'
import { render } from 'react-dom'

class Hello extends React.Component {
    render() {
       return (
           <p>hello react！</p>
        )
    }
}
render(
    <Hello/>,
    document.getElementById('root')
)   

```


> **第八步，因为html不能直接应用jsx，而是需要webpack转换成js，让其引用，所以我们开始配置webpack，我们通过babel来转换jsx，所以安装babel** 

  - npm install babel-core babel-loader@7  babel-preset-es2015 babel-preset-react --save-dev


> **第九步，我们需要把jsx转换成buble.js,需要在webpack中配置入口和出口，然后通过bable处理jsx语法，打开webpack配置以下内容**

```
entry:__dirname+"/public/index.jsx",
output:{
     path:__dirname+"/public",
     filename:'bundle.js'
}

 module: {
    rules: [
         { test: /\.(jsx)$/, exclude: /node_modules/, loader: 'babel-loader' }
     ]    
 }

```

- 现在webpack是这样的
 ![webpack](https://blog.rockshang.cn/WechatIMG206.png)

> **第十步，在根目录添加一个.babelrc的文件配置去做处理，内容如下：
```
{
    "presets": ["react", "es2015"],
    "env": {
      "dev": {
          "plugins": [["react-transform", {
             "transforms": [{
               "transform": "react-transform-hmr",
               "imports": ["react"],
               "locals": ["module"]
             }]
          }]]
      }
    }
  }
```

> npm run server  就可以执行起来了， 最简单的react环境就搭建好了

> 最终项目结构
 ![webpack](https://github.com/s2265681/react-webpack.git)


> 项目代码
  
 github 链接 ： 
  * [点击]()