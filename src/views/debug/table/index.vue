<template>
<div class="app-container">
  <div class="weather_search">
    <div class="mt-4">
      <el-input v-model="inputArea" style="width: 300px" placeholder="搜索位置" class="input-with-select"
        @keyup.enter.native="getWeatherSearch">
        <template #prepend>
          <el-select v-model="inputArea" placeholder="选择城市" style="width: 90px">
            <el-option label="重庆" value="重庆" @click="getWeatherSearch" />
            <el-option label="天津" value="天津" @click="getWeatherSearch" />
            <el-option label="石家庄" value="石家庄" @click="getWeatherSearch" />
            <el-option label="呼和浩特" value="呼和浩特" @click="getWeatherSearch" />
          </el-select>
        </template>
        <template #append>
          <el-button :icon="Search" @click="getWeatherSearch" />
        </template>
      </el-input>
    </div>
    <el-card style="width: 300px;height:200px">
      <div class="demo-image__preview">
        {{ getWeatherSearchData.city_name }}
        {{ getWeatherSearchData.current_temperature }}℃
        {{ getWeatherSearchData.current_condition }}
        <div></div>
        空气质量：{{ getWeatherSearchData.aqi }}
        风速：{{ getWeatherSearchData.wind_direction }} {{ getWeatherSearchData.wind_level }}级
      </div>
    </el-card>
  </div>

  <!-- <div class="block text-center">
    <span class="demonstration">
      Switch when indicator is hovered (default)
    </span>
    <el-carousel height="300px" autoplay type="card" trigger="click">
      <el-carousel-item v-for="item in imageList" :key="item.date" style="height:100%">
        <el-image :src="item"></el-image>
      </el-carousel-item>
    </el-carousel>
  </div> -->
</div>

</template>
<script setup>
import axios from 'axios'
import { reactive, ref, watch, onMounted } from 'vue';
import { getListApi, getWeatherSearchApi } from '@/api/system/test'
import { Search } from '@element-plus/icons-vue'
const imageList = ref([])
const inputArea = ref('重庆')
const getWeatherSearchData = ref('')
// 轮播图走马灯
const getList = async () => {
  // axios.get(
  //       'https://api.oioweb.cn/api/bing'
  //   )

  await getListApi().then(res => {
    // console.log(res.data.result);
    imageList.value = res.data.result.map(item => item.url)
    // console.log(imageList.value);
  })
}
//搜索天气
const getWeatherSearch = async () => {
  // console.log(inputArea.value);
  await getWeatherSearchApi(inputArea.value).then(res => {
    getWeatherSearchData.value = res.data.result
    console.log(getWeatherSearchData.value.forecast_list);
  })
}
onMounted(() => {
  getList()
  getWeatherSearch()
})

</script>
<style scoped>
.demonstration {
  color: var(--el-text-color-secondary);
}

.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>