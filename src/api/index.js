import request from './request'
import mockRequest from './mockRequest'
export const category=()=> request.get('product/getBaseCategoryList')
//请求banner
export const banner=()=>mockRequest.get('/banner')
//请求楼层
export const floor=()=>mockRequest.get('/floor')
//搜索
export const search=(params)=>request.post('/list',params)
