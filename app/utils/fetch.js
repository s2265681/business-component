import "whatwg-fetch"
import "es6-promise"

export function get(url){
    return  fetch(url,{
        method:'GET',
        // credentials:'include',  // 表示跨域请求是可以带cookie
        headers:{
            'Accept':'application/json,text/plain,*/*',
            'Content-Type':'application/x-www-form-urlencoded',
       },
       cache:"default",
       mode: "cors"  
    //    mode: "no-cors"         // 跨域请求
    }).then(function(response){
         // 捕获状态码和json数据
        if(response.status==200){
            return response.json()
        }

    }).then(function(data){
        return data
    }).catch(function(err){
      console.log(err,'err')   // 错误处理
    })   
}


// 处理post数据  把json格式转化成'id=1&author=lisi' 格式
function objParams(obj){
    var result = '';
    var item;
    for(item in obj){
        result +=   '&'+item + '=' + encodeURIComponent(obj[item]);
    }
    if(result){
        result = result.substr(1)
    }
    return result;
}

// 发送post请求
export function post(url,paramsObj) {
  return fetch(url,{
        method:'POST',
        // credentials:'include',  // 表示跨域请求是可以带cookie
        mode: "cors", 
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/x-www-form-urlencoded'
        },
        body: objParams(paramsObj)
        // body: "id=26"
    }).then(function(response){
       if(response.status==200){
           return response.json()
       }
   }).then(function(data){
       return data
   }).catch(function(err){
     console.log(err,'err')   // 错误处理
   })
}

