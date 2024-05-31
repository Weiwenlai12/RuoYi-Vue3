import axios from 'axios'
// 图片列表
export function getListApi() {
    return axios.get(
        'https://api.oioweb.cn/api/bing'
    )
}
// 搜索天气
export function getWeatherSearchApi(params) {
    return axios.post(
        `https://api.oioweb.cn/api/weather/weather?city_name=${params}`
    )
}