<template>
  <!-- 预览图片 -->
    <el-dialog
      title="预览图片"
      :visible.sync="showViewImgDialog"
      width="650px"
      custom-class="view_dialog"
      top="12px"
      center
      :before-close="handleClose">
      <img :src="imgSrc"  alt="">
      <!-- <span slot="footer" class="dialog-footer">
        <el-button @click="showViewImgDialog = false">取 消</el-button>
        <el-button type="primary" @click="showViewImgDialog = false">确 定</el-button>
      </span> -->
    </el-dialog>
</template>

<script>
  export default {
    props: {
      showViewImgDialog: {
        type: Boolean,
        default: false
      },
      imgSrc: {
        type: String,
        default: ''
      }
    },
    methods: {
      handleClose() {
        this.$emit('update:showViewImgDialog', false)
      }
    }
  }
</script>

<style lang="scss">
.view_dialog {
  .el-dialog__body {
    max-height: 600px;
    overflow-y: auto;
  }
  img {
    display: block;
    margin: 0 auto;
    max-width: 600px;
  }
}
</style>