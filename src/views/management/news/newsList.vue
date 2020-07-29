<template>
  <div class="user_list">
    <el-form :inline="true" size="small" :model="formInline" label-width="100px">
      <el-form-item label="用户ID">
        <el-input v-model.trim="formInline.userId" clearable placeholder="请输入" />
      </el-form-item>
      <el-form-item label="咨询手机">
        <el-input v-model.trim="formInline.phone" clearable placeholder="请输入" />
      </el-form-item>
      <el-form-item label="咨询类型">
        <el-select v-model="formInline.type" filterable clearable placeholder="请选择">
          <el-option
            v-for="item in typeItems"
            :key="item.label"
            :label="item.label"
            :value="item.label"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="咨询内容">
        <el-input v-model.trim="formInline.content" clearable placeholder="请输入" />
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="formInline.status" filterable clearable placeholder="请选择">
          <el-option
            v-for="item in statusItems"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="small" icon="el-icon-search" @click="handleSubmit">搜索</el-button>
      </el-form-item>
    </el-form>
    <div class="table_wrapper">
      <tl-table
        :table="dataTable"
        @sizeChange="sizeChange"
        @pageChange="pageChange"
      >
        <template slot="status" slot-scope="props">
          <span v-if="props.obj.row.status === 0" class="link_btn" @click="handleStatus(props.obj.row)">未处理</span>
          <span v-else>已处理</span>
        </template>
      </tl-table>
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
      formInline: {
        userId: '',
        phone: '',
        type: '',
        content: '',
        status:  -1
      },
      statusItems: [
        {
          value: -1,
          label: '全部'
        },
        {
          value: 0,
          label: '未处理'
        },
        {
          value: 1,
          label: '已处理'
        }
      ],
      typeItems: [
        {
          label: '产品售前咨询'
        },
        {
          label: '资料审核问题'
        },
        {
          label: '其他'
        }
      ],
      dataTable: {
        hasSelect: false,
        hasExpand: false,
        loading: false,
        hasOperation: false,
        page: 1,
        size: 50,
        total: 0,
        expands: [],
        tr: [
          {
            label: '用户ID',
            prop: 'userId',
            init: '-'
          },
          // {
          //   label: '用户名称',
          //   prop: 'companyName',
          //   init: '—'
          // },
          {
            label: '咨询手机',
            prop: 'phone',
            init: '—'
          },
          {
            label: '问题类型',
            prop: 'type',
            init: '—'
          },
          {
            label: '咨询内容',
            prop: 'content',
            init: '—'
          },
          {
            label: '修改时间',
            prop: 'updateTime',
            init: '—'
          },
          {
            label: '注册时间',
            prop: 'createTime',
            init: '—'
          },
          {
            label: '状态',
            prop: 'status',
            slot: true,
            init: '—'
          }
        ],
        data: [],
        operation: {
          width: '200',
          data:[]
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
      this.$http.send(this.$api.faqPage, params, 'post').then(res => {
        if (res.data) {
          this.dataTable.data = res.data.records
          this.dataTable.total = res.data.total
        }
        this.dataTable.loading = false
      }).catch(res => {
        this.dataTable.loading = false
      })
    },
    handleStatus (row) {
      this.$confirm('此操作将确认该消息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.send(this.$api.faqConfirm, {
          id: row.id
        }, 'post').then(res => {
          this.$message.success('操作成功~')
          this.getInfor()
        }).catch(res => {
        })
      })
    },
    handleSubmit() {
      this.dataTable.page = 1
      this.getInfor()
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
