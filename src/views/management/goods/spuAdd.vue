<template>
  <div class="spu_wrapper">
    <el-form ref="spuForm" size="small" :model="spuForm" :rules="rules" label-width="100px" class="spuForm">
      <el-form-item v-if="isEdit" label="商品ID：" required>
        <el-input v-model="spuForm.id" clearable filterable disabled placeholder="请输入商品ID" />
      </el-form-item>
      <el-form-item label="一级类别：" required>
        <el-select v-model="spuForm.cateId" clearable filterable placeholder="请选择">
          <el-option
            v-for="item in cateList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="服务类型：" required>
        <el-input v-model="spuForm.name" clearable filterable placeholder="请输入服务类型" />
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
        <Upload :limit="10" :filelist="filelistPic" @handleSuccess="handleSuccessPic" @handleRemove="handleRemovePic" />
        <p class="tip">备注：最多10张，建议尺寸900*900px</p>
      </el-form-item>
      <el-form-item label="商品主题：" required>
        <Upload :limit="10" :show-file-list="false" :image-url="spuForm.primaryPic" @handleSuccess="handleSuccessTheme" />
        <p class="tip">上传的图片默认作为主题，建议尺寸900*900px，1M以内</p>
      </el-form-item>
      <skuAudit ref="sku" :dataList="dataList" :isEdit="isEdit"></skuAudit>
      <el-form-item label="商品详情：" required>
        <el-row>
          <el-col :span="8">
            <p class="title">产品内容</p>
            <Upload :limit="10" :show-file-list="false" :image-url="introductionList['产品内容']" @click.native="handleType('产品内容')" @handleSuccess="handleSuccessPro" />
          </el-col>
          <el-col :span="8">
            <p class="title">产品作用</p>
            <Upload :limit="10" :show-file-list="false" :image-url="introductionList['产品作用']" @click.native="handleType('产品作用')" @handleSuccess="handleSuccessPro" />
          </el-col>
          <el-col :span="8">
            <p class="title">服务优势</p>
            <Upload :limit="10" :show-file-list="false" :image-url="introductionList['服务优势']" @click.native="handleType('服务优势')" @handleSuccess="handleSuccessPro" />
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <p class="title">办理流程</p>
            <Upload :limit="10" :show-file-list="false" :image-url="introductionList['办理流程']" @click.native="handleType('办理流程')" @handleSuccess="handleSuccessPro" />
          </el-col>
          <el-col :span="8">
            <p class="title">所需资料</p>
            <Upload :limit="10" :show-file-list="false" :image-url="introductionList['所需资料']" @click.native="handleType('所需资料')" @handleSuccess="handleSuccessPro" />
          </el-col>
          <el-col :span="8">
            <p class="title">常见问题</p>
            <Upload :limit="10" :show-file-list="false" :image-url="introductionList['常见问题']" @click.native="handleType('常见问题')" @handleSuccess="handleSuccessPro" />
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
            @handleEdit="handleEdit"
          >
            <template slot="picUrl" slot-scope="props">
              <span v-if="!props.obj.row.picUrl">暂无图片</span>
              <img v-else class="picUrl" :src="props.obj.row.picUrl" alt="">
            </template>
            <template slot="fileUrl" slot-scope="props">
              <a v-if="props.obj.row.fileUrl" class="link_btn" :href="props.obj.row.fileUrl" target="_blank">{{ props.obj.row.fileUrl }}</a>
              <span v-else>暂无</span>
            </template>
          </tl-table>
          <p class="tip">文件大小不超过10M,照片建议尺寸900*900px</p>
        </div>
      </el-form-item>
      <el-form-item label="简介：">
        <el-input v-model="spuForm.synopsis" type="textarea" :rows="4" clearable placeholder="请输入简介" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="small" @click="handleSumbitSpu('spuForm')">提交</el-button>
        <el-button size="small" @click="handleGo">返回</el-button>
      </el-form-item>
    </el-form>
    <!-- 新增材料 -->
    <el-dialog :title="fileEdit? '编辑材料' : '新增材料'" :visible.sync="showAddDialog" custom-class="add_dialog" width="600px" center>
      <el-form ref="ruleForm" :model="addObj" size="small" label-width="120px">
        <el-form-item label="材料名称:" required>
          <el-input v-model.trim="addObj.name" clearable placeholder="请输入材料名称" />
        </el-form-item>
        <el-form-item label="上传文件:">
          <el-upload
            :action="$api.upload"
            name="image"
            :limit="1"
            :on-remove="handleFileRemove"
            :on-error="handleError"
            :on-success="handleFileSuccess"
            :file-list="fileList"
          >
            <el-button size="small" type="primary">上传资料</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="上传图片:">
          <Upload :filelist="picFileList" @handleSuccess="handleSuccessPicUrl" @handleRemove="handleRemovePicUrl" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" size="small" @click="handleSumbitAdd">确 定</el-button>
        <el-button size="small" @click="showAddDialog = false">返 回</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Upload from '@/components/Upload/index'
