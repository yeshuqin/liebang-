<template>
  <div class="upload">
    <el-upload
      action="https://jsonplaceholder.typicode.com/posts/"
      list-type="picture-card"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :on-success="handleSuccess"
      :show-file-list="showFileList"
      :before-upload="beforeAvatarUpload"
      :on-exceed="handleExceed"
      :file-list="fileList"
      :limit="limit"
    >
      <i class="el-icon-plus" />
    </el-upload>
    <el-dialog :visible.sync="dialogVisible" width="400px">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    showFileList: {
      type: Boolean,
      default: true
    },
    limit: {
      type: Number,
      default: 1
    },
    fileList: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false
    }
  },
  methods: {
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleRemove() {},
    handleSuccess(response, file, fileList) {
      this.$emit('handleSuccess', response, file, fileList)
    },
    beforeAvatarUpload() {
      this.$emit('beforeAvatarUpload')
    },
    handleExceed(files, fileList) {
      if (this.limit === 1) {
        return
      }
      this.$message.warning(`最多上传 ${this.limit} 个图片`)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>