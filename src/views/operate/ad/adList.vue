<template>
  <div class="ad_list">
    <div class="search_wrapper">
      <el-form :inline="true" size="small" :model="formInline" label-width="100px">
        <el-form-item label="广告ID：">
          <el-input v-model.trim="formInline.id" clearable placeholder="请输入广告ID" />
        </el-form-item>
        <el-form-item label="广告名称：">
          <el-input v-model.trim="formInline.name" clearable placeholder="请输入广告名称" />
        </el-form-item>
        <el-form-item label="广告位名：">
          <el-input v-model.trim="formInline.name" clearable placeholder="请输入广告位名" />
        </el-form-item>
        <el-form-item class="fr">
          <el-button type="primary" size="small" icon="el-icon-search" @click="handleSubmit">搜索</el-button>
          <el-button type="primary" size="small" icon="el-icon-plus" @click="handleAdd">新增</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="table_wrapper">
      <tl-table
        :table="dataTable"
        @sizeChange="sizeChange"
        @pageChange="pageChange"
        @handleDelete="handleDelete"
      >
        <template slot="handleStatus" slot-scope="props">
          <span v-if="props.obj.row.status === 1" class="link_btn green" @click="handleStatus(props.obj.row)">生效</span>
          <span v-else class="link_btn red" @click="handleStatus(props.obj.row)">停用</span>
        </template>
      </tl-table>
    </div>
    <!-- 新增广告 -->
    <el-dialog title="新增广告配置" :visible.sync="showAddDialog" custom-class="add_dialog" width="800px" center>
      <el-form :model="addObj" label-width="120px" size="small">
        <el-form-item label="广告位名:" required>
          <el-select v-model.trim="addObj.name" clearable placeholder="请选择">
            <el-option label="区域一" value="shanghai" />
            <el-option label="区域二" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item label="广告名称:" required>
          <el-input v-model.trim="addObj.name" clearable placeholder="请输入广告名称" />
          <p class="tip">长度不能超过50个汉字</p>
        </el-form-item>
        <el-form-item label="展示名称:" required>
          <el-col :span="11">
            <el-input v-model.trim="addObj.name" clearable placeholder="请输入" style="width:100%" />
          </el-col>
          <el-col class="line" :span="2">至</el-col>
          <el-col :span="11">
            <el-input v-model.trim="addObj.name" clearable placeholder="请输入" style="width:100%" />
          </el-col>
        </el-form-item>
        <el-form-item label="配置链接:">
          <el-input v-model.trim="addObj.name" clearable placeholder="请输入配置链接" />
        </el-form-item>
        <el-form-item label="广告内容:" required>
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            multiple
            :limit="3"
            :file-list="fileList"
          >
            <el-button size="small" type="primary">图片上传</el-button>
            <span slot="tip" class="el-upload__tip">(格式:png,jpg,jpeg,gif,大小不超过1M)</span>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" type="primary" @click="handleSumbitAdd">提 交</el-button>
        <el-button size="small" @click="showAddDialog = false">返 回</el-button>
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
            label: '广告ID',
            prop: 'id',
            init: '-'
          },
          {
            label: '广告名称',
            prop: '',
            init: '—'
          },
          {
            label: '广告内容',
            prop: '',
            init: '—'
          },
          {
            label: '广告位名',
            prop: '',
            init: '—'
          },
          {
            label: '链接地址',
            prop: '',
            init: '—'
          },
          {
            label: '展示时间',
            prop: '',
            init: '—'
          },
          {
            label: '状态',
            prop: '',
            init: '—'
          },
          {
            label: '操作系统',
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
              label: '停用',
              Fun: 'handleStatus',
              slot: true
            },
            {
              label: '删除',
              Fun: 'handleDelete'
            }
          ]
        }
      },
      addObj: {
        name: ''
      },
      showAddDialog: false,
      fileList: []
    }
  },
  methods: {
    getInfor() {

    },
    handleSubmit() {
    },
    handleAdd() {
      this.showAddDialog = true
    },
    handleDelete() {

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
