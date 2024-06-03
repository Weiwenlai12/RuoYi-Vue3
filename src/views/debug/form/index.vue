<template>
  <div class="app-container">
    <el-button type="primary" plain @click="pdfDialogVisible = true">
      PDF预览
    </el-button>
    <!-- PDF预览 -->
    <el-dialog v-model="pdfDialogVisible" title="Warning" width="1200" align-center>
      <!-- <span>Open the dialog from the center from the screen</span> -->
      <template #footer>
        <div class="dialog-footer">
          <div>
            <iframe :src="pdfUrl" frameborder="0"
              style="width: 80%; height: 100vh; margin: auto; display: block"></iframe>
          </div>
          <!-- <el-button @click="centerDialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="centerDialogVisible = false">
            Confirm
          </el-button> -->
        </div>
      </template>
    </el-dialog>

    <el-button type="primary"  plain @click="wordDialogVisible = true">
      word预览
    </el-button >
    <!-- PDF预览 -->
    <el-dialog v-model="wordDialogVisible" title="Warning" width="1200" align-center>
      <!-- <span>Open the dialog from the center from the screen</span> -->
      <template #footer>
        <div class="dialog-footer">
          <div>
            <iframe :src="wordUrl" frameborder="0"
              style="width: 80%; height: 100vh; margin: auto; display: block"></iframe>
          </div>
          <!-- <el-button @click="centerDialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="centerDialogVisible = false">
            Confirm
          </el-button> -->
        </div>
      </template>
    </el-dialog>

<div ref="main" id="idmain" style="width: 100%; height: 400px"></div>



  </div>
</template>

<script setup>
import * as echarts from "echarts";
const main = ref() 
import { ref , computed, onMounted } from 'vue';
const pdfDialogVisible = ref(false)
const wordDialogVisible = ref(false)
const pdfUrl = "../testPdf.pdf"
const wordUrl = "../test.docx"
let date=['111222','111333','111444','111555']


onMounted(()=>{
  init()
})

const namePage =computed(()=>{
  return {
    
  }
})
var option = {
    title: {
      text: 'ECharts 入门示例'
    },
    tooltip: {},
    legend: {
      data: ['销量']
    },
    xAxis: {
      data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
    },
    yAxis: {},
    series: [
      {
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20]
      }
    ]
  };
const init=()=>{
  let chart = echarts.init(document.getElementById('idmain'),'dark');
  chart.setOption(option)
}
</script>

<style scoped>
.charts{
  height:400px;
}
</style>