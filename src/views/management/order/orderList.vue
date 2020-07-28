<template>
  <div class="order_list">
    <el-form :inline="true" size="small" :model="formInline" label-width="100px">
      <el-form-item label="订单ID">
        <el-input v-model.trim="formInline.id" clearable placeholder="请输入订单ID" />
      </el-form-item>
      <el-form-item label="服务类型">
        <el-input v-model.trim="formInline.skuName" clearable placeholder="请输入服务类型" />
      </el-form-item>
      <el-form-item label="配置详情">
        <el-input v-model.trim="formInline.attribute" clearable placeholder="请输入配置详情" />
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model.trim="formInline.phone" clearable placeholder="请输入手机号" />
      </el-form-item>
      <el-form-item label="订单状态">
        <el-select v-model="formInline.statusList" multiple filterable placeholder="请选择">
          <el-option
            v-for="(value, key) in statusListMap"
            :key="key"
            :label="value"
            :value="key"
          />
        </el-select> 
      </el-form-item>
      <el-form-item label="快递单号">
        <el-input v-model.trim="formInline.expressNo" clearable placeholder="请输入快递单号" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="small" icon="el-icon-search" @click="handleSubmit">搜索</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="default" @click="handleRest">重置</el-button>
      </el-form-item>
    </el-form>
    <div class="table_wrapper">
      <tl-table
        :table="dataTable"
        @sizeChange="sizeChange"
        @pageChange="pageChange"
        @handleDownload="handleDownload"
        @handleStatus="handleStatus"
        
      >
        <template slot="expressNo" slot-scope="props">
           <span v-if="props.obj.row.expressNo">{{props.obj.row.expressNo}}</span>
           <span v-else>未上传</span>
        </template>
        <template slot="status" slot-scope="props">
           <span>{{statusListMap[props.obj.row.status]}}</span>
        </template>
      </tl-table>
    
    </div>
    <!-- 资料下载 -->
    <el-dialog title="资料下载" :visible.sync="showDownloadDialog" custom-class="download_dialog" width="800px" center>
      <div class="table_wrapper">
        <tl-table
          :showPagination="showPagination"
          :table="dataDialogTable"
        >
            <template slot="expressNo" slot-scope="props">
              <span v-if="props.obj.row.expressNo">{{props.obj.row.expressNo}}</span>
              <span v-else>未上传</span>
            </template>
            <template slot="status" slot-scope="props">
              <span>{{statusListMap[props.obj.row.status]}}</span>
            </template>
        </tl-table>
      </div>
      <el-row>
        <el-col :span="12">
          <p class="title green">企业已上传资料</p>
           <el-checkbox-group v-model="downloadObj.check" class="download_checkbox">
            <el-checkbox v-for="item in fileList" :key="item.value" :label="item.value"> {{ item.label }}</el-checkbox>
          </el-checkbox-group>
        </el-col>
        <el-col :span="12">
          <p class="title red">企业未上传资料</p>
          <el-checkbox-group v-model="downloadObj.check" class="download_checkbox">
            <el-checkbox v-for="item in fileList" :key="item.value" :label="item.value"> {{ item.label }}</el-checkbox>
          </el-checkbox-group>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" size="mini" @click="showDownloadDialog = false">提 交</el-button>
        <el-button size="mini" @click="showDownloadDialog = false">返 回</el-button>
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
        id: '',
        attribute: '',
        expressNo: '',
        phone: '',
        skuName: '',
        statusList: []
      },
      statusListMap: {
        0: '待支付',
        11: '待上传资料',
        12: '待资料审核',
        13: '资料审核失败',
        1: '待发货',
        2: '待收货',
        3: '已完成',
        4: '已取消'
      },
      // 待支付-支付方式对公转账 =》确认收款按钮   审核通过 =》 发货按钮 待上传资料 =》为空  待资料审核、资料审核失败 =》资料审核按钮  待发货=》发货  待收货 =》为空
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
            label: '订单ID',
            prop: 'id',
            init: '-'
          },
          {
            label: '服务类型',
            prop: 'skuName',
            init: '—'
          },
          {
            label: '配置详情',
            prop: 'attribute',
            init: '—'
          },
          {
            label: '用户名称',
            prop: '',
            init: '—'
          },
          {
            label: '销售价',
            prop: 'salePrice',
            init: '—'
          },
          {
            label: '实付价',
            prop: 'realAmount',
            init: '—'
          },
          {
            label: '订单状态',
            prop: 'status',
            slot: true,
            init: '—'
          },
          {
            label: '下单时间',
            prop: 'createTime',
            init: '—'
          },
          {
            label: '支付时间',
            prop: 'payTime',
            init: '—'
          },
          {
            label: '快递单号',
            prop: 'expressNo',
            slot: true,
            init: '—'
          }
          
        ],
        data: [
          {
            id: 1,
            status: 11
          }
        ],
        operation: {
          width: '200',
          data: [
            {
              label: '状态扭转',
              Fun: 'handleStatus'
            },
            {
              label: '资料下载',
              Fun: 'handleDownload'
            }
          ]
        }
      },
      dataDialogTable: {
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
            label: '订单ID',
            prop: 'id',
            init: '-'
          },
          {
            label: '服务类型',
            prop: 'skuName',
            init: '—'
          },
          {
            label: '配置详情',
            prop: 'attribute',
            init: '—'
          },
          {
            label: '用户名称',
            prop: '',
            init: '—'
          },
          {
            label: '销售价',
            prop: 'salePrice',
            init: '—'
          },
          {
            label: '实付价',
            prop: 'realAmount',
            init: '—'
          },
          {
            label: '订单状态',
            prop: 'status',
            init: '—'
          },
          {
            label: '下单时间',
            prop: 'createTime',
            init: '—'
          },
          {
            label: '支付时间',
            prop: 'payTime',
            init: '—'
          },
          {
            label: '快递单号',
            prop: 'expressNo',
            slot: true,
            init: '—'
          }
        ],
        data: [],
        operation: {
          width: '200',
          data: [
          ]
        }
      },
      addObj: {
        name: ''
      },
      showEditDialog: false,
      showDownloadDialog: true,
      fileList: [
        {
          label: '资料1：《xxx申请书》',
          value: 1
        },
        {
          label: '资料1：《xxx申请书》',
          value: 2
        },
        {
          label: '资料1：《xxx申请书》',
          value: 3
        },
        {
          label: '资料1：《xxx申请书》',
          value: 4
        },
        {
          label: '资料1：《xxx申请书》',
          value: 5
        },
        {
          label: '资料1：《xxx申请书》',
          value: 6
        },
        {
          label: '资料1：《xxx申请书》',
          value: 7
        },
        {
          label: '资料1：《xxx申请书》',
          value: 8
        }
      ],
      downloadObj: {
        check: [],
        id: ''
      },
      showPagination: false
    }
  },
  created () {
    // this.getInfor()
  },
  methods: {
    getInfor() {
      var params = Object.assign({}, {
        current: this.dataTable.page,
        size: this.dataTable.size
      }, this.formInline)
      this.dataTable.loading = true
      this.$http.send(this.$api.orderPage, params, 'post').then(res => {
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
    handleRest () {
      this.formInline = {
        id: '',
        attribute: '',
        expressNo: '',
        phone: '',
        skuName: '',
        statusList: []
      }
    },
    handleStatus() {
      this.showEditDialog = true
    },
    handleDownload(row) {
      this.showDownloadDialog = true
      this.dataDialogTable.loading = true
      this.$http.send(this.$api.orderDetail, {
        id: row.id
      }, 'post').then(res => {
        if (res.data) {
          this.dataDialogTable.data = [row]
        }
        this.dataDialogTable.loading = false
      }).catch(res => {
        this.dataDialogTable.loading = false
      })
      
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
.download_checkbox {
  .el-checkbox {
    width: 50%;
    font-size: 16px !important;
    margin-right: 0;
    margin-bottom: 10px;
    text-align: center;
  }
}
.title {
  font-size: 18px;
  text-align: center;
}
</style>
