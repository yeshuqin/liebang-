<template>
  <div class="spu_wrapper">
    <el-form ref="spuForm" :model="spuForm" :rules="rules" label-width="100px" class="spuForm">
      <el-form-item label="商品ID：" prop="name">
        <el-input v-model="spuForm.name" placeholder="请输入商品ID" />
      </el-form-item>
      <el-form-item label="一级类别：" prop="region">
        <el-select v-model="spuForm.type" placeholder="请选择">
          <el-option label="区域一" value="shanghai" />
          <el-option label="区域二" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item label="服务类型：" prop="desc">
        <el-input v-model="spuForm.in" placeholder="请输入服务类型" />
      </el-form-item>
      <el-form-item label="服务类型：" prop="desc">
        <el-input v-model="spuForm.in" placeholder="请输入服务类型" />
      </el-form-item>
      <el-form-item label="商品图片：" required>
        <Upload :limit="10" @handleSuccess="handleSuccessTheme" />
        <p>备注：最多10张，建议尺寸900*900px</p>
      </el-form-item>
      <el-form-item label="商品主题：" required>
        <Upload :limit="10" />
        <p>上传的图片默认作为主题，建议尺寸900*900px，1M以内</p>
      </el-form-item>
      <el-form-item label="商品详情：" required>
        <el-row>
          <el-col :span="8">
            <p class="title">产品内容</p>
            <Upload />
          </el-col>
          <el-col :span="8">
            <p class="title">产品作用</p>
            <Upload />
          </el-col>
          <el-col :span="8">
            <p class="title">服务优势</p>
            <Upload />
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <p class="title">办理流程</p>
            <Upload />
          </el-col>
          <el-col :span="8">
            <p class="title">所需资料</p>
            <Upload />
          </el-col>
          <el-col :span="8">
            <p class="title">常见问题</p>
            <Upload />
          </el-col>
        </el-row>
        <p>备注：每个不超过一张，建议尺寸x*1280px</p>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('spuForm')">立即创建</el-button>
        <el-button @click="resetForm('spuForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Upload from '@/components/Upload/index'
export default {
  components: {
    Upload
  },
  data() {
    return {
      spuForm: {
        name: '',
        type: '',
        in: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入商品ID', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleSuccessTheme(file, fileList) {
      console.log(file, fileList, '22')
    },
    submitForm() {

    },
    resetForm() {}
  }
}
</script>

<style lang="scss" scoped>
.spu_wrapper {
  .spuForm {
    width: 800px;
    .el-input, .el-select{
      width: 400px;
    }
    .title {
      font-size: 14px;
      font-weight: bold;
      margin: 0;
    }
    .el-col {
      text-align: center;
    }
  }
}
</style>
