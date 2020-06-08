<template>
  <div class="platform_list">
    <el-form :inline="true" size="small" :model="formInline">
      <el-form-item label="导航ID">
        <el-input v-model.trim="formInline.id" clearable placeholder="请输入导航ID" />
      </el-form-item>
      <el-form-item label="列表名称">
        <el-input v-model.trim="formInline.name" clearable placeholder="请输入列表名称" />
      </el-form-item>
      <el-form-item label="列表位名">
        <el-input v-model.trim="formInline.name" clearable placeholder="请输入列表位名" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="small" icon="el-icon-search" @click="handleSubmit">搜索</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="small" icon="el-icon-plus" @click="handleAdd">新增</el-button>
      </el-form-item>
    </el-form>
    <div class="table_wrapper">
      <tl-table
        :table="dataTable"
        @sizeChange="sizeChange"
        @pageChange="pageChange"
        @handledit="handledit"
        @handleDelete="handleDelete"
      >
        11
      </tl-table>
    </div>
    <!-- 新增平台信息 -->
    <el-dialog title="新增平台信息" :visible.sync="showAddDialog" custom-class="add_dialog" width="800px" center>
      <el-form :model="addObj" size="samll" label-width="120px">
        <el-form-item label="列表位名:" required>
          <el-select v-model.trim="addObj.name" clearable placeholder="请选择">
            <el-option label="区域一" value="shanghai" />
            <el-option label="区域二" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item label="列表名称:" required>
          <el-input v-model.trim="addObj.name" clearable placeholder="请输入列表名称" /> <span>长度不能超过50个汉字</span>
        </el-form-item>
        <el-form-item label="展示时间:" required>
          <el-col :span="11">
            <el-date-picker
              v-model="addObj.startTime"
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="选择日期"
              style="width:100%"
            />
          </el-col>
          <el-col class="line" :span="2">至</el-col>
          <el-col :span="11">
            <el-date-picker
              v-model="addObj.endTime"
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="选择日期"
              style="width:100%"
            />
          </el-col>
        </el-form-item>
        <el-form-item label="配置链接:" required>
          <el-input v-model.trim="addObj.name" clearable placeholder="请输入配置链接" /> <span>非必填</span>
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
        <el-button type="primary" size="small" @click="handleSumbitAdd">提 交</el-button>
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
            label: '导航ID',
            prop: 'id',
            init: '-'
          },
          {
            label: '列表名称',
            prop: '',
            init: '—'
          },
          {
            label: '广告内容',
            prop: '',
            init: '—'
          },
          {
            label: '列表位名',
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
            label: '操作信息',
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
              label: '修改',
              Fun: 'handledit'
            },
            {
              label: '删除',
              Fun: 'handleDelete'
            }
          ]
        }
      },
      addObj: {
        name: '',
        startTime: '',
        endTime: ''
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
    handledit(row) {

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
