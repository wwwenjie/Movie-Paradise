import request from '../plugins/axios'
// example
export function fetchList (query) {
  return request({
    url: '/article/list',
    method: 'get',
    params: query
  })
}

// views/example/list
// import { fetchList } from '@/api/article'
// export default {
//   data() {
//     list: null,
//       listLoading: true
//   },
//   methods: {
//     fetchData() {
//       this.listLoading = true
//       fetchList().then(response => {
//         this.list = response.data.items
//         this.listLoading = false
//       })
//     }
//   }
// }
