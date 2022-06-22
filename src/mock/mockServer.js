//引入mockjs开始模拟数据
import Mock from 'mockjs'

// 在webpack中，图片json不需要对外暴露(里面不能书写export关键字)
// 这些资源默认对外暴露

//引入数据
import banner from './banner.json'
import floor from './floor.json'

//第一个参数：接口的地址
//第二个参数：向这个接口发送请求获取到的数据

// 中间默认是get请求
Mock.mock('/mock/banner',{code:200,data:banner})
//mock插件：中间默认是get请求
Mock.mock('/mock/floor',{code:200,data:floor})
