import React from 'react'
import { render } from 'react-dom'
import 'antd/dist/antd.css'
import {Card} from "antd"

import BasicForm from "./component/basicForm"
import BasicTable from "./component/BasicTable"

class Hello extends React.Component {
     constructor(props) {
        super(props);
        this.state={
            selectedRowKeys:[],
            moreSearch:false    // 展示打开搜索栏
         }
      }
    
     componentDidMount(){
     }

     componentWillReceiveProps(last,next){
        console.log(last,next)
    }


   /***
    * 表单
    */
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
    /***
    * 表格
    */
   // 表单列表
      tableColumns=()=>{
            const columns = [
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
              ];
          return columns
      }
   // 表单数据 掉接口获取   
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

    onRef=(selectedRowKeys,selectedRows,selectedIds)=>{
        console.log(selectedRowKeys,selectedRows,selectedIds)
            this.setState({
                selectedRowKeys,
                selectedRows,
                selectedIds
            })
    }
      

    render() {
        const p = this;
        console.log(this.state,'thistable') 
         const { selectedRowKeys } = this.state;
         const paginationProps = {
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
                        filterSubmit={this.submit} />
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
           </div>
        )
    }
}
render(
     <Hello/>,
     document.getElementById('root')
)   