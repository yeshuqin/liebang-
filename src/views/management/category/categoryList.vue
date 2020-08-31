<template>
  <div class="category_list">
    <el-button type="primary" size="small" icon="el-icon-plus" @click="handleAdd">新增</el-button>
    <div class="table_wrapper">
      <tl-table
        :table="dataTable"
        :showpagination="false"
        @handleDel="handleDel"
        @handleTop="handleTop"
        @handleEdit="handleEdit"
      >
        <template slot="picUrl" slot-scope="props">
          <span v-if="!props.obj.row.picUrl">暂无图片</span>
          <img v-else :src="props.obj.row.picUrl" class="picUrl" alt="" @click="handlePreview(props.obj.row)">
        </template>
      </tl-table>
    </div>
    <!-- 类别 -->
    <el-dialog :title="`${addObj.id ? '编辑类别' : '新增类别'}`" :append-to-body="true" :visible.sync="showCategoryDialog" custom-class="add_dialog" width="600px" center>
      <el-form :model="addObj" label-width="120px" size="small">
        <el-form-item label="类别名称:" required>
          <el-input v-model.trim="addObj.name" clearable placeholder="请输入类别名称" />
        </el-form-item>
        <el-form-item label="图片地址:">
          <Upload :limit="1" :filelist="filelist" @handleSuccess="handleSuccessUpload" @handleRemove="handleRemove" />
          <div class="tip">(格式:png,jpg,jpeg,gif,大小不超过1M)</div>
        </el-form-item>
        <el-form-item label="简介:">
          <el-input v-model.trim="addObj.synopsis" type="textarea" :rows="3" placeholder="请输入简介" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" size="small" @click="handleSumbitAdd">提 交</el-button>
        <el-button size="small" @click="showCategoryDialog = false">返 回</el-button>
      </div>
    </el-dialog>
    <ImgDialog :showViewImgDialog.sync="showViewImgDialog" :imgSrc="imgSrc"></ImgDialog>
  </div>
</template>

<script>
import tlTable from '@/components/BaseTable/tlTable'
import Upload from '@/components/Upload/index'
import ImgDialog from '@/components/ImgDialog/ImgDialog'
const addObj = {
  id: '',
  name: '',
  picUrl: '',
  synopsis: ''
}
export default {
  components: {
    tlTable,
    Upload,
    ImgDialog
  },
  data() {
    return {
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
            label: '类别ID',
            prop: 'id',
            init: '-'
          },
          {
            label: '类别名称',
            prop: 'name',
            init: '—'
          },
          {
            label: '简介',
            prop: 'synopsis',
            init: '—'
          },
          {
            label: '图片',
            prop: 'picUrl',
            width: '120px',
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
        ],
        operation: {
          width: '200',
          data: [
            {
              label: '删除',
              Fun: 'handleDel'
            },
            {
              label: '置顶',
              Fun: 'handleTop'
            },
            {
              label: '修改',
              Fun: 'handleEdit'
            }
          ]
        }
      },
      addObj: {},
      showCategoryDialog: false,
      filelist: [],
      showViewImgDialog: false,
      imgSrc: ''
    }
  },
  created() {
    this.getInfor()
  },
  methods: {
    getInfor() {
      this.dataTable.loading = true
      this.$http.send(this.$api.addCate, {}, 'get').then(res => {
        if (res.data) {
          this.dataTable.data = res.data
        }
        this.dataTable.loading = false
      }).catch(res => {
        this.dataTable.loading = false
      })
    },
    handleDel(row) {
      this.$confirm('此操作将删除该类别, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var url = `${this.$api.addCate}/${row.id}`
        this.$http.send(url, {}, 'delete').then(res => {
          this.$message.success('操作成功~')
          this.getInfor()
        }).catch(res => {
          // this.$message.error(res.msg)
        })
      })
    },
    handleTop(row) {
      var url = `${this.$api.addCate}/${row.id}/top`
      this.$http.send(url, {}, 'patch').then(res => {
        this.$message.success('操作成功~')
        this.getInfor()
      }).catch(res => {
      })
    },
    handleAdd() {
      this.addObj = Object.assign({}, addObj)
      this.filelist = []
      setTimeout(() => {
        this.showCategoryDialog = true
      }, 500)
    },
    handleEdit(row) {
      this.addObj = Object.assign({}, addObj, {
        id: row.id,
        name: row.name,
        picUrl: row.picUrl,
        synopsis: row.synopsis
      })
      this.filelist = row.picUrl ? [{ name: row.picUrl, url: row.picUrl }] : []
      this.showCategoryDialog = true
    },
    handleSumbitAdd() {
      if (!this.addObj.name) {
        this.$message.error('请输入类别名称~')
        return
      }
      const methods = this.addObj.id ? 'put' : 'post'
      this.$http.send(this.$api.addCate, this.addObj, methods).then(res => {
        this.$message.success('操作成功~')
        this.showCategoryDialog = false
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
    handlePreview (row) {
      this.showViewImgDialog = true
      this.imgSrc = row.picUrl
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
