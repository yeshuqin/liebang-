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
        <el-select v-model="formInline.statusList" clearable multiple filterable placeholder="请选择">
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
        
      >
        <template slot="salePrice" slot-scope="props">
           ￥{{props.obj.row.salePrice | filterMoney}}
        </template>
        <template slot="realAmount" slot-scope="props">
           ￥{{props.obj.row.realAmount | filterMoney}}
        </template>
        <template slot="status" slot-scope="props">
           <span>{{statusListMap[props.obj.row.status]}}</span>
        </template>
        <template slot="payType" slot-scope="props">
           <span>{{payTypeMap[props.obj.row.payType]}}</span>
        </template>
        <template slot="payTime" slot-scope="props">
           <span>{{props.obj.row.payTime ? parseTime(props.obj.row.payTime) : '一'}}</span>
        </template>
        <template slot="handleStatus" slot-scope="props">
           <span class="link_btn" v-if="props.obj.row.status === 0" @click="handleCancel(props.obj.row)">取消</span>
           <span class="link_btn" v-if="props.obj.row.status === 1 && props.obj.row.payType === 1" @click="handlePay(props.obj.row)">确认收款</span>
           <span class="link_btn" v-if="props.obj.row.status === 2" @click="handleConfirmSend(props.obj.row)">确认收货</span>
           <span class="link_btn" v-if="props.obj.row.status === 12" @click="handleAudit(props.obj.row)">审核操作</span>
           <span class="link_btn" v-if="props.obj.row.status === 14" @click="handleSend(props.obj.row)">发货</span>
        </template>   
     <!-- 
UNPAID(0, "未支付"),
显示状态：待支付；显示操作按钮（取消）

PAYING(1, "支付中"),
显示状态：待支付确认；如果是对公转账，显示操作按钮（确认收款）- 点击按钮提示（请确认已收到对方转账款项，确认收款后状态不可更改）；其他支付方式不显示操作按钮

DELIVERING(2, "待收货"),
显示状态：等待用户签收；显示操作按钮（确认收货） - 点击按钮提示（请确认用户已收到材料文件，确认收货后状态不可更改。）

DELIVERED(3, "已完成"),
显示状态：交易完成；无任何操作

CANCEL(4, "已取消"),
显示状态：交易取消；无任何操作

MATERIAL_WAIT(11, "待上传资料"),
显示状态：等待用户上传资料；无任何操作

MATERIAL_APPLY(12, "待资料审核"),
显示状态：待您资料审核；显示操作按钮（取消）

MATERIAL_REJECT(13, "资料审核失败"),
显示状态：资料审核失败(鼠标移动上去显示文案：等待用户重新提交)；无任何操作

MATERIAL_SUCCESS(14, "资料审核通过");
显示状态：资料审核通过；显示操作按钮（发货-点击后弹出框【文案 - 请填写发货信息，填写后暂不可更改，输入框 - 快递公司：下拉框，快递单号：输入框）
      -->
      </tl-table>
    </div>
    <!-- 资料下载 -->
    <el-dialog title="资料下载" :visible.sync="showDownloadDialog" custom-class="download_dialog" width="900px" center>
      <div class="table_wrapper">
        <tl-table
          showPagination="false"
          :table="dataDialogTable"
        >
            <template slot="salePrice" slot-scope="props">
              <span>￥{{props.obj.row.salePrice | filterMoney}}</span>
            </template>
            <template slot="realAmount" slot-scope="props">
              <span>￥{{props.obj.row.realAmount | filterMoney}}</span>
            </template>
            <template slot="status" slot-scope="props">
              <span>{{statusListMap[props.obj.row.status]}}</span>
            </template>
        </tl-table>
      </div>
      <el-row>
        <el-col :span="12">
          <p class="title green">企业已上传资料</p>
           <!-- <el-checkbox-group v-model="downloadObj.check" class="download_checkbox">
            <el-checkbox v-for="item in fileList" :key="item.value" :label="item.value"> {{ item.label }}</el-checkbox>
          </el-checkbox-group> -->
          <div v-for="item in materialList" :key="item.id" v-if="item.status === 1" class="material_list">
            <a :href="item.fileUrl" class="link_btn">{{item.name}}</a>
          </div>
        </el-col>
        <el-col :span="12">
          <p class="title red">企业未上传资料</p>
          <!-- <el-checkbox-group v-model="downloadObj.check" class="download_checkbox">
            <el-checkbox v-for="item in materialList" :key="item.id" disabled :label="item.value">
              <a :href="item.fileUrl">{{item.name}}</a>
            </el-checkbox>
          </el-checkbox-group> -->
          <div v-for="item in materialList" :key="item.id" v-if="item.status === 0" class="material_list">
             {{item.name}}
          </div>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="showDownloadDialog = false">返 回</el-button>
      </div>
    </el-dialog>
    <!-- 审核状态修改 -->
    <el-dialog title="修改审核状态" :visible.sync="showStatusDialog" width="600px" center>
      <p>请确认订单审核状态后进行操作</p>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" size="mini" @click="handleSumbitStatus(1)">通 过</el-button>
        <el-button size="mini" @click="handleSumbitStatus(0)">拒 绝</el-button>
      </div>
    </el-dialog>
    <!-- 发货 -->
    <el-dialog title="发货信息" :visible.sync="showSendDialog" width="500px" center>
      <el-form size="small" label-width="100px">
        <el-form-item label="快递公司" required>
          <el-select v-model="deliverObj.expressName" clearable filterable placeholder="请选择" style="width:100%">
            <el-option
              v-for="item in expressNameList"
              :key="item.id"
              :label="item.name"
              :value="item.name"
            />
          </el-select> 
        </el-form-item>
        <el-form-item label="快递单号" required>
          <el-input v-model.trim="deliverObj.expressNo" clearable placeholder="请输入快递单号" style="width:100%" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" size="mini" @click="handleSumbitSend">提 交</el-button>
        <el-button size="mini" @click="showSendDialog = false">返 回</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import tlTable from '@/components/BaseTable/tlTable'
