import React from "react";
import "antd/dist/antd.css";
import { Table } from "antd";

class BasicTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRowKeys: []
       };
  }

  componentDidMount() {}

  // 选择框
  onSelectChange = (selectedRowKeys, selectedRows) => {
    const { selectionType } = this.props;
    const p = this;
    const selectedIds = [];
    if (selectionType === "checkbox") {
      selectedRows.map(item => {
        selectedIds.push(item.id);
        return [];
      });
      p.setState({
        selectedRowKeys,
        selectedIds
      });
    }
    this.props.onRef(selectedRowKeys, selectedRows[0], selectedIds);
    return "";
  };

  // 全选
  onSelectAll = (selected, selectedRows) => {
      const selectedIds = [];
      const selectKey = [];
      if(selected){
        selectedRows.forEach((item, i) => {
          selectedIds.push(item.id);
          selectKey.push(i);
          selectedRows.push(item);
        });
        this.props.onRef(selectKey, selectedRows[0] || {}, selectedIds);
      }else{
        this.props.onRef([],  {}, []);
      }
  };

  // 点击行操作
  onRowClick = (record, index) => {
    const { selectedRowKeys, selectionType } = this.props;
    let i = selectedRowKeys.indexOf(index);
    let selectedIds = [];
    if(selectionType===null||selectionType===false){
        return
    }
    if (selectionType === "checkbox") {
      if (i === -1) {
        selectedRowKeys.push(index);
        selectedIds.push(record.id)
      } else {
        selectedRowKeys.splice(i, 1);
        selectedIds.splice(i,1)
      }
      this.props.onRef(selectedRowKeys, record, selectedIds)
    } else {
      this.props.onRef([index], record, record.id);
    }
  };

  render() {
    const { columns, data, selectionType } = this.props;
    const { selectedRowKeys } = this.props;
    const rowSelection = {
      type: "radio",
      selectedRowKeys,
      onChange: this.onSelectChange,
      onSelect: () => {
        // console.log('...select');
      },
      onSelectAll: this.onSelectAll
    };

    let rowLelection = Boolean;
    if (selectionType === false || selectionType === null) {
      rowLelection = false;
    } else if (selectionType === "checkbox") {
      rowSelection.type = "checkbox";
    } else {
      rowSelection.type = "radio";
    }

    return (
      <Table
        rowKey={(_, index) => index} // 设置rowKey
        columns={columns}
        dataSource={data}
        rowSelection={rowLelection ? rowSelection : null}
        onRow={(record, index) => ({
          onClick: () => {
            if (!rowLelection) {
              return;
            }
            this.onRowClick(record, index);
          }
        })}
      />
    );
  }
}
export default BasicTable;
