const pageSize = 10
const apiRoot = '//localhost:3010'
const query = '/api'
const login = apiRoot + query
const postSummaryLength = 512
const loadTimeSimMs = 2000


export default {
  pageSize,
  apiRoot,
  endpoint: {
    login
  },
  postSummaryLength,
  loadTimeSimMs,
}
