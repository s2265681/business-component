import React from 'react';
import { Select, Checkbox, Radio } from 'antd';

const { Option } = Select;
export default {
  formateDate(time) {
    if (!time) return '';
    const date = new Date(time);
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  },
  getOptionList(data, name) {
    if (!data) {
      return [];
    }
    const options = []; 
    data.map(item => {
      options.push(
        <Option value={item.id} key={item.id}>
          {item[`${name}`]}
        </Option>
      );
    });
    return options;
  },
  getRadioList(data, name) {
    if (!data) {
      return [];
    }
    const radioOtion = []; // [<Option value="0" key="all_key">全部</Option>];
    data.map(item => {
      radioOtion.push(
        <Radio value={item.id} key={item.id}>
          {item[`${name}`]}
        </Radio>
      );
      return '';
    });

    return radioOtion;
  },
  getCheckboxList(data) {
    if (!data) {
      return [];
    }
    const options = []; // [<Option value="0" key="all_key">全部</Option>];
    data.map(item => {
      options.push(
        <Checkbox value={item.id} key={item.key}>
          {item.name}
        </Checkbox>
      );
      return '';
    });
    return options;
  },
  /**
   * ETable 行点击通用函数
   * @param {*选中行的索引} selectedRowKeys
   * @param {*选中行对象} selectedItem
   */
  updateSelectedItem(selectedRowKeys, selectedRows, selectedIds, selectedItemIds) {
    if (selectedIds) {
      this.setState({
        selectedRowKeys,
        selectedIds,
        selectedItem: selectedRows,
        selectedItemIds,
      });
    } else {
      this.setState({
        selectedRowKeys,
        selectedItem: selectedRows,
        selectedItemIds,
      });
    }
  }

};