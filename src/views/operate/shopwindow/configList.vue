<template>
  <div class="config_list">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="已添加" name="first" />
      <el-tab-pane label="未添加" name="second" />
    </el-tabs>
    <div class="ad_list">
      <div class="search_wrapper">
        <el-form :inline="true" :model="formInline" label-width="100px">
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
            <el-button type="success" @click="handleSubmit">搜索</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="danger">批量添加</el-button>
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
            prop: '',
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
  methods: {
    handleClick() {
      console.log(1)
    },
    handleSubmit() {},
    handleSumbitAdd() {},
    pageChange(page) {
      this.dataTable.page = page
    },
    sizeChange(size) {
      this.dataTable.size = size
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
