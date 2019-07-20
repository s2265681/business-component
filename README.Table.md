# react 常用组件API调用的模块化封装--table组件
>  工作中发现我们在做react后台管理系统的时候，会有大量重复的页面（如下图），比如form表单和table组件、以及接口通讯，新增修改modal等。虽然antd里面的组件已经很简便了，但是遇到众多功能类似的页面，每次都复制大量的代码还是会耗费很大的时间而且不易维护，看起来很不清爽，于是找了个时间就把他们做了二次封装。 尽量涵盖了大多数的业务。



### **table表格的封装**

> 封装的意义： 简化代码，提高可复用性，灵活的配置基础表格，优雅的对带单选，复选框的表格，分页的表格进行处理，以及点击每行的处理

> 完成后的效果
> ![在这里插入图片描述](https://img-blog.csdnimg.cn/20190719195115407.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDE2MDM4NQ==,size_16,color_FFFFFF,t===0x30==#pic_center)
#### 1. 新建basicTable组件
  > **在component中新建一个basicTable.js的表格,主要代码如下**
  > <br/>![在这里插入图片描述](https://img-blog.csdnimg.cn/20190719195255259.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDE2MDM4NQ==,size_16,color_FFFFFF,t_70#pic_center =700x900)
> **思路**
>1.独立出一个表格，把column、data等接口开放出去，通过父组件传进来
>2.处理传入的type类型，判断展示单选复选或者不选，注意的是，props传过来的无法直接改动，需要通过rowLeLection 过渡了一下。
>3.把分页功能独立到了Util方法中。 点击选择框时需要把每一行的index、key、每一行的值抛出去给父组件用，代码中通过回调函数在父组件中得到改变后的值，然后在把key值传回子组件



#### 2. 页面调用
  > **在component中新建一个basicTable.js的表格,主要代码如下**
  > <br/>
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190720111908803.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDE2MDM4NQ==,size_16,color_FFFFFF,t_70)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190720111901593.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDE2MDM4NQ==,size_16,color_FFFFFF,t_70)
>思路： 关键在于table组件中进行文本框选择时，通过回调函数onRef把值拿到页面中，进行下一步操作，通过selectedRowKeys 把 key值再传到tanle组件中 ， 达到灵活控制的目地。



#### 3. 分页的方法放到Util文件中，用时直接在页面调用引用即可
  >  在util 中的index.js中， 代码如下：
   ```
   
     pagination(data, callback) {
	    return {
	      onChange: current => {
	        callback(current);
	      },
	      current: data.result.page,
	      pageSize: data.result.page_size,
	      total: data.result.total_count,
	      showTotal: () => `共${data.result.total_count}条`,
	      showQuickJumper: true,
	    };
   },

 ```

> 引入如下：![在这里插入图片描述](https://img-blog.csdnimg.cn/20190720112843994.jpeg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDE2MDM4NQ==,size_16,color_FFFFFF,t_70)



#### 4. 具体方法的实现，没有贴出来，	请到github中获取
[github地址](https://github.com/s2265681/component)