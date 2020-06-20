<template>
  <div class="spu_wrapper">
    <el-form ref="spuForm" size="small" :model="spuForm" :rules="rules" label-width="100px" class="spuForm">
      <el-form-item v-if="isEdit" label="商品ID：" required>
        <el-input v-model="spuForm.id" clearable filterable disabled placeholder="请输入商品ID" />
      </el-form-item>
      <el-form-item label="商品名称：" required>
        <el-input v-model="spuForm.name" clearable filterable placeholder="请输入商品名称" />
      </el-form-item>
      <el-form-item label="一级类别：" required>
        <el-select v-model="spuForm.cateId" clearable filterable placeholder="请选择">
          <el-option label="区域一" value="shanghai" />
        </el-select>
      </el-form-item>
      <el-form-item label="标签：" required>
        <el-tag
          v-for="tag in tagsList"
          :key="tag"
          closable
          :disable-transitions="false"
          @close="handleClose(tag)"
        >
          {{ tag }}
        </el-tag>
        <el-input
          v-if="inputVisible"
          ref="saveTagInput"
          v-model="inputValue"
          class="input-new-tag"
          size="small"
          @keyup.enter.native="handleInputConfirm"
          @blur="handleInputConfirm"
        />
        <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 新增</el-button>
      </el-form-item>
      <el-form-item label="商品图片：" required>
        <Upload :limit="10" @handleSuccess="handleSuccessTheme" />
        <p class="tip">备注：最多10张，建议尺寸900*900px</p>
      </el-form-item>
      <el-form-item label="商品主题：" required>
        <Upload :limit="10" />
        <p class="tip">上传的图片默认作为主题，建议尺寸900*900px，1M以内</p>
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
        <p class="tip">备注：每个不超过一张，建议尺寸x*1280px</p>
      </el-form-item>
      <el-form-item label="资料上传：" required>
        <el-button size="small" class="mb20" type="primary" @click="addMaterial">新增资料</el-button>
        <div class="table_wrapper">
          <tl-table
            :showpagination="false"
            :table="dataTable"
            @handleDel="handleDel"
          >
            <template slot="picUrl" slot-scope="props">
              <span v-if="!props.obj.row.picUrl">暂无图片</span>
              <img v-else :src="props.obj.row.picUrl" alt="">
            </template>
          </tl-table>
          <p class="tip">文件大小不超过10M,照片建议尺寸900*900px</p>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="small" @click="handleSumbitSpu('spuForm')">提交</el-button>
        <el-button size="small" @click="handleGo">返回</el-button>
      </el-form-item>
    </el-form>
    <!-- 新增材料 -->
    <el-dialog title="新增材料" :visible.sync="showAddDialog" custom-class="add_dialog" width="600px" center>
      <el-form ref="ruleForm" :model="addObj" size="small" label-width="120px">
        <el-form-item label="材料名称:" required>
          <el-input v-model.trim="addObj.code" clearable placeholder="请输入橱窗编码" />
        </el-form-item>
        <el-form-item label="上传文件:">
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            multiple
            :limit="3"
            :file-list="fileList"
          >
            <el-button size="small" type="primary">上传资料</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="上传图片:">
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            multiple
            :limit="3"
            :file-list="fileList"
          >
            <el-button size="small" type="primary">图片上传</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" size="small" @click="handleSumbitAdd">提 交</el-button>
        <el-button size="small" @click="showAddDialog = false">返 回</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Upload from '@/components/Upload/index'
