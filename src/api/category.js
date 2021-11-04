import request from '@/utils/request'

/**
 * @description: 获取分类数据
 * @param {*} id 分类id
 * @return {*}
 */
export const findTopCategory = (id) => {
  return request('/category', 'get', { id })
}
