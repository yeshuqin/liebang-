<template>
  <div class="ad_list">
    <!-- <div class="search_wrapper">
      <el-form :inline="true" size="small" :model="formInline" label-width="100px">
        <el-form-item label="广告ID：">
          <el-input v-model.trim="formInline.id" clearable placeholder="请输入广告ID" />
        </el-form-item>
        <el-form-item label="广告名称：">
          <el-input v-model.trim="formInline.name" clearable placeholder="请输入广告名称" />
        </el-form-item>
        <el-form-item label="广告编码：">
          <el-input v-model.trim="formInline.code" clearable placeholder="请输入广告编码" />
        </el-form-item>
        <el-form-item class="fr">
          <el-button type="primary" size="small" icon="el-icon-search" @click="handleSearch">搜索</el-button>
          <el-button type="primary" size="small" icon="el-icon-plus" @click="handleAdd">新增</el-button>
        </el-form-item>
      </el-form>
    </div> -->
    <el-button class="mb20" type="primary" size="small" icon="el-icon-plus" @click="handleAdd">新增</el-button>
    <div class="table_wrapper">
      <tl-table
        :table="dataTable"
        :showpagination="false"
        @sizeChange="sizeChange"
        @pageChange="pageChange"
        @handleDel="handleDel"
      >
        <template slot="picUrl" slot-scope="props">
          <span v-if="!props.obj.row.picUrl">暂无图片</span>
          <img v-else :src="props.obj.row.picUrl" class="picUrl" alt="">
        </template>
        <template slot="linkUrl" slot-scope="props">
          <a class="link_btn" :href="props.obj.row.linkUrl" target="_blank">{{ props.obj.row.linkUrl }}</a>
        </template>
        <template slot="useStatus" slot-scope="props">
          <span>{{ props.obj.row.useStatus === 0 ? '未上线' : '已生效' }}</span>
        </template>
        <template slot="handleStatus" slot-scope="props">
          <span v-if="props.obj.row.useStatus === 0" class="link_btn" @click="handleStatus(props.obj.row)">生效</span>
          <span v-else class="link_btn red" @click="handleStatus(props.obj.row)">停用</span>
        </template>
      </tl-table>
    </div>
    <!-- 新增广告 -->
    <el-dialog title="新增广告配置" :visible.sync="showAddDialog" custom-class="add_dialog" width="800px" center>
      <el-form ref="ruleForm" :model="addObj" :rules="rules" label-width="120px" size="small">
        <el-form-item label="广告编码:" required>
          <el-input v-model.trim="addObj.code" clearable placeholder="请输入广告编码" />
        </el-form-item>
        <el-form-item label="广告名称:" required>
          <el-input v-model.trim="addObj.name" clearable placeholder="请输入广告名称" />
          <p class="tip">长度不能超过50个汉字</p>
        </el-form-item>
        <!-- <el-form-item label="展示名称:" required>
          <el-col :span="11">
            <el-input v-model.trim="addObj.name" clearable placeholder="请输入" style="width:100%" />
          </el-col>
          <el-col class="line" :span="2">至</el-col>
          <el-col :span="11">
            <el-input v-model.trim="addObj.name" clearable placeholder="请输入" style="width:100%" />
          </el-col>
        </el-form-item> -->
        <el-form-item label="配置链接:">
          <el-input v-model.trim="addObj.linkUrl" clearable placeholder="请输入配置链接" />
        </el-form-item>
        <el-form-item label="广告内容:" required>
          <!-- <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            multiple
            :limit="3"
            :file-list="fileList"
          >
            <el-button size="small" type="primary">图片上传</el-button>
            <span slot="tip" class="el-upload__tip">(格式:png,jpg,jpeg,gif,大小不超过1M)</span>
          </el-upload> -->
          <Upload :limit="1" @handleSuccess="handleSuccessUpload" />
          <div class="tip">(格式:png,jpg,jpeg,gif,大小不超过1M)</div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" type="primary" @click="handleSumbitSave">提 交</el-button>
        <el-button size="small" @click="showAddDialog = false">返 回</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import tlTable from '@/components/BaseTable/tlTable'
