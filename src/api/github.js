import request from '@/utils/request'

// 获取用户
export const getUsers = (params={}) => request({
  method: 'get',
  url: '/users',
  params: params
})

export const getRateLimit = () => request({
  method: 'get',
  url: '/rate_limit'
})

export const getMostStarsRepositories = (q = 'javascript') => request({
  method: 'get',
  url: '/search/repositories',
  params: {
    q: `language:${q}`,
    sort: 'stars'
  }
})