<template>
  <div class="app-container">
    <div class="weather_search">
      <div class="mt-4">
        <el-input v-model="inputArea" style="width: 300px" placeholder="搜索位置" class="input-with-select"
          @keyup.enter.native="getWeatherSearch">
          <template #prepend>
            <el-select v-model="inputArea" placeholder="选择城市" style="width: 120px">
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
      <!-- <e-charts class="charts" id="main" :option="option"></e-charts> -->
      <div class="charts" id="idmain"></div>
    </div>
  </div>

</template>
<script setup>
import * as echarts from "echarts"
import { reactive, ref, watch, onMounted } from 'vue';
import { getWeatherSearchApi } from '@/api/system/test'
import { Search } from '@element-plus/icons-vue'
const inputArea = ref('重庆')
const getWeatherSearchData = ref('')
const weatherDate = ref([]) //日期
const weatherHeight = ref([])//最高温
const weatherLow = ref([])//最低温
//搜索天气
const getWeatherSearch = async () => {
  // console.log(inputArea.value);
  await getWeatherSearchApi(inputArea.value).then(res => {
    getWeatherSearchData.value = res.data.result
    // console.log(getWeatherSearchData.value.forecast_list);
    weatherDate.value = getWeatherSearchData.value.forecast_list.map(item => item.date).slice(1, 8); //映射date并取1-8 共7个
    weatherDate.value = weatherDate.value.map(item => item.slice(5, 10))//2024-06-01取5-10位
    // console.log( weatherDate.value);
    weatherHeight.value = getWeatherSearchData.value.forecast_list.map(item => item.high_temperature).slice(1, 8);
    weatherLow.value = getWeatherSearchData.value.forecast_list.map(item => item.low_temperature).slice(1, 8);
    // 渲染
    // console.log(weatherDate.value);
    option.value.xAxis.data = weatherDate.value
    option.value.series[0].data = weatherHeight.value
    option.value.series[1].data = weatherLow.value

    init() // 初始化echarts
  })
}
const option = computed(() => {
  return {
    // 标题组件 包含主标题和副标题
    title: {
      x: "left",    // 'left' | 'right' | 'center' | '100px'
      y: "4%",     // 'top' | 'bottom' | 'center' | '100px'
      text: '七日天气预报' // 标题内容
    },
    // 提示框组件 可以设置在多种地方
    tooltip: {
      trigger: 'axis',
      backgroundColor: "transparent", // 标题背景色 - 透明
    },
    // 图例组件 展现了不同系列的标记(symbol)，颜色和名字。可以通过点击图例控制哪些系列不显示。
    legend: {
      top: "7%", // bottom:"20%" // 组件离容器的距离
      right: "5%", //left:"10%"  // // 组件离容器的距离
      // backgroundColor: "white",          //标题背景色
      textStyle: {
        color: "white", // 文字的颜色
      },
    },
    // 提示框组件 可以设置在多种地方 在坐标系中，即 grid.tooltip、polar.tooltip、single.tooltip
    // 系列中，即 series.tooltip 每个数据项中，即 series.data.tooltip
    toolbox: {
      show: true,
      feature: {
        dataZoom: {
          yAxisIndex: 'none'
        },
        dataView: { readOnly: false },
        magicType: { type: ['line', 'bar'] },
        restore: {},
        saveAsImage: {}
      }
    },
    // 可用于调整图例在整个容器中的占位
    // gird: {},
    // x轴
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['1', '2', '3', '4', '5', '6', '7'],
      axisLine: {
        lineStyle: {
          color: '#000'   //x轴颜色
        },
        // symbol:['none','arrow'], //轴线两边的箭头
        // symbolSize:[8, 12]  //箭头大小
      },
    },
    // y轴
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: '{value} °C'
      }
    },
    series: [
      {
        itemStyle: {
          color: '#62B4FF'
        },
        name: '最高温度',
        type: 'line',
        data: [10, 11, 13, 11, 12, 12, 9],
        markPoint: {
          data: [
            { type: 'max', name: 'Max' },
            { type: 'min', name: 'Min' }
          ]
        },
        markLine: {
          data: [{ type: 'average', name: 'Avg' }]
        }
      },
      {
        name: '最低温度',
        type: 'line',
        data: [1, -2, 2, 5, 3, 2, 0],
        markPoint: {
          data: [{ name: '周最低', value: -2, xAxis: 1, yAxis: -1.5 }]
        },
        markLine: {
          data: [
            { type: 'average', name: 'Avg' },
            [
              {
                symbol: 'none',
                x: '90%',
                yAxis: 'max'
              },
              {
                symbol: 'circle',
                label: {
                  position: 'start',
                  formatter: 'Max'
                },
                type: 'max',
                name: '最高点'
              }
            ]
          ]
        }
      }
    ]
  }
});
const init = () => {
  let chart = echarts.init(document.getElementById('idmain'), 'dark')
  chart.setOption(option.value)
}
onMounted(() => {
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

.charts {
  height: 400px;
  width: 600px;
}
</style>