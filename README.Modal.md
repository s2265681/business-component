# react 封装通用组件之Modal弹窗
>  工作中发现我们在做react后台管理系统的时候，会有大量重复的页面（如下图），比如form表单和table组件、以及接口通讯，新增修改modal等。虽然antd里面的组件已经很简便了，但是遇到众多功能类似的页面，每次都复制大量的代码还是会耗费很大的时间而且不易维护，看起来很不清爽，于是找了个时间就把他们做了二次封装。 尽量涵盖了大多数的业务。



### **Modal 弹窗的封装**

> 封装的意义： 简化代码，提高可复用性，工作中尤其是管理类的页面大多会涉及到新增、修改列表，多数情况下我们会在modal中进行，在修改时会调回显内容接口，在新增时清理调框内的内容。当我们封装好Modal组件后的好处，就是涉及到相关业务，只需要修改List即可，在list中选择你要在modal中展示的内容，和相关的关键词，下图只展示了输入框和下拉框，但是在组件的封装中其实封装了很多的内容，具体的可以拉下代码，详细的看一下，封装的过程可能会有点繁琐，但是在实践中，会相当便捷。

> 完成后的效果
> 
> ![在这里插入图片描述](https://img-blog.csdnimg.cn/20190720142435931.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDE2MDM4NQ==,size_16,color_FFFFFF,t_70)

![在这里插入图片描述](https://img-blog.csdnimg.cn/20190720142442114.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDE2MDM4NQ==,size_16,color_FFFFFF,t_70)
#### 1. 新建basicModal组件
  > **在component中新建一个basicModal.js的表格,主要代码如下**
  > <br/>![在这里插入图片描述](https://img-blog.csdnimg.cn/20190720143130121.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDE2MDM4NQ==,size_16,color_FFFFFF,t_70)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190720143214507.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDE2MDM4NQ==,size_16,color_FFFFFF,t_70)
- **代码较多，只能贴出一部分，详细代码点击下面的github获取** 
   
> **思路**
>1.通过组件封装一个Modal，将数组列表传递进来，遍历根据不同类型的判断把需要展示到页面的元素添加render出来。
>2. 在子组件中处理完数据后，通过this.props.方法 把内容提到页面中进行操作。
>3.把Radio、Checkbox 列表写到了Util方法中。 



#### 2. 页面调用
  > **在index.js 页面中的调用如下：**
  > <br/>

![在这里插入图片描述](https://img-blog.csdnimg.cn/20190720143829122.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDE2MDM4NQ==,size_16,color_FFFFFF,t_70)
> 在modalFormList中选择你需要的零件
> ![在这里插入图片描述](https://img-blog.csdnimg.cn/20190720143952988.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDE2MDM4NQ==,size_16,color_FFFFFF,t_70)
如图：只需要修改modalFormList数组中的对象即可，需要几个加几个，非常方便


#### 3. 处理radioList和CheckboxList在Util文件中

  >  在util 中的index.js中， 代码如下：![在这里插入图片描述](https://img-blog.csdnimg.cn/20190720144504508.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDE2MDM4NQ==,size_16,color_FFFFFF,t_70)


#### 4. 具体方法的实现，没有贴出来，	请到github中获取
[github地址](https://github.com/s2265681/component)
