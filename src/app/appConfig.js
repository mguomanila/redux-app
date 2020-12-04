const pageSize = 10
const apiRoot = '//localhost:3010/api'
const login = apiRoot + '/login'
const createuser = apiRoot + '/createuser'
const posts = apiRoot + '/posts'
const postSummaryLength = 512
const loadTimeSimMs = 2000

// graphql
const graphql = '//localhost:3010/graphql'
const glogin = graphql + `?query={
  
}`


export default {
  pageSize,
  apiRoot: graphql,
  endpoint: {
    login,
    createuser,
    posts,
    glogin,
  },
  postSummaryLength,
  loadTimeSimMs,
}
