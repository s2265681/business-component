# react 常用组件API调用的模块化封装--form组件
*** 
>  工作中发现我们在做react后台管理系统的时候，会有大量重复的页面（如下图），比如form表单和table组件、以及接口通讯，新增修改modal等。虽然antd里面的组件已经很简便了，但是遇到众多功能类似的页面，每次都复制大量的代码还是会耗费很大的时间而且不易维护，看起来很不清爽，于是找了个时间就把他们做了二次封装。 尽量涵盖了大多数的业务。

### **form表单的封装**
   
![repeatPic](https://blog.rockshang.cn/WechatIMG226.png)



> 一. 新建basicForm 表单组件
     - 在component中新建一个basicForm.js的表单,主要代码如下
     ![repeatPic](https://blog.rockshang.cn/WeChat1fca130f9003b5d519076a0aafc9f986.png)
     - 以input、select为例
     ```
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



> 二. 在util中写通用方法比如格式化时间，处理redio、Checkbox的方法
    - 封住表单中会有对时间组件的时间格式化处理，对radio、Checkbox列表的处理，代码如下：
    ```
       if(fieldsValue.beginTime){
            fieldsValue.beginTime = Utils.formateDate(fieldsValue.beginTime)
        }
    ```
    ```
      formateDate(time) {
        if (!time) return '';
        const date = new Date(time);
        return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
        },
    ```

> 三 页面中引用调用
 - 如格式化时间
 ```
     formateDate(time) {
    if (!time) return '';
    const date = new Date(time);
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  },

 ```


 >  主要结构如下：详细代码-->  在github中获取
![repeatPic](https://blog.rockshang.cn/WeChat2d1170bcc375b62ff46798fc5e1553ac.png)
 
 

 github ： ["链接地址"](https://github.com/s2265681)

 
    


