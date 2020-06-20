<template>
  <div class="config_list">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="已添加" name="first" />
      <el-tab-pane label="未添加" name="second" />
    </el-tabs>
    <div class="ad_list">
      <div class="search_wrapper">
        <el-form :inline="true" size="small" :model="formInline" label-width="100px">
          <el-form-item label="商品ID">
            <el-input v-model.trim="formInline.id" clearable placeholder="请输入商品ID" />
          </el-form-item>
          <el-form-item label="服务类型">
            <el-input v-model.trim="formInline.name" clearable placeholder="请输入服务类型" />
          </el-form-item>
          <el-form-item label="商品状态">
            <el-input v-model.trim="formInline.name" clearable placeholder="请输入商品状态" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="small" icon="el-icon-search" @click="handleSearch">搜索</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="small" icon="el-icon-plus">批量添加</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="table_wrapper">
        <tl-table
          :table="dataTable"
          @sizeChange="sizeChange"
          @pageChange="pageChange"
        >
          <template slot="handleStatus" slot-scope="props">
            <span v-if="props.obj.row.status === 1" class="link_btn green" @click="handleStatus(props.obj.row)">生效</span>
            <span v-else class="link_btn red" @click="handleStatus(props.obj.row)">停用</span>
          </template>
        </tl-table>
      </div>
    </div>
  </div>
</template>

<script>
import tlTable from '@/components/BaseTable/tlTable'
var addObj = {
  id: '',
  code: '',
  linkUrl: '',
  name: '',
  picUrl: ''
}
export default {
  components: {
    tlTable
  },
  data() {
    return {
      activeName: 'first',
      formInline: {
        name: '',
        id: ''
      },
      dataTable: {
        hasSelect: true,
        hasExpand: false,
        loading: false,
        page: 1,
        size: 50,
        total: 0,
        expands: [],
        tr: [
          {
            label: '商品ID',
            prop: 'id',
            init: '-'
          },
          {
            label: '一级类别',
            prop: '',
            init: '—'
          },
          {
            label: '服务类型',
            prop: '',
            init: '—'
          },
          {
            label: '主图',
            prop: '',
            init: '—'
          },
          {
            label: '销售价',
            prop: '',
            init: '—'
          },
          {
            label: '上架时间',
            prop: '',
            init: '—'
          },
          {
            label: '创建时间',
            prop: 'createTime',
            init: '—'
          },
          {
            label: '销售量',
            prop: '',
            init: '—'
          },
          {
            label: '商品状态',
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
          width: '200',
          data: [
            {
              label: '置顶',
              Fun: 'handleSet'
            },
            {
              label: '移除',
              Fun: 'handleSet'
            }
          ]
        }
      }
    }
  },
  created() {
    this.getInfor()
  },
  methods: {
    getInfor() {
      var params = Object.assign({}, {
        current: this.dataTable.page,
        size: this.dataTable.size
      }, this.formInline)
      this.dataTable.loading = true
      this.$http.send(this.$api.showcaseSpu, params, 'get').then(res => {
        if (res.data) {
          this.dataTable.data = res.data.records
          this.dataTable.total = res.data.total
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
          this.$message.error(res.msg)
        })
      })
    },
    handleSumbitSave() {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          this.$http.send(this.$api.showcase, this.addObj, 'post').then(res => {
            this.$message.success('操作成功')
            this.showAddDialog = false
          }).catch(res => {
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
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

</style>