import Upload from '@/components/Upload/index'
var addObj = {
  name: '',
  code: '',
  linkUrl: '',
  picUrl: 'https://www.baidu.com/img/PCfb_5bf082d29588c07f842ccde3f97243ea.png'
}
export default {
  components: {
    tlTable,
    Upload
  },
  data() {
    return {
      formInline: {
        id: '',
        name: '',
        code: ''
      },
      dataTable: {
        hasSelect: false,
        hasExpand: false,
        loading: false,
        page: 1,
        size: 50,
        total: 0,
        expands: [],
        tr: [
          {
            label: '广告ID',
            prop: 'id',
            init: '-'
          },
          {
            label: '广告名称',
            prop: 'name',
            init: '—'
          },
          {
            label: '广告内容',
            prop: 'picUrl',
            slot: true,
            init: '—'
          },
          {
            label: '广告编号',
            prop: 'code',
            init: '—'
          },
          {
            label: '链接地址',
            prop: 'linkUrl',
            slot: true,
            init: '—'
          },
          {
            label: '状态',
            prop: 'useStatus',
            slot: true,
            init: '—'
          },
          {
            label: '操作人',
            prop: 'operator',
            init: '—'
          }
        ],
        data: [],
        operation: {
          width: '200',
          data: [
            {
              label: '停用',
              Fun: 'handleStatus',
              slot: true
            },
            {
              label: '删除',
              Fun: 'handleDel'
            }
          ]
        }
      },
      rules: {
        code: [
          { required: true, message: '请输入广告编码', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入广告名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度不能超过50个汉字', trigger: 'blur' }
        ]
      },
      addObj: {},
      showAddDialog: false,
      fileList: []
    }
  },
  created() {
    this.getInfor()
  },
  methods: {
    getInfor() {
      // var params = Object.assign({}, {
      //   current: this.dataTable.page,
      //   size: this.dataTable.size
      // }, this.formInline)
      this.dataTable.loading = true
      this.$http.send(this.$api.banner, {}, 'get').then(res => {
        if (res.data) {
          this.dataTable.data = res.data
        }
        this.dataTable.loading = false
      }).catch(res => {
        this.dataTable.loading = false
      })
    },
    handleStatus(row) {
      this.$confirm(`此操作${row.useStatus === 0 ? '生效' : '停用'}[${row.name}]广告, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var status = row.useStatus === 0 ? 1 : 0
        var url = `${this.$api.banner}/${row.id}/setting/${status}`
        this.$http.send(url, {}, 'patch').then(res => {
          this.$message.success('操作成功~')
          this.getInfor()
        }).catch(res => {
          this.$message.error(res.msg)
        })
      })
    },
    handleSearch() {
      this.dataTable.page = 1
      this.getInfor()
    },
    handleAdd() {
      this.addObj = Object.assign({}, addObj)
      this.showAddDialog = true
    },
    handleSet(row) {
      this.$router.push({ name: 'ConfigGoods' })
    },
    handleDel(row) {
      this.$confirm('此操作将删除广告, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var url = `${this.$api.banner}/${row.id}`
        this.$http.send(url, {}, 'delete').then(res => {
          this.$message.success('操作成功~')
          this.getInfor()
        }).catch(res => {
          this.$message.error(res.msg)
        })
      })
    },
    handleSumbitSave() {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          this.$http.send(this.$api.banner, this.addObj, 'post').then(res => {
            this.$message.success('操作成功')
            this.showAddDialog = false
            this.getInfor()
          }).catch(res => {
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleSuccessUpload(file, fileList) {
      console.log(file, fileList)
    },
    pageChange(page) {
      this.dataTable.page = page
      this.getInfor()
    },
    sizeChange(size) {
      this.dataTable.size = size
      this.getInfor()
    }
  }
}
</script>

<style lang="scss" scoped>
.add_dialog {
  .el-input, .el-select {
    width: 70%;
  }
  .line {
    text-align: center;
  }
  .el-upload__tip {
    margin-left: 20px;
  }
}
</style>
