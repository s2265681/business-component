function config(){
   // production
  const env = process.env.NODE_ENV || 'production';  
  console.log(env,'env')
  let url;
  if(env==='production'){
     url  ='http://rockshang.cn:3390'  // 线上接口url
  }else{
      url ="http://127.0.0.1:2918" // 本地接口url 
  }
  url  ='http://rockshang.cn:3390'
//   url="http://127.0.0.1:2918"
  return  url
}
export default config