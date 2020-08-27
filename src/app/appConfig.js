
export default {
  pageSize: 10,
  apiRoot: '//localhost:3010',
  endpoint(path){return this.apiRoot + path},
  postSummaryLength: 512,
  loadTimeSimMs: 2000
}
