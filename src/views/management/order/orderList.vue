<template>
  <div class="order_list">
    <el-form :inline="true" size="small" :model="formInline" label-width="100px">
      <el-form-item label="订单ID">
        <el-input v-model.trim="formInline.id" clearable placeholder="请输入订单ID" />
      </el-form-item>
      <el-form-item label="服务类型">
        <el-input v-model.trim="formInline.name" clearable placeholder="请输入服务类型" />
      </el-form-item>
      <el-form-item label="配置详情">
        <el-input v-model.trim="formInline.name" clearable placeholder="请输入配置详情" />
      </el-form-item>
      <el-form-item label="用户名称">
        <el-input v-model.trim="formInline.name" clearable placeholder="请输入用户名称" />
      </el-form-item>
      <el-form-item label="订单状态">
        <el-input v-model.trim="formInline.name" clearable placeholder="请输入订单状态" />
      </el-form-item>
      <el-form-item label="快递单号">
        <el-input v-model.trim="formInline.name" clearable placeholder="请输入快递单号" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="small" icon="el-icon-search" @click="handleSubmit">搜索</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="default" @click="handleSubmit">重置</el-button>
      </el-form-item>
    </el-form>
    <div class="table_wrapper">
      <tl-table
        :table="dataTable"
        @sizeChange="sizeChange"
        @pageChange="pageChange"
        @handleDownload="handleDownload"
        @handleStatus="handleStatus"
      />
    </div>
    <!-- 资料下载 -->
    <el-dialog title="资料下载" :visible.sync="showDownloadDialog" custom-class="download_dialog" width="800px" center>
      <div class="table_wrapper">
        <tl-table
          :showPagination="showPagination"
          :table="dataDialogTable"
        />
      </div>
      <div>
        <p class="title green">企业已上传资料</p>
        <!-- <p v-if="false" class="title red">企业未上传资料</p> -->
        <el-checkbox-group v-model="downloadObj.check" class="download_checkbox">
          <el-checkbox v-for="item in fileList" :key="item.value" :label="item.value"> {{ item.label }}</el-checkbox>
        </el-checkbox-group>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleSumbitAdd">提 交</el-button>
        <el-button @click="showDownloadDialog = false">返 回</el-button>
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
            label: '订单ID',
            prop: 'id',
            init: '-'
          },
          {
            label: '服务类型',
            prop: '',
            init: '—'
          },
          {
            label: '配置详情',
            prop: '',
            init: '—'
          },
          {
            label: '销售价',
            prop: '',
            init: '—'
          },
          {
            label: '实付价',
            prop: '',
            init: '—'
          },
          {
            label: '下单时间',
            prop: '',
            init: '—'
          },
          {
            label: '支付时间',
            prop: '',
            init: '—'
          },
          {
            label: '快递单号',
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
            prop: '',
            init: '—'
          },
          {
            label: '配置详情',
            prop: '',
            init: '—'
          },
          {
            label: '销售价',
            prop: '',
            init: '—'
          },
          {
            label: '实付价',
            prop: '',
            init: '—'
          },
          {
            label: '下单时间',
            prop: '',
            init: '—'
          },
          {
            label: '支付时间',
            prop: '',
            init: '—'
          },
          {
            label: '快递单号',
            prop: '',
            init: '—'
          }
        ],
        data: [
        ],
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
      showPagination: false
    }
  },
  methods: {
    getInfor() {

    },
    handleSubmit() {
    },
    handleStatus() {
      this.showEditDialog = true
    },
    handleDownload(row) {
      this.showDownloadDialog = true
      this.dataDialogTable.data = [row]
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
