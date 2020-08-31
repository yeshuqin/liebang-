<template>
  <div class="user_list">
    <el-form :inline="true" size="small" :model="formInline" label-width="100px">
      <el-form-item label="公司名称">
        <el-input v-model.trim="formInline.companyName" clearable placeholder="请输入公司名称" />
      </el-form-item>
      <el-form-item label="注册手机号">
        <el-input v-model.trim="formInline.phone" clearable placeholder="请输入注册手机号" />
      </el-form-item>
      <el-form-item label="认证状态">
        <el-select v-model="formInline.status" filterable placeholder="请选择">
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
        @handleEdit="handleEdit"
      >
        <template slot="status" slot-scope="props">
          <span v-if="props.obj.row.status === 0" class="link_btn" @click="handleStatus(props.obj.row)">认证中</span>
          <span v-else-if="props.obj.row.status === 2">认证通过</span>
          <span v-else-if="props.obj.row.status === 3">认证失败</span>
          <span v-else>未认证</span>
        </template>
      </tl-table>
    </div>
    <!-- 编辑用户 -->
    <el-dialog title="编辑用户" :visible.sync="showEditDialog" custom-class="add_dialog" width="800px" center>
      <el-form :model="editObj" size="small" label-width="120px">
        <el-form-item label="企业名称:">
          <el-input v-model.trim="editObj.companyName" clearable placeholder="请输入企业名称" />
        </el-form-item>
        <el-form-item label="企业类型:">
          <el-input v-model.trim="editObj.companyCate" clearable placeholder="请输入企业类型" />
        </el-form-item>
        <el-form-item label="企业规模:">
          <el-select v-model="editObj.companyScale" filterable clearable placeholder="请选择">
            <el-option
              v-for="item in companyScaleItems"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select> 
        </el-form-item>
        <el-form-item label="信用机构代码:">
          <el-input v-model.trim="editObj.companyCode" clearable placeholder="请输入信用机构代码" />
        </el-form-item>
        <el-form-item label="联系方式:">
          {{editObj.phone}}
        </el-form-item>
        <el-form-item label="企业法人:">
          <el-input v-model.trim="editObj.name" clearable placeholder="请输入企业法人" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" size="small" @click="handleSumbitEdit">提 交</el-button>
        <el-button size="small" @click="showEditDialog = false">返 回</el-button>
      </div>
    </el-dialog>
     <!-- 认证弹框 -->
    <el-dialog title="认证操作" :visible.sync="showStatusDialog" width="600px" center>
      <p>请确认企业提交的资料后进行操作</p>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" size="small" @click="handleSumbitStatus(1)">通 过</el-button>
        <el-button size="small" @click="handleSumbitStatus(0)">拒 绝</el-button>
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
        companyName: '',
        phone: '',
        status: -1
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
            prop: 'companyName',
            init: '—'
          },
          {
            label: '企业类型',
            prop: 'companyCate',
            init: '—'
          },
          {
            label: '企业规模',
            prop: 'companyScale',
            init: '—'
          },
          {
            label: '信用机构代码证',
            prop: 'companyCode',
            init: '—'
          },
          {
            label: '联系方式',
            prop: 'phone',
            init: '—'
          },
          {
            label: '企业法人',
            prop: 'name',
            init: '—'
          },
          {
            label: '创建时间',
            prop: 'createTime',
            width: '100px',
            init: '—'
          },
          {
            label: '是否企业认证',
            prop: 'status',
            slot: true,
            init: '—'
          }
        ],
        data: [],
        operation: {
          width: '200',
          data: [
            {
              label: '修改',
              Fun: 'handleEdit'
            }
          ]
        }
      },
      statusItems: [
        {
          value: -1,
          label: '全部'
        },
        {
          value: 0,
          label: '未认证'
        },
        {
          value: 1,
          label: '认证中'
        },
        {
          value: 2,
          label: '认证通过'
        },
        {
          value: 3,
          label: '认证失败'
        }
      ],
      companyScaleItems: ['0-20人', '20-99人', '100-499人', '500-999人', '1000-9999人', '10000人'],
      editObj: {
        name: ''
      },
      showEditDialog: false,
      fileList: [],
      showStatusDialog: false,
      statusId: ''
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
      this.$http.send(this.$api.userPage, params, 'post').then(res => {
        if (res.data) {
          this.dataTable.data = res.data.records
          this.dataTable.total = res.data.total
        }
        this.dataTable.loading = false
      }).catch(res => {
        this.dataTable.loading = false
      })
    },
    handleSubmit() {
      this.dataTable.page = 1
      this.getInfor()
    },
    handleEdit(row) {
      this.$http.send(this.$api.userInfo, {
        id: row.id
      }, 'post').then(res => {
        if (res.data) {
          this.editObj = Object.assign({}, this.editObj, res.data)
          this.showEditDialog = true
        }
      })
    },
    handleSumbitEdit() {
      this.$http.send(this.$api.userUpdate, this.editObj, 'post').then(res => {
        this.showEditDialog = false
        this.$message.success('操作成功~')
        this.getInfor()
      })
    },
    handleStatus(row) {
         this.showStatusDialog = true
         this.statusId = row.id
    },
    handleSumbitStatus (operation) {
        this.$http.send(this.$api.userAuth, {
          id: this.statusId,
          operation: operation
        }, 'post').then(res => {
          this.$message.success('操作成功~')
          this.showStatusDialog = false
          this.getInfor()
        }).catch(res => {
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
