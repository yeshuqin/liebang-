<template>
  <div class="ad_list">
    <!-- <div class="search_wrapper">
      <el-form :inline="true" size="small" :model="formInline" label-width="100px">
        <el-form-item label="橱窗ID">
          <el-input v-model.trim="formInline.id" clearable placeholder="请输入橱窗ID" />
        </el-form-item>
        <el-form-item label="橱窗名称">
          <el-input v-model.trim="formInline.name" clearable placeholder="请输入橱窗名称" />
        </el-form-item>
        <el-form-item label="橱窗编码">
          <el-input v-model.trim="formInline.code" clearable placeholder="请输入橱窗编码" />
        </el-form-item>
        <el-form-item class="fr">
          <el-button type="primary" size="small" icon="el-icon-search" @click="handleSearch">搜索</el-button>
          <el-button type="primary" size="small" icon="el-icon-plus" @click="handleAdd">新增</el-button>
        </el-form-item>
      </el-form>
    </div> -->
    <el-button type="primary" size="small" icon="el-icon-plus" class="mb20" @click="handleAdd">新增</el-button>
    <div class="table_wrapper">
      <tl-table
        :table="dataTable"
        :showpagination="false"
        @sizeChange="sizeChange"
        @pageChange="pageChange"
        @handleSet="handleSet"
        @handleDel="handleDel"
      >
        <template slot="picUrl" slot-scope="props">
          <span v-if="!props.obj.row.picUrl">暂无图片</span>
          <img v-else class="picUrl" :src="props.obj.row.picUrl" alt="">
        </template>
        <template slot="useStatus" slot-scope="props">
          <span>{{ props.obj.row.useStatus === 0 ? '未上线' : '已生效' }}</span>
        </template>
        <template slot="linkUrl" slot-scope="props">
          <a class="link_btn" :href="props.obj.row.linkUrl" target="_blank">{{ props.obj.row.linkUrl }}</a>
        </template>
        <template slot="handleStatus" slot-scope="props">
          <span v-if="props.obj.row.useStatus === 0" class="link_btn" @click="handleStatus(props.obj.row)">生效</span>
          <span v-else class="link_btn red" @click="handleStatus(props.obj.row)">停用</span>
        </template>
      </tl-table>
    </div>
    <!-- 新增橱窗配置 -->
    <el-dialog title="新增橱窗配置" :visible.sync="showAddDialog" custom-class="add_dialog" width="800px" center>
      <el-form ref="ruleForm" :model="addObj" size="small" label-width="120px">
        <el-form-item label="橱窗编码:" required>
          <el-input v-model.trim="addObj.code" clearable placeholder="请输入橱窗编码" />
        </el-form-item>
        <el-form-item label="橱窗名称:" required>
          <el-input v-model.trim="addObj.name" clearable placeholder="请输入橱窗名称" /> <span>长度不能超过50个汉字</span>
        </el-form-item>
        <!-- <el-form-item label="展示时间:" required>
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
        <el-form-item label="广告内容:">
          <Upload :limit="1" :filelist="filelist" @handleSuccess="handleSuccessUpload" @handleRemove="handleRemove" />
          <div class="tip">(格式:png,jpg,jpeg,gif,大小不超过1M)</div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" size="small" @click="handleSumbitSave">提 交</el-button>
        <el-button size="small" @click="showAddDialog = false">返 回</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import tlTable from '@/components/BaseTable/tlTable'
import Upload from '@/components/Upload/index'
var addObj = {
  id: '',
  code: '',
  linkUrl: '',
  name: '',
  picUrl: ''
}
export default {
  components: {
    tlTable,
    Upload
  },
  data() {
    return {
      formInline: {
        name: '',
        id: '',
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
            label: '橱窗ID',
            prop: 'id',
            init: '-'
          },
          {
            label: '橱窗名称',
            prop: 'name',
            init: '—'
          },
          {
            label: '橱窗内容',
            prop: 'picUrl',
            width: '120px',
            slot: true,
            init: '—'
          },
          {
            label: '橱窗编码',
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
          width: '200',
          data: [
            {
              label: '删除',
              Fun: 'handleDel'
            },
            {
              label: '配置',
              Fun: 'handleSet'
            },
            {
              Fun: 'handleStatus',
              slot: true
            }
          ]
        }
      },
      addObj: {},
      filelist: [],
      showAddDialog: false
    }
  },
  created() {
    this.getInfor()
  },
  watch: {
    showAddDialog(val) {
       this.filelist = []
    }
  },
  methods: {
    getInfor() {
      // var params = Object.assign({}, {
      //   current: this.dataTable.page,
      //   size: this.dataTable.size
      // }, this.formInline)
      this.dataTable.loading = true
      this.$http.send(this.$api.showcase, {}, 'get').then(res => {
        if (res.data) {
          this.dataTable.data = res.data
        }
        this.dataTable.loading = false
      }).catch(res => {
        this.dataTable.loading = false
      })
    },
    handleStatus(row) {
      this.$confirm(`此操作${row.useStatus === 0 ? '生效' : '停用'}[${row.name}]橱窗, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var status = row.useStatus === 0 ? 1 : 0
        var url = `${this.$api.showcase}/${row.id}/setting/${status}`
        this.$http.send(url, {}, 'patch').then(res => {
          this.$message.success('操作成功~')
          this.getInfor()
        }).catch(res => {
          // this.$message.error(res.msg)
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
      this.$router.push({ name: 'ConfigGoods', query: { id: row.id }})
    },
    handleDel(row) {
      this.$confirm('此操作将删除橱窗, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var url = `${this.$api.showcase}/${row.id}`
        this.$http.send(url, {}, 'delete').then(res => {
          this.$message.success('操作成功~')
          this.getInfor()
        }).catch(res => {
          // this.$message.error(res.msg)
        })
      })
    },
    handleSumbitSave() {
      if (!this.addObj.code) {
        this.$message.error('请输入橱窗编码~')
        return
      }
      if (!this.addObj.name) {
        this.$message.error('请输入橱窗名称~')
        return
      }
      if (this.addObj.name.length > 50) {
        this.$message.error('橱窗名称长度不能超过50个汉字~')
        return
      }
      this.$http.send(this.$api.showcase, this.addObj, 'post').then(res => {
        this.$message.success('操作成功')
        this.showAddDialog = false
        this.getInfor()
      }).catch(res => {
        // this.$message.error(res.message)
      })
    },
    handleSuccessUpload(file, fileList) {
      this.addObj.picUrl = file.data
    },
    handleRemove(file, fileList) {
      this.addObj.picUrl = ''
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
  .line {
    text-align: center;
  }
  .el-upload__tip {
    margin-left: 20px;
  }
}
</style>
