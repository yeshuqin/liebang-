<template>
  <div class="_list">
    <el-form :inline="true" size="small" :model="formInline" label-width="100px">
      <el-row style="width:1300px">
        <el-col :span="18">
          <el-form-item label="商品ID">
            <el-input v-model.trim="formInline.id" clearable placeholder="请输入商品ID" />
          </el-form-item>
          <el-form-item label="商品名称">
            <el-input v-model.trim="formInline.name" clearable placeholder="请输入商品名称" />
          </el-form-item>
          <el-form-item label="一级类别">
            <el-input v-model.trim="formInline.name" clearable placeholder="请输入一级类别" />
          </el-form-item>
          <el-form-item label="服务类型">
            <el-input v-model.trim="formInline.name" clearable placeholder="请输入服务类型" />
          </el-form-item>
          <el-form-item label="商品状态">
            <el-select v-model="formInline.status" placeholder="请选择">
              <el-option
                v-for="item in statusItems"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
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
        @handleDel="handleDel"
        @handleEdit="handleEdit"
        @handleStatus="handleStatus"
        @handleAddSKU="handleAddSKU"
      >
        <template slot="primaryPic" slot-scope="props">
          <span v-if="!props.obj.row.primaryPic">暂无图片</span>
          <img v-else :src="props.obj.row.primaryPic" class="picUrl" alt="">
        </template>
        <template slot="saleStatus" slot-scope="props">
          <span>{{ props.obj.row.saleStatus === 0 ? '未上架' : '已上架' }}</span>
        </template>
        <template slot="handleStatus" slot-scope="props">
          <span v-if="props.obj.row.saleStatus === 0" class="link_btn" @click="handleStatus(props.obj.row)">上架</span>
          <span v-else class="link_btn red" @click="handleStatus(props.obj.row)">下架</span>
        </template>
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
          :show-pagination="showPagination"
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
            label: '商品名称',
            prop: 'name',
            init: '-'
          },
          {
            label: '商品ID',
            prop: 'id',
            init: '-'
          },
          {
            label: '一级类别',
            prop: 'cateName',
            init: '-'
          },
          {
            label: '主图',
            prop: 'primaryPic',
            slot: true,
            init: '—'
          },
          {
            label: '最低-最高销售价',
            prop: '',
            init: '—'
          },
          {
            label: '标签',
            prop: 'tags',
            init: '—'
          },
          {
            label: '上架时间',
            prop: 'saleTime',
            init: '—'
          },
          {
            label: '创建时间',
            prop: 'createTime',
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
              label: '编辑',
              Fun: 'handleEdit'
            },
            {
              slot: true,
              Fun: 'handleStatus'
            },
            {
              label: '删除',
              Fun: 'handleDel'
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
      this.$http.send(this.$api.spu, params, 'get').then(res => {
        if (res.data) {
          this.dataTable.data = res.data.records
          this.dataTable.total = res.data.total
        }
        this.dataTable.loading = false
      }).catch(res => {
        this.dataTable.loading = false
      })
    },
    handleAddSpu() { // 新增spu
      this.$router.push({ name: 'GoodsSpuAudit' })
    },
    handleAddSKU() { // 新增sku
      this.$router.push({ name: 'GoodsSkuAudit' })
    },
    handleSubmit() {
    },
    handleEdit(row) {
      this.$router.push({ name: 'GoodsSpuAudit', query: { id: row.id }})
    },
    handleSumbitAdd() {

    },
    handleDel(row) {
      this.$confirm('此操作将删除商品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var url = `${this.$api.spu}/${row.id}`
        this.$http.send(url, {}, 'delete').then(res => {
          this.$message.success('操作成功~')
          this.getInfor()
        }).catch(res => {
          this.$message.error(res.msg)
        })
      })
    },
    handleStatus(row) {
      this.$confirm(`此操作${row.saleStatus === 0 ? '上架' : '下架'}[${row.name}]商品, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var status = row.saleStatus === 0 ? 1 : 0
        var url = `${this.$api.spu}/${row.id}/setting/${status}`
        this.$http.send(url, {}, 'patch').then(res => {
          this.$message.success('操作成功~')
          this.getInfor()
        }).catch(res => {
          this.$message.error(res.msg)
        })
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
</style>