import {parseTime} from '@/utils/index'
export default {
  components: {
    tlTable
  },
  data() {
    return {
      parseTime: parseTime,
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
        1: '待支付确认',
        2: '等待用户签收',
        3: '交易完成',
        4: '交易取消',
        11: '等待用户上传资料',
        12: '待您资料审核',
        13: '资料审核失败',
        14: '资料审核通过'
      },
      payTypeMap: {
        1: '对公转账',
        2: '支付宝',
        3: '微信支付'
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
            prop: 'companyName',
            init: '—'
          },
          {
            label: '销售价',
            prop: 'salePrice',
            slot: true,
            init: '—'
          },
          {
            label: '实付价',
            prop: 'realAmount',
            slot: true,
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
            width: '100px',
            init: '—'
          },
          {
            label: '手机号',
            prop: 'phone',
            init: '—'
          },
          {
            label: '支付时间',
            prop: 'payTime',
            slot: true,
            width: '100px',
            init: '—'
          },
          {
            label: '支付方式',
            prop: 'payType',
            slot: true,
            init: '—'
          },
          {
            label: '快递单号',
            prop: 'expressNo',
            init: '未上传'
          }
          
        ],
        data: [],
        operation: {
          width: '200',
          data: [
            {
              label: '状态扭转',
              slot: true,
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
            prop: 'companyName',
            init: '—'
          },
          {
            label: '销售价',
            prop: 'salePrice',
            slot: true,
            init: '—'
          },
          {
            label: '实付价',
            prop: 'realAmount',
            slot: true,
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
            init: '未上传'
          }
        ],
        data: [],
        operation: {
          width: '200',
          data: [
          ]
        }
      },
      materialList: [],
      showDownloadDialog: false,
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
      statusId: '',
      showStatusDialog: false,
      showSendDialog:  false,
      expressNameList: [],
      deliverObj: {
        expressName: '',
        expressNo: '',
        id: ''
      }
    }
  },
  created () {
    this.getDeliverList()
    this.getInfor()
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
    getDeliverList() {
      this.$http.send(this.$api.systemExpressList, {}, 'post').then(res => {
        this.expressNameList = res.data
      }).catch(res => {
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
    handleDownload(row) {
      this.showDownloadDialog = true
      this.dataDialogTable.loading = true
      this.$http.send(this.$api.orderDetail, {
        id: row.id
      }, 'post').then(res => {
        if (res.data) {
          this.dataDialogTable.data = [res.data]
          this.materialList = res.data.materialList
        }
        this.dataDialogTable.loading = false
      }).catch(res => {
        this.dataDialogTable.loading = false
      })
      
    },
    handleCancel(row) { // 取消操作
      this.$confirm(`此操作将取消该订单, 是否继续?`, '取消订单', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        this.$http.send(this.$api.orderCancel, {
          id: row.id
        }, 'post').then(res => {
          this.$message.success('操作成功~')
          this.getInfor()
        }).catch(res => {
        })
      })
    },
    handlePay(row) {
      this.$confirm(`请确认已收到对方转账款项，确认收款后状态不可更改?`, '确认收款', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        this.$http.send(this.$api.orderConfirm, {
          id: row.id
        }, 'post').then(res => {
          this.$message.success('操作成功~')
          this.getInfor()
        }).catch(res => {
        })
      })
    },
    handleAudit(row) {
      this.showStatusDialog = true
      this.statusId = row.id
    },
    handleSend(row) {
      this.deliverObj.id = row.id
      this.deliverObj.expressName = ''
      this.deliverObj.expressNo = ''
      this.showSendDialog = true
    },
    handleConfirmSend(row) {
      this.$confirm(`请确认用户已收到材料文件，确认收货后状态不可更改~`, '确认收货', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        this.$http.send(this.$api.orderDelivered, {
          id: row.id
        }, 'post').then(res => {
          this.$message.success('操作成功~')
          this.getInfor()
        }).catch(res => {
        })
      })
    },
    handleSumbitSend() {
      if(!this.deliverObj.expressName) {
        this.$message.error('请选择快递公司~')
        return
      }
      if(!this.deliverObj.expressNo) {
        this.$message.error('请输入快递单号~')
        return
      }
      this.$http.send(this.$api.orderDeliver, this.deliverObj, 'post').then(res => {
        this.$message.success('操作成功~')
        this.showSendDialog = false
        this.getInfor()
      }).catch(res => {
      })
    },
    handleSumbitStatus (operation) {
      this.$http.send(this.$api.orderAudit, {
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
.material_list {
  margin-bottom: 10px;
  text-align: center;
  .link_btn {
    color: #1e71f9;
  }
}
</style>
