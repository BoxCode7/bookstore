'use strict'
module.exports={
    lintOnSave:true,//关闭语法检查

   // 配置 webpack-dev-server 行为。
    devServer: {
        open: false, //编译后默认不打开浏览器
        host: '0.0.0.0',  //四个零代表任意IP都能访问域名
        port: 8080,  // 端口
        https: false,  //是否https
    }
}
