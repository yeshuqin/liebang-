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
          <img v-else :src="props.obj.row.picUrl" alt="" style="width:100px;">
        </template>
      </tl-table>
    </div>
    <!-- 类目 -->
    <el-dialog title="新增类目" :visible.sync="showCategoryDialog" custom-class="add_dialog" width="800px" center>
      <el-form :model="addObj" label-width="120px" size="small">
        <el-form-item label="类别名称:" required>
          <el-input v-model.trim="addObj.name" clearable placeholder="请输入类别名称" />
        </el-form-item>
        <el-form-item label="图片地址:" required>
          <!-- <el-input v-model.trim="addObj.picUrl" clearable placeholder="请输入企业类型" /> -->
        </el-form-item>
        <el-form-item label="简介:" required>
          <el-input v-model.trim="addObj.synopsis" type="textarea" :rows="4" clearable placeholder="请输入简介" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" size="small" @click="handleSumbitAdd">提 交</el-button>
        <el-button size="small" @click="showCategoryDialog = false">返 回</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import tlTable from '@/components/BaseTable/tlTable'
const addObj = {
  id: '',
  name: '',
  picUrl: 'https://file2.pingxiaobao.com/dev/2006/12/51de2b8a1b6e5f52e45cbb9fe319b6ac.png',
  synopsis: ''
}
export default {
  components: {
    tlTable
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
            label: '类目ID',
            prop: 'id',
            init: '-'
          },
          {
            label: '类目名称',
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
      fileList: []
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
      this.$confirm('此操作将删除该类目, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var url = `${this.$api.addCate}/${row.id}`
        this.$http.send(url, {}, 'delete').then(res => {
          this.$message.success('操作成功~')
          this.getInfor()
        }).catch(res => {
          this.$message.error(res.msg)
        })
      })
    },
    handleTop(row) {
      var url = `${this.$api.addCate}/${row.id}/top`
      this.$http.send(url, {}, 'patch').then(res => {
        this.$message.success('操作成功~')
        this.getInfor()
      }).catch(res => {
        this.$message.error(res.msg)
      })
    },
    handleAdd() {
      this.addObj = Object.assign({}, addObj)
      this.showCategoryDialog = true
    },
    handleEdit(row) {
      this.addObj = Object.assign({}, addObj, {
        id: row.id,
        name: row.name,
        picUrl: row.picUrl,
        synopsis: row.synopsis
      })
      this.showCategoryDialog = true
    },
    handleSumbitAdd() {
      const methods = this.addObj.id ? 'put' : 'post'
      this.$http.send(this.$api.addCate, this.addObj, methods).then(res => {
        this.$message.success('操作成功~')
        this.showCategoryDialog = false
        this.getInfor()
      }).catch(res => {
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
