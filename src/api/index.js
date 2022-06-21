import request from './request'

export const category=()=> request.get('product/getBaseCategoryList')