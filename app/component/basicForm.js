import React from "react";
import { Form, DatePicker, Input, Select,Button } from "antd";
import Utils from "../utils";
const FormItem = Form.Item;

class BasicForm extends React.Component {
    constructor(props){
        super(props)
        this.state ={
        }
    }
    

    onSubmit=()=>{
        const p = this;
        const { form } = p.props;
        const fieldsValue = form.getFieldsValue()
        if(fieldsValue.beginTime){
            fieldsValue.beginTime = Utils.formateDate(fieldsValue.beginTime)
        }
        if(fieldsValue.endTime){
            fieldsValue.endTime =Utils.formateDate(fieldsValue.endTime)
        }
        p.props.filterSubmit(fieldsValue)
    }

  
    reset = () => {
      const p = this;
      p.props.form.resetFields();
    };

  initFormList=()=>{
    const p = this;
    const formItemList = [];
    const { getFieldDecorator } = p.props.form;
    const { formList,extendFormList } = p.props;
    // 页面上的表单
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
        if (type === "Time") {
          const beginTime = (
            <FormItem label="选择日期"  key="beginTime" >
              {getFieldDecorator("beginTime")(
                <DatePicker
                  showTime
                  style={width}
                  placeholder="开始时间"
                  format="YYYY-MM-DD"
                />
              )}
            </FormItem>
          );
          formItemList.push(beginTime);
          const endTime = (
            <FormItem key="endTime">
              {getFieldDecorator("endTime")(
                <DatePicker
                  showTime
                  style={width}
                  placeholder="结束时间"
                  format="YYYY-MM-DD"
                />
              )}
            </FormItem>
          );
          formItemList.push(endTime);
        } else if (type === "INPUT") {
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
        }
      });
    }
    // 展开的表单
    if (extendFormList && extendFormList.length > 0) {
      extendFormList.forEach(item => {
        const {
          label,
          field,
          tree,
          type,
          initialValue,
          placeholder,
          width,
          name,
          style
        } = item;
        if (type === 'INPUT') {
          const INPUT = (
            <FormItem label={label} key={field} style={style}>
              {getFieldDecorator(`${field}`, {
                initialValue,
              })(<Input type="text" placeholder={placeholder} style={{ width }} />)}
            </FormItem>
          );
          if (this.props.moreSearch === true) {
            formItemList.push(INPUT);
          } else {
            formItemList.push([]);
          }
        } else if (type === 'SELECT') {
          const SELECT = (
            <FormItem label={label} key={field} style={style}>
              {getFieldDecorator(`${field}`, {
                initialValue,
              })(
                <Select style={{ width }} placeholder={placeholder}>
                  {Utils.getOptionList(item.list, name)}
                </Select>
              )}
            </FormItem>
          );
          if (this.props.moreSearch === true) {
            formItemList.push(SELECT);
          } else {
            formItemList.push([]);
          }
        }
      });
    }

    return formItemList;
  }


  render() {
    return <Form layout={'inline'}>
    {this.initFormList()}
       <FormItem>
           <Button type="primary" onClick={this.onSubmit} style={{ margin: '0 20px' }}>提交</Button>
           <Button type="primary" onClick={this.reset}>清空</Button>
           <a
           href="javascript:;"
           style={{ position: 'relative', top: '0px', left: '20px' }}
           onClick={this.props.changeExport}
         >
           {this.props.extendFormList && this.props.extendFormList.length > 0
             ? this.props.moreSearch === false
               ? '展开'
               : '收起'
             : ''}
         </a>
         {this.props.nameList.map(item => {
          const domlist = [];
           if (item === 'add') {
            domlist.push(
              <Button
                key={item}
                type="primary"
                style={{ margin: '0 0 0 50px' }}
                onClick={this.props.handleAdd}
              >
                新增
              </Button>
            );
          } else if (item === 'patch') {
            domlist.push(
              <Popconfirm title="确定删除？" onConfirm={this.pitchDelete}>
                <Button
                  key={item}
                  disabled={!(selectedRowKeys && selectedRowKeys.length > 0)}
                  type="primary"
                >
                  删除
                </Button>
              </Popconfirm>
            );
          }
          return domlist;
        })}
       </FormItem>
    </Form>;
  }
}
export default Form.create({})(BasicForm);
