<template>
  <div class="upload">
    <el-upload
      :action="$api.upload"
      name="image"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :on-error="handleError"
      :on-success="handleSuccess"
      :show-file-list="showFileList"
      :before-upload="beforeAvatarUpload"
      :on-exceed="handleExceed"
      :file-list="filelist"
      :limit="limit"
      list-type="picture-card"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar">
      <i v-else class="el-icon-plus" />
    </el-upload>
    <el-dialog :visible.sync="dialogVisible" width="400px" :append-to-body="true">
      <img width="100%" :src="dialogImageUrl">
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
    filelist: {
      type: Array,
      default() {
        return []
      }
    },
    imageUrl: {
      type: String,
      default: ''
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
    handleRemove(file, fileList) {
      this.$emit('handleRemove', file, fileList)
    },
    handleError(err) {
      console.log(err)
    },
    handleSuccess(response, file, fileList) {
      this.$emit('handleSuccess', response, file, fileList)
    },
    beforeAvatarUpload(file) {
      // this.$emit('beforeAvatarUpload')
      const typeArr = ['image/gif', 'image/jpeg', 'image/jpg', 'image/png']
      const isType = typeArr.includes(file.type)
      const isLt1M = file.size / 1024 / 1024 < 1

      if (!isType) {
        this.$message.error('上传头像图片只能是 png,jpg,jpeg,gif 格式!')
      }
      if (!isLt1M) {
        this.$message.error('上传头像图片大小不能超过 1MB!')
      }
      return isType && isLt1M
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
.avatar{
  width: 150px;
  height: 150px;
  border-radius: 6px;
}
</style>
