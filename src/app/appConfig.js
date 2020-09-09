const pageSize = 10
const apiRoot = '//localhost:3010/api'
const login = apiRoot + '/login'
const createuser = apiRoot + '/createuser'
const posts = apiRoot + '/posts'
const postSummaryLength = 512
const loadTimeSimMs = 2000


export default {
  pageSize,
  apiRoot,
  endpoint: {
    login,
    createuser,
    posts,
  },
  postSummaryLength,
  loadTimeSimMs,
}
