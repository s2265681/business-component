import React from 'react'
import { render } from 'react-dom'
import 'antd/dist/antd.css'
import {Card,Button} from "antd"
import Utils from "./utils/index"
import BasicForm from "./component/basicForm"
import BasicTable from "./component/BasicTable"
import BasicModal from "./component/basicModal"

class Hello extends React.Component {
     constructor(props) {
        super(props);
        this.state={
            selectedRowKeys:[],
            moreSearch:false,    // 展示打开搜索栏
            title:'',
            modalVisible:false
         }
      }
    
/**操作表格----------------------------------------- */
   // 打开隐藏表单
    exportExport=()=>{
        this.setState({
            moreSearch:!this.state.moreSearch
        })
    }
   // 表单字段
    formList=()=>{
        const formList=[{
            type:"Time",
            style:200
        },{
            type:"INPUT",
            placeholder:'请输入内容',
            width:'200px',
            label:'文章',
            field:'artical',
        },{
            type:"SELECT",
            placeholder:'请选择内容',
            width:'200px',
            label:'选择种类',
            field:'kinds',
            name:'key',
            list:[{
              id:1,
              key:'西瓜'
            },{
                id:2,
                key:'芒果'
              },{
                id:3,
                key:'西红柿'
              }]
        }]

        return formList
        
    }
   // 展开表单字段
    extendFormList=()=>{
        const extendFormList=[{
            type:"Time",
            style:200
        },{
            type:"INPUT",
            placeholder:'请输入电影名',
            width:'200px',
            label:'电影',
            field:'movies',
        },{
            type:"SELECT",
            placeholder:'请选择电影',
            width:'200px',
            label:'选择种类',
            field:'kinds1',
            name:'key',
            list:[{
              id:1,
              key:'泰坦尼克号'
            },{
                id:2,
                key:'阿凡达'
              },{
                id:3,
                key:'蜘蛛侠'
              }]
        }]
        return extendFormList
    }
   // 提交表单
    submit=(info)=>{
        console.log(info)
    }
    
/**操作表格----------------------------------------- */
   // 表单列表
      tableColumns=()=>{
            const p = this;
            const columns = [
              {
                title: '序号',
                dataIndex: 'id',
                key: 'id',
              },
                {
                  title: '姓名',
                  dataIndex: 'name',
                  key: 'name',
                },
                {
                  title: '年龄',
                  dataIndex: 'age',
                  key: 'age',
                },
                {
                  title: '住址',
                  dataIndex: 'address',
                  key: 'address',
                },
                {
                  title: '操作',
                  key:'work',
                  render(r){
                    return <Button type="primary" onClick={p.handleModal.bind(this,r.id)}>修改</Button>
                  }
                },
              ];
          return columns
      }
   // 表单数据，真实数据调接口获取   
       tableData=()=>{
        const dataSource = [
            {
              id: '1',
              name: '胡彦斌',
              age: 32,
              address: '西湖区湖底公园1号',
            },
            {
              id: '2',
              name: '胡彦祖',
              age: 42,
              address: '西湖区湖底公园1号',
            },
          ];
          return dataSource
       }
   //  回调函数把把子组件改变的数据获取到页面来，再把key值传回子组件
    onRef=(selectedRowKeys,selectedRows,selectedIds)=>{
        console.log(selectedRowKeys,selectedRows,selectedIds)
            this.setState({
                selectedRowKeys,
                selectedRows,
                selectedIds
            })
    }
    

/**操作modal----------------------------------------- */
    // 打开modal，判断是修改还是新增，修改通过掉回显信息的接口，新增不调接口
    handleModal=(id,e)=>{
       this.stopPropagation(e)
       if(id){
         console.log('update')
         this.setState({
          title:'修改',
          modalVisible:true
         })
       }else{
         console.log('add')
         this.setState({
          title:'新增',
          modalVisible:true
         })
       }
    }

     //点击新增修改按钮时阻止事件冒泡
    stopPropagation=(e)=>{
      Utils.stopPropagation(e);
    }

    // modal 列表，选择内容区
    modalFormList=()=>{
      const modalFormList = [
        {
          type: 'INPUT',
          label: '文章名称',
          field: 'name',
          placeholder: '请输入文章名称',
          width: 220,
        },
        {
          type: 'SELECT',
          label: '电影',
          field: 'movie',
          placeholder: '请选择电影',
          width: 220,
          list:[{
            id:1,
            lable:'泰坦尼克'
          },{
            id:2,
            lable:'蜘蛛侠'
          }],
          name: 'lable',
        },
      ];
      return modalFormList;
    }


    // 提交modal
    handleSubmit=()=>{
      console.log('submit')
      this.modalRef.props.form.resetFields()
      this.setState({
        modalVisible:false
      })
    }

    // 获取到modal组件中的值 提交成功后把值清掉，通过回调把modal组件中的this给了当前页面的this.modalRef（名字随便取)
    onModalRef=(ref)=>{
      this.modalRef = ref
    }

 
  
    render() {
        const p = this;
        console.log(this.state,'thistable') 
         const { selectedRowKeys } = this.state;
         const paginationProps = {  // 分页
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
                        nameList={['add']}
                        handleAdd={this.handleModal.bind(this,null)}
                        />
                </Card>
                <Card>
                    <BasicTable
                        onRef={this.onRef}
                        selectedRowKeys={selectedRowKeys}
                        columns={this.tableColumns()} 
                        data={this.tableData()}
                        selectionType={'checkbox'}   // 'checkbox' || null || 'radio' 默认
                        // pagination={paginationProps}  // 分页
                        />
                </Card>

                <BasicModal
                    onRef={p.onModalRef}
                    visible={this.state.modalVisible}
                    modalFormList={p.modalFormList()}
                    submit={p.handleSubmit.bind(this)}
                    close={()=>{
                        this.setState({modalVisible:false})
                    }}
                    title={this.state.title}
                  />
           </div>
        )
    }
}
render(
     <Hello/>,
     document.getElementById('root')
)   