import tlTable from '@/components/BaseTable/tlTable'
import skuAudit from './skuAudit'
var addMaterial = {
  fileUrl: '',
  picUrl: '',
  id: '',
  name: ''
}
export default {
  components: {
    Upload,
    tlTable,
    skuAudit
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
        tags: '',
        materialList: []
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
            prop: 'name',
            init: '-'
          },
          {
            label: '上传文件',
            prop: 'fileUrl',
            slot: true,
            init: '—'
          },
          {
            label: '上传图片',
            prop: 'picUrl',
            slot: true,
            init: '—'
          }
        ],
        data: [],
        operation: {
          width: '100',
          data: [
            {
              label: '编辑',
              Fun: 'handleEdit'
            },
            {
              label: '删除',
              Fun: 'handleDel'
            }
          ]
        }
      },
      isEdit: false,
      tagsList: [],
      picListList: [], // 商品列表
      introductionList: {
        '产品内容': '',
        '产品作用': '',
        '服务优势': '',
        '办理流程': '',
        '所需资料': '',
        '常见问题': ''
      }, // 商品详情
      introductionKey: '',
      inputVisible: false,
      inputValue: '',
      showAddDialog: false,
      cateList: [],
      addObj: {},
      fileList: [],
      id: this.$route.query.id,
      picFileList: [],
      filelistPic: [],
      fileEdit: false,
      dataList: []
    }
  },
  created() {
    this.getCate()
    this.isEdit = !!this.id
    if (this.isEdit) {
      this.getDetail()
      this.getSkuList()
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
        this.picListList = res.data.picList.split(',')
        this.dataTable.data = res.data.materialList || []
        this.filelistPic = res.data.picList.split(',').map(item => {
          return {
            url: item
          }
        })
      }).catch(res => {
        this.$message.error(res.msg)
      })
    },
    getSkuList() {
      var url = `${this.$api.sku}/spu/${this.id}`
      this.$http.send(url, {}, 'get').then(res => {
        console.log(res, 'res==')
        this.dataList = res.data
      }).catch(res => {
        this.$message.error(res.msg)
      })
    },
    getCate() {
      this.$http.send(this.$api.addCate, {}, 'get').then(res => {
        if (res.data) {
          this.cateList = res.data
        }
      }).catch(res => {
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
    handleSuccessPic(response) { // 商品图片
      this.picListList.push(response.data)
    },
    handleRemovePic(file, fileList) {
      this.picListList = this.fileList.map(item => {
        return item.response.data
      })
    },
    handleSuccessTheme(response) { // 商品主题
      this.spuForm.primaryPic = response.data
    },
    handleSuccessPro(response) {
      this.introductionList[this.introductionKey] = response.data
    },
    handleType(type) {
      this.introductionKey = type
    },
    handleSuccessPicUrl(response) { // 材料上传图片
      this.addObj.picUrl = response.data
    },
    handleRemovePicUrl() {
      this.addObj.picUrl = ''
    },
    handleFileSuccess(response) { //材料上传资料
      this.addObj.fileUrl = response.data
    },
    handleFileRemove() {
      this.addObj.fileUrl = ''
    },
    handleError(err) {
      console.log(err)
    },
    addMaterial() {
      this.addObj = Object.assign({}, addMaterial)
      this.picFileList = []
      this.fileEdit = false
      this.showAddDialog = true
    },
    handleSumbitAdd() {
      if (!this.addObj.name) {
        this.$message.error('请输入材料名称~')
        return
      }
      if (!this.fileEdit) {
        this.dataTable.data.push(JSON.parse(JSON.stringify(this.addObj)))
      } else {
        this.$set(this.dataTable.data, this.addObj.index, this.addObj)
      }
      this.showAddDialog = false
    },
    handleEdit(row, index) {
      this.addObj = Object.assign({}, addMaterial, row, {
        index: index
      })
      this.picFileList = row.picUrl ? [{ url: row.picUrl }] : []
      this.fileEdit = true
      this.showAddDialog = true
    },
    handleDel(row, index) {
      this.$confirm(`此操作将删除${row.name}材料, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.dataTable.data.splice(index, 1)
        this.$message.success('操作成功~')
      })
    },
    handleSumbitSpu() {
      let skuList = this.$refs.sku.handleSumbitSave()
      if (!this.spuForm.name) {
        this.$message.error('请输入服务类型')
        return
      }
      if (!this.spuForm.cateId) {
        this.$message.error('请选择一级类别')
        return
      }
      if (this.picListList.length === 0) {
        this.$message.error('请上传商品图片列表')
        return
      }
      if (!this.spuForm.primaryPic) {
        this.$message.error('请上传商品主图图片')
        return
      }
      for (var key in this.introductionList) {
        if (!this.introductionList[key]) {
          this.$message.error(`请上传${key}图片`)
          return
        }
      }

      if(skuList.length === 0) {
        this.$message.error('至少新增一条sku属性~')
        return
      }
      this.spuForm.synopsis = JSON.stringify(this.spuForm.synopsis)
      var params = Object.assign({}, this.spuForm, {
        introduction: JSON.stringify(this.introductionList),
        picList: this.picListList.join(','),
        tags: this.tagsList.join(','),
        materialList: this.dataTable.data,
        skuList
      })
      console.log(params)
      var method = params.id ? 'put' : 'post'
      this.$http.send(this.$api.spu, params, method).then(res => {
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