import tlTable from '@/components/BaseTable/tlTable'
export default {
  components: {
    Upload,
    tlTable
  },
  data() {
    return {
      spuForm: {
        id: '',
        cateId: '',
        introduction: '',
        name: '',
        picList: '',
        primaryPic: '',
        synopsis: '',
        tags: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入商品ID', trigger: 'blur' }
        ]
      },
      dataTable: {
        hasSelect: false,
        hasExpand: false,
        hasIndex: true,
        loading: false,
        border: true,
        page: 1,
        size: 50,
        total: 0,
        expands: [],
        tr: [
          {
            label: '材料名称',
            prop: 'id',
            init: '-'
          },
          {
            label: '上传文件',
            prop: 'name',
            init: '—'
          },
          {
            label: '上传图片',
            prop: '',
            init: '—'
          }
        ],
        data: [
          {
            id: '001',
            status: 1
          },
          {
            id: '002',
            status: 2
          }
        ],
        operation: {
          width: '100',
          data: [
            {
              label: '删除',
              Fun: 'handleDel'
            }
          ]
        }
      },
      isEdit: false,
      tagsList: [],
      picListList: ['https://file2.pingxiaobao.com/dev/2005/29/039125f95f9419d9f621a3818c38977e.jpg'], // 商品列表
      introductionList: {
        '产品内容': 'https://file2.pingxiaobao.com/dev/2005/29/039125f95f9419d9f621a3818c38977e.jpg',
        '产品作用': 'https://file2.pingxiaobao.com/dev/2005/29/039125f95f9419d9f621a3818c38977e.jpg',
        '服务优势': 'https://file2.pingxiaobao.com/dev/2005/29/039125f95f9419d9f621a3818c38977e.jpg',
        '办理流程': 'https://file2.pingxiaobao.com/dev/2005/29/039125f95f9419d9f621a3818c38977e.jpg',
        '所需资料': 'https://file2.pingxiaobao.com/dev/2005/29/039125f95f9419d9f621a3818c38977e.jpg',
        '常见问题': 'https://file2.pingxiaobao.com/dev/2005/29/039125f95f9419d9f621a3818c38977e.jpg'
      }, // 商品详情
      primaryPicList: ['https://file2.pingxiaobao.com/dev/2005/29/039125f95f9419d9f621a3818c38977e.jpg'], // 商品主题
      inputVisible: false,
      inputValue: '',
      showAddDialog: false,
      addObj: {
        name: ''
      },
      fileList: [],
      id: this.$route.query.id
    }
  },
  created() {
    this.isEdit = !!this.id
    if (this.isEdit) {
      this.getDetail()
    }
  },
  methods: {
    getDetail() {
      var url = `${this.$api.spu}/${this.id}`
      this.$http.send(url, {}, 'get').then(res => {
        console.log(res, 'res')
        this.spuForm = res.data
        this.tagsList = res.data.tags.split(',')
        this.introductionList = JSON.parse(res.data.introduction)
      }).catch(res => {
        this.$message.error(res.msg)
      })
    },
    handleClose(tag) {
      this.tagsList.splice(this.tagsList.indexOf(tag), 1)
    },
    showInput() {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    handleInputConfirm() {
      var inputValue = this.inputValue
      if (inputValue) {
        this.tagsList.push(inputValue)
      }
      this.inputVisible = false
      this.inputValue = ''
    },
    handleSuccessTheme(file, fileList) {
      console.log(file, fileList, '22')
    },
    addMaterial() {
      this.showAddDialog = true
    },
    handleSumbitAdd() {

    },
    handleDel(row) {
      this.$confirm('此操作将删除材料, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var url = `${this.$api.showcase}/${row.id}`
        this.$http.send(url, {}, 'delete').then(res => {
          this.$message.success('操作成功~')
          this.getInfor()
        }).catch(res => {
          this.$message.error(res.msg)
        })
      })
    },
    handleSumbitSpu() {
      if (!this.spuForm.name) {
        this.$message.error('请输入商品名称')
        return
      }
      if (!this.spuForm.cateId) {
        this.$message.error('请选择一级类别')
        return
      }
      if (this.tagsList.length === 0) {
        this.$message.error('请填写标签')
        return
      }
      if (this.picListList.length === 0) {
        this.$message.error('请上传商品图片列表')
        return
      }
      if (this.primaryPicList.length === 0) {
        this.$message.error('请上传商品主图图片')
        return
      }
      for (var key in this.introductionList) {
        if (!this.introductionList[key]) {
          this.$message.error(`请上传${key}图片`)
          return
        }
      }
      var params = Object.assign({}, this.spuForm, {
        introduction: JSON.stringify(this.introductionList),
        picList: this.picListList.join(','),
        primaryPicList: this.primaryPicList.join(','),
        tags: this.tagsList.join(',')
      })
      this.$http.send(this.$api.spu, params, 'post').then(res => {
        this.$message.success('操作成功~')
        this.$router.push({ name: 'Goods' })
        this.getInfor()
      }).catch(res => {
        this.$message.error(res.msg)
      })
    },
    handleGo() {
      this.$router.push({ name: 'Goods' })
    }
  }
}
</script>

<style lang="scss" scoped>
.spu_wrapper {
  .spuForm {
    width: 1000px;
    .el-input, .el-select{
      width: 400px;
    }
    .title {
      font-size: 14px;
      font-weight: bold;
      margin: 0;
    }
    .el-col p{
      width: 150px;
      text-align: center;
    }
  }
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
}
</style>
