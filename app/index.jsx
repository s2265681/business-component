import React from 'react'
import { render } from 'react-dom'
import 'antd/dist/antd.css';

import BasicForm from "./component/basicForm"

class Hello extends React.Component {
     state={
        moreSearch:false
     }

    submit=(info)=>{
        console.log(info)
    }

    exportExport=()=>{
        this.setState({
            moreSearch:!this.state.moreSearch
        })
    }
    
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

    extendFormList=()=>{
        const extendFormList=[{
            type:"Time",
            style:200
        },{
            type:"INPUT",
            placeholder:'请输入电影名',
            width:'200px',
            label:'电影',
            field:'artical',
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

    render() {
       return (
           <div>
               <BasicForm 
                formList={this.formList()} 
                extendFormList={this.extendFormList()} 
                moreSearch={this.state.moreSearch}
                changeExport={this.exportExport}
                filterSubmit={this.submit} />
           </div>
        )
    }
}
render(
     <Hello/>,
     document.getElementById('root')
)   