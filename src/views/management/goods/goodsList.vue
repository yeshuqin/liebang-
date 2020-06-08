<template>
  <div class="_list">
    <el-form :inline="true" size="small" :model="formInline" label-width="100px">
      <el-row style="width:1300px">
        <el-col :span="18">
          <el-form-item label="商品ID">
            <el-input v-model.trim="formInline.id" clearable placeholder="请输入商品ID" />
          </el-form-item>
          <el-form-item label="一级类别">
            <el-input v-model.trim="formInline.name" clearable placeholder="请输入一级类别" />
          </el-form-item>
          <el-form-item label="服务类型">
            <el-input v-model.trim="formInline.name" clearable placeholder="请输入服务类型" />
          </el-form-item>
          <el-form-item label="配置详情">
            <el-input v-model.trim="formInline.name" clearable placeholder="请输入配置详情" />
          </el-form-item>
          <el-form-item label="商品状态">
            <el-input v-model.trim="formInline.name" clearable placeholder="请输入商品状态" />
          </el-form-item>
          <el-form-item label="上架时间">
            <el-input v-model.trim="formInline.name" clearable placeholder="请输入上架时间" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item>
            <el-button type="primary" size="small" icon="el-icon-search" @click="handleSubmit">搜索</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="small" icon="el-icon-plus" @click="handleAddSpu">新增</el-button>
          </el-form-item>
          <br>
          <el-form-item>
            <el-button type="defalut" @click="handleSubmit">批量上架</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="defalut" @click="handleSubmit">批量下架</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="table_wrapper">
      <tl-table
        :table="dataTable"
        @sizeChange="sizeChange"
        @pageChange="pageChange"
        @handleDownload="handleDownload"
        @handleStatus="handleStatus"
        @handleAddSKU="handleAddSKU"
      >
        <template slot="expandTable" slot-scope="props">
          <el-table
            :data="props.obj.row.goodsList"
            style="width: 100%"
            border
          >
            <el-table-column
              v-for="(item, index) in tr"
              :key="index"
              :prop="item.prop"
              :label="item.label"
            />
            <el-table-column
              fixed="right"
              label="操作"
              width="200"
            >
              <template slot-scope="scope">
                <span class="link_btn green" @click="deleteRow(scope.$index, tableData)">编辑</span>
                <span class="link_btn blue" @click="deleteRow(scope.$index, tableData)">下架</span>
                <span class="link_btn red" @click="deleteRow(scope.$index, tableData)">删除</span>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </tl-table>
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
        hasSelect: true,
        hasExpand: true,
        loading: false,
        page: 1,
        size: 50,
        total: 0,
        expands: [
          {
            slot: true,
            prop: 'expandTable'
          }
        ],
        tr: [
          {
            label: '商品ID',
            prop: 'id',
            init: '-'
          },
          {
            label: '一级类别',
            prop: 'id',
            init: '-'
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
            label: '最低-最高销售价',
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
            label: '商品状态',
            prop: '',
            init: '—'
          }
        ],
        data: [
          {
            id: '001',
            status: 1,
            goodsList: [
              {
                SKUID: 1,
                SKUIDName: '测试1'
              },
              {
                SKUID: 2,
                SKUIDName: '测试2'
              }
            ]
          },
          {
            id: '002',
            status: 2,
            goodsList: [
              {
                SKUID: 3,
                SKUIDName: '测试3'
              },
              {
                SKUID: 4,
                SKUIDName: '测试4'
              }
            ]
          }
        ],
        operation: {
          width: '200',
          data: [
            {
              label: '编辑',
              Fun: 'handleEdit'
            },
            {
              label: '下架',
              Fun: 'handleDownload'
            },
            {
              label: '新增SKU',
              Fun: 'handleAddSKU'
            }
          ]
        }
      },
      tr: [
        {
          label: 'SKUID',
          prop: 'SKUID',
          init: '-'
        },
        {
          label: 'SKU名称',
          prop: 'SKUIDName',
          init: '—'
        },
        {
          label: '属性',
          prop: '',
          init: '—'
        },
        {
          label: '成本价',
          prop: '',
          init: '—'
        },
        {
          label: '实付价',
          prop: '',
          init: '—'
        },
        {
          label: '销售价',
          prop: '',
          init: '—'
        },
        {
          label: '市场价',
          prop: '',
          init: '—'
        },
        {
          label: '商品状态',
          prop: '',
          init: '—'
        }
      ],
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
            label: '商品ID',
            prop: 'id',
            init: '-'
          },
          {
            label: '一级类目',
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
            label: '最低-最高价区间',
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
            label: '商品状态',
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
    handleAddSpu() { // 新增spu
      this.$router.push({ name: 'GoodsSpuAudit' })
    },
    handleAddSKU() { // 新增sku
      this.$router.push({ name: 'GoodsSkuAudit' })
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
