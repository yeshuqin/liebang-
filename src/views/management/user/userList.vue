<template>
  <div class="user_list">
    <el-form :inline="true" size="small" :model="formInline" label-width="100px">
      <el-form-item label="用户ID">
        <el-input v-model.trim="formInline.id" clearable placeholder="请输入用户ID" />
      </el-form-item>
      <el-form-item label="用户名称">
        <el-input v-model.trim="formInline.name" clearable placeholder="请输入用户名称" />
      </el-form-item>
      <el-form-item label="企业规模">
        <el-input v-model.trim="formInline.name" clearable placeholder="请输入企业规模" />
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
        @handleEdit="handleEdit"
      >
        <template slot="handleStatus" slot-scope="props">
          <span v-if="props.obj.row.status === 1" class="link_btn" @click="handleStatus(props.obj.row)">回复</span>
          <span v-else class="link_btn red" @click="handleStatus(props.obj.row)">生效</span>
        </template>
      </tl-table>
    </div>
    <!-- 编辑用户 -->
    <el-dialog title="编辑用户" :visible.sync="showEditDialog" custom-class="add_dialog" width="800px" center>
      <el-form :model="addObj" size="small" label-width="120px">
        <el-form-item label="企业名称:" required>
          <el-input v-model.trim="addObj.name" clearable placeholder="请输入企业名称" />
        </el-form-item>
        <el-form-item label="企业类型:" required>
          <el-input v-model.trim="addObj.name" clearable placeholder="请输入企业类型" />
        </el-form-item>
        <el-form-item label="企业规模:" required>
          <el-input v-model.trim="addObj.name" clearable placeholder="请输入企业规模" />
        </el-form-item>
        <el-form-item label="信用机构代码:" required>
          <el-input v-model.trim="addObj.name" clearable placeholder="请输入信用机构代码" />
        </el-form-item>
        <el-form-item label="联系方式:" required>
          <el-input v-model.trim="addObj.name" clearable placeholder="请输入联系方式" />
        </el-form-item>
        <el-form-item label="企业法人:" required>
          <el-input v-model.trim="addObj.name" clearable placeholder="请输入企业法人" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" size="small" @click="handleSumbitAdd">提 交</el-button>
        <el-button size="small" @click="showEditDialog = false">返 回</el-button>
      </div>
    </el-dialog>
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
        name: '',
        id: ''
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
            label: '用户ID',
            prop: 'id',
            init: '-'
          },
          {
            label: '用户名称',
            prop: '',
            init: '—'
          },
          {
            label: '企业类型',
            prop: '',
            init: '—'
          },
          {
            label: '企业规模',
            prop: '',
            init: '—'
          },
          {
            label: '信用机构代码证',
            prop: '',
            init: '—'
          },
          {
            label: '联系方式',
            prop: '',
            init: '—'
          },
          {
            label: '企业法人',
            prop: '',
            init: '—'
          },
          {
            label: '是否企业认证',
            prop: '',
            init: '—'
          }
        ],
        data: [
          // {
          //   id: '001',
          //   status: 1
          // },
          // {
          //   id: '002',
          //   status: 2
          // }
        ],
        operation: {
          width: '200',
          data: [
            {
              Fun: 'handleStatus',
              slot: true
            },
            {
              label: '修改',
              Fun: 'handleEdit'
            }
          ]
        }
      },
      addObj: {
        name: ''
      },
      showEditDialog: false,
      fileList: []
    }
  },
  methods: {
    getInfor() {

    },
    handleSubmit() {
    },
    handleEdit() {
      this.showEditDialog = true
    },
    handleSumbitAdd() {

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
