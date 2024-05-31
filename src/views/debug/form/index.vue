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

<e-charts class="charts" :option="option"></e-charts>



  </div>
</template>

<script setup>

import { ref , computed } from 'vue';
const pdfDialogVisible = ref(false)
const wordDialogVisible = ref(false)

const pdfUrl = "../testPdf.pdf"
const wordUrl = "../test.docx"
let date=['111222','111333','111444','111555']

const data=ref([
  {value: 50,name:'A'},
  {value: 70,name:'B'},
  {value: 110,name:'C'},
  {value: 60,name:'D'},
  {value: 30,name:'E'},
  {value: 60,name:'F'},
  {value: 90,name:'G'}
])

const namePage =computed(()=>{
  return {
    
  }
})
const option = computed(()=>{
  return {
    xAxis: {
    type: 'category',
    data: data.value.map(d=>d.name)
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: data.value.map(d=>d.value),
      type: 'line'
    }
  ]
  }
});

</script>

<style scoped>
.charts{
  height:400px;
}
</style>