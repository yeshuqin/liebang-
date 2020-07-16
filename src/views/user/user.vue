<template>
  <div class="user">
    <el-form size="small" label-width="120px" style="width:500px;">
       <el-form-item label="管理员名称：" required>
        <el-input v-model="userForm.name" clearable  placeholder="请输入管理员名称" />
      </el-form-item>
      <el-form-item label="账号：" required>
        <el-input v-model="userForm.username" clearable placeholder="请输入账号" />
      </el-form-item>
      <el-form-item label="密码：" required>
        <el-input v-model="userForm.password" type="password" clearable placeholder="请输入密码" />
      </el-form-item>
    </el-form>
    <el-button type="primary" size="small" @click="handleAdd">新增</el-button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        userForm: {
          name: '',
          username: '',
          password: ''
        }
      }
    },
    methods: {
      handleAdd() {
        if(!this.userForm.name) {
          this.$message.error('请输入管理员名称')
          return
        }
        if(!this.userForm.username) {
          this.$message.error('请输入账号')
          return
        }
        if(!this.userForm.password) {
          this.$message.error('请输入密码')
          return
        }
        this.$http.send(this.$api.account, this.userForm, 'post').then(res => {
          console.log(res)
        })
      }
    } 
  }
</script>

<style lang="scss" scoped>
.user {
  padding: 20px;
}
</style>