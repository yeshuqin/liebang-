<template>
  <div class="upload">
    <el-upload
      :action="$api.upload"
      name="image"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :on-success="handleSuccess"
      :show-file-list="showFileList"
      :before-upload="beforeAvatarUpload"
      :on-exceed="handleExceed"
      :file-list="fileList"
      :limit="limit"
    >
      <!-- <i class="el-icon-plus" /> -->
      <el-button size="small" type="primary">上传图片</el-button>
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
    beforeAvatarUpload(file) {
      // this.$emit('beforeAvatarUpload')
      const isJPG = file.type === 'image/jpeg'
      const isLt1M = file.size / 1024 / 1024 < 1

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt1M) {
        this.$message.error('上传头像图片大小不能超过 1MB!')
      }
      return isJPG && isLt1M
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