import React from "react";
import { stringify } from "qs";
import { render } from "react-dom";
import "antd/dist/antd.css";
import { Card, Button, message, Popconfirm } from "antd";
import Utils from "./utils/index";
import BasicForm from "./component/basicForm";
import BasicTable from "./component/BasicTable";
import BasicModal from "./component/basicModal";
import config from "./utils/setting";
import { get, post } from "./utils/fetch";

class Hello extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRowKeys: [],
      moreSearch: false, // 展示打开搜索栏
      title: "",
      modalVisible: false,
      data: [],
      everyData: {},
      detail: false,
      imageUrl:''
    };
  }

  componentDidMount() {
    this.initList();
  }

  // 列表
  initList = params => {
    const list = get(`${config()}/api/blog/list?${stringify(params)}`);
    list.then(res => {
      this.setState({
        data: res.data || []
      });
    });
  };

  // 查询单个
  handleChange = id => {
    const list = get(`${config()}/api/blog/detail?id=${id}`);
    list.then(res => {
      this.setState({
        everyData: res.data || []
      });
    });
  };

  // 删除
  handleDelete = (id, e) => {
    this.stopPropagation(e);
    const paramsObj = {
      id,
      author: "lisi"
    };
    const result = post(`${config()}/api/blog/del`, paramsObj);
    result.then(res => {
      if (res.data) {
        message.success("删除成功");
        this.initList();
      } else {
        message.error("删除失败");
      }
    });
  };

  // 新增
  hangleAddList = paramsObj => {
    // paramsObj.image = "http://bl.7yue.pro/images/movie.8.png";
    const result = post(`${config()}/api/blog/new`, paramsObj);
    result.then(res => {
      if (res.data) {
        message.success("新增成功");
        this.initList();
      } else {
        message.error("新增失败");
      }
    });
  };

  // 修改
  hangleUpdateList = (paramsObj, id) => {
    // paramsObj.image = "http://bl.7yue.pro/images/movie.8.png";
    const result = post(`${config()}/api/blog/update?id=${id}`, paramsObj);
    result.then(res => {
      if (res.code === 200) {
        message.success("修改成功");
        this.initList();
      } else {
        message.error("修改失败");
      }
    });
  };

  /**操作表格----------------------------------------- */
  // 打开隐藏表单
  exportExport = () => {
    this.setState({
      moreSearch: !this.state.moreSearch
    });
  };
  // 表单字段
  formList = () => {
    const formList = [
      {
        type: "Time",
        style: 200
      },
      {
        type: "INPUT",
        placeholder: "请输入标题",
        width: "200px",
        label: "标题",
        field: "title"
      },
      {
        type: "INPUT",
        placeholder: "请输入作者",
        width: "200px",
        label: "作者",
        field: "author"
      },
      {
        type: "SELECT",
        placeholder: "请选择内容",
        width: "200px",
        label: "选择种类",
        field: "kinds",
        name: "key",
        list: [
          {
            id: 1,
            key: "西瓜"
          },
          {
            id: 2,
            key: "芒果"
          },
          {
            id: 3,
            key: "西红柿"
          }
        ]
      }
    ];

    return formList;
  };
  // 展开表单字段
  extendFormList = () => {
    const extendFormList = [
      {
        type: "Time",
        style: 200
      },
      {
        type: "INPUT",
        placeholder: "请输入电影名",
        width: "200px",
        label: "电影",
        field: "movies"
      },
      {
        type: "SELECT",
        placeholder: "请选择电影",
        width: "200px",
        label: "选择种类",
        field: "kinds1",
        name: "key",
        list: [
          {
            id: 1,
            key: "泰坦尼克号"
          },
          {
            id: 2,
            key: "阿凡达"
          },
          {
            id: 3,
            key: "蜘蛛侠"
          }
        ]
      }
    ];
    return extendFormList;
  };
  // 搜索表单
  submit = info => {
    this.initList(info);
  };

  /**操作表格----------------------------------------- */
  // 表单列表
  tableColumns = () => {
    const p = this;
    const columns = [
      {
        title: "图片",
        dataIndex: "image",
        key: "image",
        render(t,r){
          if(!t)return
          return(
             <img src={t}  key={r.id} style={{width:'100px',height:'100px'}} alt=""  />
          )
        }
      },
      {
        title: "序号",
        dataIndex: "id",
        key: "id"
      },
      {
        title: "标题",
        dataIndex: "title",
        key: "title"
      },
      {
        title: "作者",
        dataIndex: "author",
        key: "author"
      },

      {
        title: "内容",
        dataIndex: "content",
        key: "content",
        render(t) {
          t.length > 20 ? (t = t.substr(0, 20) + "......") : t;
          return t;
        }
      },
      {
        title: "创建时间",
        dataIndex: "createtime",
        key: "createtime"
      },
      {
        title: "操作",
        key: "work",
        render(r) {
          return (
            <div>
              <Button
                type="primary"
                onClick={p.handleModal.bind(this, r.id)}
                style={{ marginRight: "10px" }}
              >
                修改
              </Button>
              <Button
                type="primary"
                onClick={p.handleModal.bind(this, r.id, "detail")}
                style={{ marginRight: "10px" }}
              >
                详情
              </Button>
              <Popconfirm
                title="确定删除？"
                onConfirm={p.handleDelete.bind(p, r.id)}
              >
                <Button type="primary">删除</Button>
              </Popconfirm>
            </div>
          );
        }
      }
    ];
    return columns;
  };

  // 回调函数把把子组件改变的数据获取到页面来，再把key值传回子组件
  onRef = (selectedRowKeys, selectedRows, selectedIds) => {
    this.setState({
      selectedRowKeys,
      selectedRows,
      selectedIds
    });
  };

  /**操作modal----------------------------------------- */
  // 打开modal，判断是修改还是新增，修改通过掉回显信息的接口，新增不调接口
  handleModal = (id, type, e) => {
    this.stopPropagation(e);
    if (id) {
      this.handleChange(id);
      if (type === "detail") {
        this.setState({
          title: "详情",
          modalVisible: true,
          detail: true
        });
        return;
      }
      this.setState({
        title: "修改",
        modalVisible: true
      });
    } else {
      this.setState({
        title: "新增",
        modalVisible: true
      });
    }
  };

  //点击新增修改按钮时阻止事件冒泡
  stopPropagation = e => {
    Utils.stopPropagation(e);
  };

  // modal 列表，选择内容区
  modalFormList = data => {
    // 处理一下回显图片格式 ： [url:'',uid:'']  
    // const data = new Data
    const uidTime = (new Date()).getTime();
    const picImg = data.image || ''
    const picList = [];
    picImg?picList.push({url:picImg,uid:uidTime}):[]
    const modalFormList = [
      {
        type: "INPUT",
        label: "文章名称",
        field: "title",
        placeholder: "请输入文章名称",
        width: "90%",
        initialValue: data.title

      },
      {
        type: "UPLOAD",
        label: "图片",
        field: "image",
        placeholder: "请输入图片",
        width: "90%",
        initialValue: picList||[]
      },
      {
        type: "INPUT",
        label: "作者",
        field: "author",
        placeholder: "请输入文章名称",
        width: "90%",
        // disabled:true,
        initialValue: data.author
      },
      {
        type: "TEXTAREA",
        label: "内容",
        field: "content",
        placeholder: "请输入文章名称",
        width: "90%",
        initialValue: data.content
      }
      // {
      //   type: 'SELECT',
      //   label: '电影',
      //   field: 'movie',
      //   placeholder: '请选择电影',
      //   width: '90%',
      //   list:[{
      //     id:1,
      //     lable:'泰坦尼克'
      //   },{
      //     id:2,
      //     lable:'蜘蛛侠'
      //   }],
      //   name: 'lable',
      // },
    ];
    return modalFormList;
  };

  // 提交modal
  handleSubmit = data => {
    const id = this.state.everyData && this.state.everyData.id;
    if (id) {
      this.hangleUpdateList(data, id);
    } else {
      this.hangleAddList(data);
    }
    this.modalRef.props.form.resetFields();
    this.setState({
      modalVisible: false
    });
  };

  // 获取到modal组件中的值 提交成功后把值清掉，通过回调把modal组件中的this给了当前页面的this.modalRef（名字随便取)
  onModalRef = ref => {
    this.modalRef = ref;
  };


  // pic change
  handlePicChange=(e)=>{
  }

  render() {
    const p = this;
    const { selectedRowKeys, data, everyData, detail } = this.state;
    const paginationProps = {
      // 分页
      // total,
      // defaultPageSize: 10,
      // pageSize,
      // current: pageNo,
      // onChange(pageIndex) {
      //   p.handleSearch(params, pageIndex);
      // },
    };

    return (
      <div>
        <Card>
          <BasicForm
            formList={this.formList()}
            extendFormList={this.extendFormList()}
            moreSearch={this.state.moreSearch}
            changeExport={this.exportExport}
            filterSubmit={this.submit}
            // 添加一个新增按钮
            nameList={["add"]}
            handleAdd={this.handleModal.bind(this, null)}
          />
        </Card>
        <Card>
          <BasicTable
            onRef={this.onRef}
            selectedRowKeys={selectedRowKeys}
            columns={this.tableColumns()}
            data={data}
            style={{ textAlign: 'center' }}
            key={(r,index)=>index}
            selectionType={"checkbox"} // 'checkbox' || null || 'radio' 默认
            // pagination={paginationProps}  // 分页
          />
        </Card>

        <BasicModal
          onRef={p.onModalRef}
          visible={this.state.modalVisible}
          modalFormList={p.modalFormList(everyData)}
          submit={p.handleSubmit.bind(this)}
          detail={detail || false}
          close={() => {
            this.setState({
              modalVisible: false,
              detail: false,
              everyData: {}
            });
            this.modalRef.props.form.resetFields();
          }}
          title={this.state.title}
          handlePicChange={this.handlePicChange}
          imageUrl={this.state.imageUrl}
        />
      </div>
    );
  }
}
render(<Hello />, document.getElementById("root"));
