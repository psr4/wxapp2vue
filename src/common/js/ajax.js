import axios from 'axios'

function build_data(obj) {
  let uri = "?";
  for (let i in obj) {
    uri += i + "=" + obj[i] + "&"
  }
  return uri
}
export default {
  get(url, data) {
    return new axios.get(url + build_data(data))
  },
  post(url, data) {
    return axios.post(url, data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
  }
}
