import React from 'react';
import { Select, Checkbox, Radio } from 'antd';

const { Option } = Select;
export default {
  formateDate(time) {
    if (!time) return '';
    const date = new Date(time);
    const month = date.getMonth() <9? `0${date.getMonth()+1}`:date.getMonth()+1
    const data = date.getDate() <10? `0${date.getDate()}`:date.getDate()
    return `${date.getFullYear()}-${month}-${data}`;
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

    return radioOtiruon;
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
 
  pagination(data, callback) {
    return {
      onChange: current => {
        callback(current);
      },
      current: data.result.page,
      pageSize: data.result.page_size,
      total: data.result.total_count,
      showTotal: () => `共${data.result.total_count}条`,
      showQuickJumper: true,
    };
  },

  stopPropagation(e){
    e=e||window.event;
    if(e.stopPropagation){
      e.stopPropagation();  // W3C
    }else{
      e.cancelBubble=true;  // IE
    }
  }
};