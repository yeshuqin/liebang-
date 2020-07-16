<!-- 修改密码 -->
<template>
  <div class="change_pwd">
    <el-form label-position="top" label-width="80px" size="small" :model="formInfo" class="form_info">
      <el-form-item label="原密码">
        <el-input clearable type="password" v-model.trim="formInfo.oldPassword" placeholder="请输入原密码"></el-input>
      </el-form-item>
      <el-form-item label="新密码">
        <el-input clearable type="password" v-model.trim="formInfo.newPassword" placeholder="请输入新密码"></el-input>
      </el-form-item>
      <el-form-item label="确认密码">
        <el-input clearable type="password" v-model.trim="formInfo.confirmPassword" placeholder="请输入确认密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :loading="loading"  size="small" @click="submitPwd">修改密码</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loading: false,
      formInfo: {
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
      }
    }
  },
  components: {},
  methods: {
    submitPwd () {
      if (!this.formInfo.oldPassword) {
        this.$message.error('请输入原密码')
        return
      }
      if (!this.formInfo.newPassword || this.formInfo.newPassword.length < 6) {
        this.$message.error('请正确输入新密码并且长度不少于6')
        return
      }
      let oldPwd = md5(this.formInfo.oldPassword)
      let newPwd = md5(this.formInfo.newPassword)
      let confirmPwd = md5(this.formInfo.confirmPassword)
      if (newPwd !== confirmPwd) {
        this.$message.error('新密码与确认密码不一致')
        return
      }
      this.loading = true
      this.$http.send(this.$api.account, {
          oldPassword: oldPwd,
          newPassword: newPwd
        }, 'put').then(res => {
        this.loading = false
        this.$message.success('操作成功,请重新登录')
        this.$http.send(this.$api.logout, {}, 'patch').then(res => {
          this.$store.dispatch('/user/logout')
          this.$router.push({name: 'login'})
        })
      }).catch(res => {
        this.loading = false
        this.$message.error(res.msg)
      })
    }
  }
}
</script>
<style lang='scss' scoped>
.change_pwd {
  .form_info {
    width: 400px;
    margin: 0 auto;
  }
}
</style>
