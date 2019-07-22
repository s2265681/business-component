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
  Upload,
  Icon,
  Row,
  message
} from 'antd';
import Utils from "../utils";
const { TextArea } = Input;

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

class BasicModal extends React.Component {
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
    const { modalFormList,detail } = this.props;
    // const uploadButton = (
    //   <div>
    //     <Icon type={this.state.loading ? 'loading' : 'plus'} />
    //     <div className="ant-upload-text">Upload</div>
    //   </div>
    // );
    const uploadProps = {
      action: 'http://127.0.0.1:2918/api/blog/uploadfile',
      listType: 'picture-card',
      data(file) {
        return {
          pic: file.name,
        };
      },
      // name:'pic',
      beforeUpload(file) {
        const isImg =
          file.type === 'image/jpeg' ||
          file.type === 'image/bmp' ||
          file.type === 'image/gif' ||
          file.type === 'image/png';
        const isLt3M = file.size / 1024 / 1024 < 3;
        if (!isImg) {
          message.error('请上传图片文件');
        }
        if (!isLt3M) {
          message.error('照片大小必须小于3M,请重新上传');
        }
        return isImg && isLt3M;
      },
      onPreview(file) {
        p.setState({
          previewVisible: true,
          previewImage: file.url || file.thumbUrl,
        });
      },
      onChange(info) {
        p.setState({ picList: info.fileList });
        if (info.file.status === 'done') {
          if (info.file.response && info.file.response.code === 200) {
            message.success(`${info.file.name} 成功上传`);
            // 添加文件预览
            // const newFile = info.file;
            // newFile.url = info.file.response.data;
          } else {
            message.error(
              `${info.file.name} 解析失败：${info.file.response.msg ||
                info.file.response.errorMsg}`
            );
          }
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} 上传失败`);
        }
      },
    };
    console.log(detail,'detail++++')
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
        const {disabled} = item;
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
              {detail?initialValue:getFieldDecorator(`${field}`, {
                rules: rulesType,
                initialValue,
              })( 
                <Input  type="text" disabled={disabled||false} style={{ width }} placeholder={placeholder} />)}
              {dom}
            </FormItem>
          );
          formItemList.push(INPUT);
        }  
        // else if (item.type === 'UPLOAD') {
        //   const UPLOAD = (
        //     <FormItem label={label} key={field} style={style} {...formItemLayout}>
        //       {detail?initialValue:getFieldDecorator(`${field}`, {
        //         rules: rulesType,
        //         initialValue,
        //       })( 
        //         <Upload
        //           name="avatar"
        //           listType="picture-card"
        //           className="avatar-uploader"
        //           showUploadList={false}
        //           action="http://127.0.0.1:2918/api/blog/uploadfile"
        //           // beforeUpload={beforeUpload}
        //           onChange={this.props.handlePicChange}
        //       >
        //         {this.props.imageUrl ? <img src={this.props.imageUrl} alt="avatar" /> : uploadButton}
        //       </Upload>)}
        //     </FormItem>
        //   );
        //   formItemList.push(UPLOAD);
        // } 
        else if (item.type === 'UPLOAD') {
          const UPLOAD = (
            <Row>
              <FormItem
                label={label}
                key={field}
                style={{ width: '100%' }}
                labelCol={{ span: 2 }}
                wrapperCol={{ span: 22 }}
              >
                {getFieldDecorator(`${field}`, {
                  initialValue,
                  valuePropName: 'fileList',
                  getValueFromEvent(e) {
                    if (!e || !e.fileList) {
                      return e;
                    }
                    const { fileList } = e;
                    return fileList;
                  },
                })(
                  <Upload {...uploadProps}>
                      <div>
                        <Icon type="plus" className="uploadPlus" />
                        <div className="ant-upload-text">上传图片</div>
                      </div>
                  </Upload>
                )}
              </FormItem>
            </Row>
          );
          formItemList.push(UPLOAD);
      }
        else if (item.type === 'TEXTAREA') {
          const  TEXTAREA = (
             <FormItem label={label} key={field} style={style} {...formItemLayout}>
              {detail?initialValue:getFieldDecorator(`${field}`, {
                rules: rulesType,
                initialValue,
              })(
                <TextArea
                    autosize={{ minRows: 5}}
                    style={{ width }} placeholder={placeholder}
                  />
                )
              }
              {dom}
            </FormItem>
          );
          formItemList.push(TEXTAREA);
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
    const { visible, title, detail } = this.props;
    console.log(detail,'detail')
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
export default Form.create({})(BasicModal);
