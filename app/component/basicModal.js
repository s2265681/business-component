import React from 'react';
import {
  Input,
  Select,
  Form,
  Checkbox,
  DatePicker,
  Cascader,
  Modal,
  Radio,
  TreeSelect,
} from 'antd';
import Utils from "../utils";

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

class ModalBaseForm extends React.Component {
  state = {};

  componentDidMount() {
    this.props.onRef(this);
  }

  reset = () => {
    const p = this;
    p.props.form.resetFields();
  };

  handleAdd = () => {
    const p = this;
    p.props.handleOpenModal('add');
  };

  pitchDelete = () => {
    const p = this;
    p.props.pitchDelete();
  };

  onChange = () => {};

  onTreeChange = () => {};

  initFormList = () => {
    const p = this;
    const { getFieldDecorator } = p.props.form;
    const { modalFormList } = this.props;
    const formItemList = [];
    if (modalFormList && modalFormList.length > 0) {
      modalFormList.forEach(item => {
        const { label } = item;
        const { field } = item;
        const { tree } = item;
        const { rules } = item;
        const { dom } = item;
        const rulesType = rules || [{ required: true, message: `${label}必填` }];

        const initialValue = item.initialValue || undefined;
        // const {validator} = item
        const { placeholder } = item;
        const { width } = item;
        const { style } = item;
        const { name } = item;
        const formItemLayout = {
          labelCol: {
            xs: { span: 24 },
            sm: { span: 8 },
          },
          wrapperCol: {
            xs: { span: 24 },
            sm: { span: 16 },
          },
        };
        if (item.type === 'time') {
          const beginTime = (
            <FormItem label="选择日期" label={label} {...formItemLayout} key={1}>
              {getFieldDecorator('beginTime')(
                <DatePicker style={{ width }} showTime placeholder="开始时间" format="YYYY-MM-DD" />
              )}
            </FormItem>
          );
          formItemList.push(beginTime);
          const endTime = (
            <FormItem label="~" colon={false} key={2} {...formItemLayout}>
              {getFieldDecorator('endTime')(
                <DatePicker
                  style={{ width }}
                  showTime
                  // placeholder={placeholder}
                  // format="YYYY-MM-DD HH:mm:ss"
                  placeholder="结束时间"
                  format="YYYY-MM-DD"
                />
              )}
            </FormItem>
          );
          formItemList.push(endTime);
        } else if (item.type === 'INPUT') {
          const INPUT = (
            <FormItem label={label} key={field} style={style} {...formItemLayout}>
              {getFieldDecorator(`${field}`, {
                rules: rulesType,
                initialValue,
              })(<Input type="text" style={{ width }} placeholder={placeholder} />)}
              {dom}
            </FormItem>
          );
          formItemList.push(INPUT);
        } else if (item.type === 'SELECT') {
          const SELECT = (
            <FormItem label={label} key={field} {...formItemLayout}>
              {getFieldDecorator(`${field}`, {
                rules: [{ required: true, message: `${label}必填` }],
                initialValue,
              })(
                <Select style={{ width }} placeholder={placeholder}>
                  {Utils.getOptionList(item.list, name)}
                </Select>
              )}
            </FormItem>
          );
          formItemList.push(SELECT);
        } else if (item.type === 'TREESELECT') {
          const REDIO = (
            <FormItem label={label} key={field} {...formItemLayout}>
              {getFieldDecorator(`${field}`, {
                rules: [{ required: true, message: `${label}必填` }],
                initialValue,
              })(
                <TreeSelect
                  onChange={this.onTreeChange}
                  style={{ width }}
                  treeData={tree}
                  placeholder={placeholder}
                  showCheckedStrategy="SHOW_PARENT"
                  searchPlaceholder={initialValue}
                  treeCheckable
                  showCheckedStrategy="SHOW_PARENT"
                  searchPlaceholder="Please select"
                />
              )}
            </FormItem>
          );
          formItemList.push(REDIO);
        } else if (item.type === 'REDIO') {
          const REDIO = (
            <FormItem label={label} key={field} {...formItemLayout}>
              {getFieldDecorator(`${field}`, {
                rules: [{ required: true, message: `${label}必填` }],
                initialValue: initialValue || 0,
              })(
                <RadioGroup onChange={this.onChange} style={{ width }} placeholder={placeholder}>
                  {Utils.getRadioList(item.list, name)}
                </RadioGroup>
              )}
            </FormItem>
          );
          formItemList.push(REDIO);
        } else if (item.type === 'CHECKBOX') {
          const CHECKBOX = (
            <FormItem label={label} key={field} {...formItemLayout}>
              {getFieldDecorator(`${field}`, {
                valuePropName: 'checked',
                initialValue, // true | false
              })(<Checkbox>{label}</Checkbox>)}
            </FormItem>
          );
          formItemList.push(CHECKBOX);
        } else if (item.type === 'CASCADER') {
          const CASCADER = (
            <FormItem label={label} key={field} {...formItemLayout}>
              {getFieldDecorator(`${field}`, {
                initialValue, // true | false
              })(
                <Cascader
                  style={{ width }}
                  placeholder={placeholder}
                  allowClear
                  options={tree}
                  expandTrigger="hover"
                />
              )}
            </FormItem>
          );
          formItemList.push(CASCADER);
        }
      });
    }
    return formItemList;
  };

  closeModal = () => {
    const p = this;
    const { form, close } = p.props;
    // form.resetFields();
    close();
  };

  handleSubmit = () => {
    const p = this;
    const { form } = this.props;
    form.validateFieldsAndScroll((err, values) => {
      if (err) {
        return;
      }
      p.props.submit(values);
    //   form.resetFields();
    });
  };

  render() {
    const p = this;
    const { visible, title } = this.props;
    const modalProps = {
      title,
      visible,
      onOk() {
        p.handleSubmit();
      },
      onCancel() {
        p.closeModal();
      },
    };

    return (
      <Modal {...modalProps}>
        <Form layout="horizontal" onSubmit={p.handleSubmit.bind(p)}>
          {p.initFormList()}
        </Form>
      </Modal>
    );
  }
}
export default Form.create({})(ModalBaseForm);
