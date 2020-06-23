<template>
  <div class="config_list">
    <el-tabs v-model="activeName" @tab-click="handleTab">
      <el-tab-pane label="已添加" name="first" />
      <el-tab-pane label="未添加" name="second" />
    </el-tabs>
    <div class="ad_list">
      <div class="search_wrapper">
        <el-form :inline="true" size="small" :model="formInline" label-width="100px">
          <el-form-item label="商品ID">
            <el-input v-model.trim="formInline.id" clearable placeholder="请输入商品ID" />
          </el-form-item>
          <el-form-item label="一级类别">
            <el-select v-model="formInline.cateId" filterable clearable placeholder="请选择">
              <el-option
                v-for="item in cateList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="商品状态">
            <el-select v-model="formInline.saleStatus" filterable clearable placeholder="请选择">
              <el-option
                v-for="item in statusItems"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="small" icon="el-icon-search" @click="handleSearch">搜索</el-button>
          </el-form-item>
          <el-form-item>
            <el-button v-if="activeName !== 'first'" type="primary" size="small" @click="handleBatchStatus(0)">批量添加</el-button>
            <el-button v-else type="danger" size="small" @click="handleBatchStatus(1)">批量移除</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="table_wrapper">
        <tl-table
          :table="dataTable"
          @sizeChange="sizeChange"
          @pageChange="pageChange"
          @onHandleSelectionChange="onHandleSelectionChange"
        >
          <template slot="primaryPic" slot-scope="props">
            <span v-if="!props.obj.row.primaryPic">暂无图片</span>
            <img v-else :src="props.obj.row.primaryPic" class="picUrl" alt="">
          </template>
          <template slot="saleStatus" slot-scope="props">
            <span>{{ props.obj.row.saleStatus === 0 ? '未上架' : '已上架' }}</span>
          </template>
          <template slot="saleTime" slot-scope="props">
            <span>{{ props.obj.row.saleTime | timestampToTime }}</span>
          </template>
          <template slot="minPrice" slot-scope="props">
            <span>{{ props.obj.row.minPrice }} - {{ props.obj.row.maxPrice }}</span>
          </template>
          <template slot="handleStatus" slot-scope="props">
            <span v-if="activeName === 'second'" class="link_btn" @click="handleStatus(props.obj.row)">添加</span>
            <span v-else class="link_btn red" @click="handleStatus(props.obj.row)">移除</span>
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
      id: this.$route.query.id,
      activeName: 'first',
      showcaseStatus: 1,
      formInline: {
        name: '',
        id: '',
        cateId: '',
        saleStatus: ''
      },
      cateList: [],
      statusItems: [
        {
          value: 0,
          label: '未上架'
        },

        {
          value: 1,
          label: '已上架'
        }
      ],
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
            prop: 'cateName',
            init: '—'
          },
          {
            label: '主图',
            prop: 'primaryPic',
            slot: true,
            init: '—'
          },
          {
            label: '销售价',
            prop: 'minPrice',
            slot: true,
            init: '—'
          },
          {
            label: '上架时间',
            prop: 'saleTime',
            slot: true,
            init: '—'
          },
          {
            label: '创建时间',
            prop: 'createTime',
            init: '—'
          },
          {
            label: '销售量',
            prop: 'soldNum',
            init: '—'
          },
          {
            label: '商品状态',
            prop: 'saleStatus',
            slot: true,
            init: '—'
          }
        ],
        data: [],
        operation: {
          width: '200',
          data: [
            {
              label: '置顶',
              Fun: 'handleSet'
            },
            {
              slot: true,
              Fun: 'handleStatus'
            }
          ]
        }
      },
      checkBox: []
    }
  },
  created() {
    this.getInfor()
    this.getCate()
  },
  methods: {
    getInfor() {
      this.showcaseStatus = this.activeName === 'first' ? 1 : 0
      var url = `${this.$api.spu}/page`
      var params = Object.assign({}, {
        current: this.dataTable.page,
        size: this.dataTable.size,
        showcaseId: this.id,
        showcaseStatus: this.showcaseStatus
      }, this.formInline)
      this.dataTable.loading = true
      this.$http.send(url, params, 'post').then(res => {
        if (res.data) {
          this.dataTable.data = res.data.records
          this.dataTable.total = res.data.total
        }
        this.dataTable.loading = false
      }).catch(res => {
        this.dataTable.loading = false
      })
    },
    handleTab(tab) {
      // this.activeName = tab
      console.log(this.activeName)
      this.getInfor()
    },
    getCate() {
      this.$http.send(this.$api.addCate, {}, 'get').then(res => {
        if (res.data) {
          this.cateList = res.data
        }
      }).catch(res => {
      })
    },
    handleStatus(row) {
      this.$confirm(`此操作将${this.activeName === 'first' ? '移除' : '添加'}[${row.name}]商品, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var status = this.activeName === 'first' ? 1 : 0
        var url = `${this.$api.showcaseSpu}/operation`
        this.$http.send(url, {
          spuList: [row.id],
          operation: status,
          showcaseId: this.id
        }, 'post').then(res => {
          this.$message.success('操作成功~')
          this.getInfor()
        }).catch(res => {
          this.$message.error(res.msg)
        })
      })
    },
    handleBatchStatus(type) {
      if (this.checkBox.length === 0) {
        this.$message.error('请至少选择一项~')
        return
      }
      this.$confirm(`此操作将批量${type === 1 ? '删除' : '添加'}商品, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var url = `${this.$api.showcaseSpu}/operation`
        this.$http.send(url, {
          spuList: this.checkBox,
          operation: type,
          showcaseId: this.id
        }, 'post').then(res => {
          this.$message.success('操作成功~')
          this.getInfor()
        }).catch(res => {
          this.$message.error(res.msg)
        })
      })
    },
    onHandleSelectionChange(val) {
      this.checkBox = val.map(item => {
        return item.id
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
