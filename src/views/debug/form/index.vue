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

  </div>
</template>

<script setup>
import { ref } from 'vue';
const pdfDialogVisible = ref(false)
const wordDialogVisible = ref(false)

const pdfUrl = "../testPdf.pdf"
const wordUrl = "../test.docx"


</script>

<style scoped></style>