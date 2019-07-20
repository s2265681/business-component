# react 常用组件API调用的模块化封装--form组件

>  工作中发现我们在做react后台管理系统的时候，会有大量重复的页面（如下图），比如form表单和table组件、以及接口通讯，新增修改modal等。虽然antd里面的组件已经很简便了，但是遇到众多功能类似的页面，每次都复制大量的代码还是会耗费很大的时间而且不易维护，看起来很不清爽，于是找了个时间就把他们做了二次封装。 尽量涵盖了大多数的业务。

### **table表格的封装**
   ![在这里插入图片描述](https://img-blog.csdnimg.cn/20190713173826516.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDE2MDM4NQ==,size_16,color_FFFFFF,t_70)


  ![在这里插入图片描述](https://img-blog.csdnimg.cn/20190713173906920.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDE2MDM4NQ==,size_16,color_FFFFFF,t_70)


> 1. 新建basicTable.js
     - 新建basicTable.js的表单,主要代码如下
      
     initFormList=()=>{
        const p = this;
        const formItemList = [];
        const { getFieldDecorator } = p.props.form;
        const { formList,extendFormList } = p.props;
        if (formList && formList.length > 0) {
        formList.forEach(item => {
            const {
            label,
            field,
            tree,
            type,
            initialValue,
            placeholder,
            width,
            name
            } = item;
       if (type === "INPUT") {
          const INPUT = (
            <FormItem key={field} label={label}>
            {getFieldDecorator(`${field}`,{
                initialValue, // true | false
            })(
                <Input style={{ width }} placeholder={placeholder} />
            )}
            </FormItem>
          );
          formItemList.push(INPUT);
        } else if (type === "SELECT") {
          const SELECT = (
            <FormItem label={label} key={field}>
            {getFieldDecorator(`${field}`,{
                initialValue, // true | false
            })(
              <Select style={{ width }} placeholder={placeholder}>
                {Utils.getOptionList(item.list, name)}
              </Select>
              )}
            </FormItem>
          );
          formItemList.push(SELECT);
     ```
    - 对组件中的list进行遍历，将样式 key label field initialValue等内容开放出去
    - 展开时的表单也是如此



> 2. 在util中写通用方法比如格式化时间，处理redio、Checkbox的方法
    - 封住表单中会有对时间组件的时间格式化处理，对radio、Checkbox列表的处理，代码如下：
    ```
    
       if(fieldsValue.beginTime){
            fieldsValue.beginTime = Utils.formateDate(fieldsValue.beginTime)
        }
        
    
      formateDate(time) {
        if (!time) return '';
        const date = new Date(time);
        return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
        }
       

> 3. 页面中引用调用-- 如格式化时间
 ```
 
     formateDate(time) {
		    if (!time) return '';
		    const date = new Date(time);
		    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
		  },

 ```


 >  主要结构如下：详细代码-->  在github中获取

![在这里插入图片描述](https://img-blog.csdnimg.cn/20190713174053974.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDE2MDM4NQ==,size_16,color_FFFFFF,t_70)
 

 github ： ["链接地址"](https://github.com/s2265681/component)

 
    


