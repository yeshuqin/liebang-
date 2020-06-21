<template>
  <div ref="tableBox" class="tl_table">
    <template :table="table">
      <el-table
        ref="TlRlTable"
        v-loading="table.loading"
        class="table_box"
        size="medium"
        :height="table.height"
        :show-summary="table.hasShowSummary"
        :summary-method="table.getSummaries"
        :data="table.data"
        :border="table.border"
        tooltip-effect="dark"
        style="width: 100%; max-height :100%"
        :max-height="maxHeight"
        :row-class-name="rowClassName"
        :span-method="objectSpanMethod"
        header-row-class-name="thClassName"
        @selection-change="handleSelectionChange"
        @sort-change="handleSortChange"
        @expand-change="handleExpandChange"
        @cell-click="cellClick"
        @cell-dblclick="cellDblclick"
        @row-click="rowClick"
      >
        <el-table-column v-if="table.hasExpand" type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="table_expand">
              <template v-for="(item, index) in table.expands">
                <div v-if="item.HProp" :key="index" class="expandTitle">{{ item.label }}</div>
                <slot v-if="item.slot" :name="item.prop" :obj="props" />
              </template>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column v-if="table.hasSelect" :selectable="isDisabled" type="selection" width="55" />
        <el-table-column
          v-if="table.hasIndex"
          type="index"
          label="序列"
          width="50px"
          :index="handleIndexMethod"
        />
        <template v-for="(item, index) in table.tr">
          <el-table-column
            v-if="item.show !== false && item.slot"
            :key="index"
            show-overflow-tooltip
            :prop="item.prop"
            :sortable="item.sortable"
            :class-name="item.className ? item.className : ''"
            :width="item.width ? item.width : ''"
            :min-width="item.minWidth ? item.minWidth : ''"
          >
            <template slot="header" slot-scope="scope">
              <span v-if="!item.slotH">{{ item.label }}</span>
              <slot v-else :name="item.HProp" :obj="scope" />
            </template>
            <template slot-scope="scope">
              <slot :name="item.prop" :obj="scope" />
            </template>
          </el-table-column>
          <el-table-column
            v-else-if="item.show !== false && !item.slot"
            :key="index"
            show-overflow-tooltip
            :prop="item.prop"
            :sortable="item.sortable"
            :class-name="item.className ? item.className : ''"
            :width="item.width ? item.width : ''"
            :min-width="item.minWidth ? item.minWidth : ''"
          >
            <template slot="header" slot-scope="scope">
              <span v-if="!item.slotH">{{ item.label }}</span>
              <slot v-else :name="item.HProp" :obj="scope" />
            </template>
            <template slot-scope="scope">
              <!-- 多行溢出 -->
              <div v-if="item.ellipsis" class="ellipsis">
                {{ scope.row[item.prop]||item.init }}
              </div>
              <!-- {{scope.row[item.prop]||item.init}} -->
              <span v-else>{{ item.showThousands ? tableThousands(scope.row[item.prop])||item.init : scope.row[item.prop]||item.init }}</span>
            </template>
          </el-table-column>
        </template>
        <el-table-column
          v-if="table.hasOperation"
          column-key="operation"
          :label="table.operation.label || '操作'"
          :width="table.operation.width ? table.operation.width : ''"
          :min-width="table.operation.minWidth ? table.operation.minWidth : ''"
          :class-name="table.operation.className"
        >
          <template slot-scope="scope">
            <div class="oper_warpper clearfix">
              <template v-for="(item, index) in table.operation.data">
                <div v-if="!item.hidden" :key="index" class="fl oper_item">
                  <slot v-if="item.slot" :name="item.Fun" :obj="scope" />
                  <span v-else-if="item.icon" :key="index" v-auth="item.auth" href="javascript:;" class="link_btn table_icon iF" :title="item.label" @click.stop="handleOperation(scope, item)" v-html="item.icon">{{ item.label }}</span>
                  <span v-else :key="index" href="javascript:;" class="link_btn" @click.stop="handleOperation(scope, item)">{{ item.label }}</span>
                </div>
              </template>
              <el-dropdown v-if="table.operation.other && table.operation.other.length" class="fl" @command="handleCommand($event, unknown, scope)">
                <span class="dropdown_link">
                  更多操作<i class="el-icon-arrow-down el-icon--right" />
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item v-for="(item, index) in table.operation.other" :key="index" :command="item.Fun" :disabled="!item.Fun">
                    <span v-if="item.slot">
                      <slot :name="item.Fun" :obj="scope" />
                    </span>
                    <span v-else>{{ item.label }}</span>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div v-if="showpagination" ref="bottomPage" class="tl_page">
        <el-pagination
          background
          layout="total, sizes, prev, pager, next, jumper"
          :current-page="table.page"
          :page-size="table.size"
          :page-sizes="pageSizes"
          :total="table.total"
          @size-change="sizeChange"
          @current-change="pageChange"
        />
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'TlTable',
  props: {
    table: {
      type: Object,
      default() {
        return {
          hasMergeRowOrColumn: false, // 是否合并单元格
          loading: false, // 加载中动画
          hasShowSummary: false, // 是否显示表位合计行
          border: false, // 是否带有纵向边框，默认为false
          hasSelect: true, // 有无选中功能
          hasOperation: false, // 有无操作功能
          hasExpand: false, // 有无展开行功能
          hasIndex: false, // 有无索引
          height: '', // 表格高度
          page: 1,
          size: 50,
          total: 0,
          tr: [ // 表头数据 —— className:列的class名
            {
              label: 'label',
              prop: 'prop',
              className: 'classname',
              minWidth: '80',
              showThousands: false, // 分隔符
              sortable: false, // 表格排序
              ellipsis: false, // 多行溢出
              show: true, // show有三种值：false隐藏当前列，true常规表格列，
              slot: false // template自定义表格列
              /* <template slot-scope="props" slot="example">
               <a class="list-a" target="_blank" :href="'/#/bombscreen?mobile=' + props.obj.row.mobile">{{ props.obj.row.username }}</a>
              </template> */
            }
          ],
          data: [], // 表格数据 —— 如需添加行class，处理数据时则需要传入class名， class需为数组
          operation: { // 操作功能
            label: '操作', // 操作列的行首文字
            width: '200', // 操作列的宽度
            className: '', // 操作列的class名
            data: [ // 操作列数据
              {
                label: '通过', // 按钮文字
                Fun: 'handleSubmit', // 点击按钮后触发的父组件事件
                size: 'mini', // 按钮大小
                classname: 'show' // 按钮的类名
              }
            ],
            other: []
          },
          expands: [ // 展开行数据
            {
              label: 'label',
              prop: 'prop'
            }
          ],
          getSummaries(param) {
            // 自定义表位合计行数据
            // *** 此函数传入param参数
            console.log(param)
            // *** 最后返回一个数组，合计行会显示数组中的内容
            return []
          }
        }
      }
    },
    pageSizes: {
      type: Array,
      default() {
        return [20, 50, 100, 500]
      }
    },
    showpagination: {
      type: Boolean,
      default: true
    },
    showTopPage: {
      type: Boolean,
      default: false
    },
    autoTable: {
      type: Boolean,
      default: false
    },
    clearSelect: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      maxHeight: 'auto'
    }
  },
  watch: {
    clearSelect(old, newVal) {
      console.log(77777)
      this.$refs.TlRlTable.clearSelection()
    }
  },
  created() {
    this.table.page = this.table.page || 1
    this.table.size = this.table.size || 50
    this.table.total = this.table.total || 0
    // this.$nextTick(() => {
    //   if (this.showTopPage) {
    //     this.maxHeight = parseFloat(window.innerHeight) - parseFloat(this.$refs.tableBox.getBoundingClientRect().top) - 120
    //   } else {
    //     this.maxHeight = parseFloat(window.innerHeight) - parseFloat(this.$refs.tableBox.getBoundingClientRect().top) - 60
    //   }
    // })
    this.table.hasOperation = typeof (this.table.hasOperation) !== 'undefined' ? this.table.hasOperation : true // 有无操作功能
    this.table.hasExpand = this.table.hasExpand || false // 有无展开行功能
    this.table.hasSelect = this.table.hasSelect || false // 有无多选功能
    this.table.hasIndex = this.table.hasIndex || false // 有无索引
  },
  methods: {
    isDisabled(row) {
      if (row.check) {
        return 0
      }
      return 1
    },
    tableThousands(value) {
      if (!value || value.toString().length < 4) {
        return value
      }
      const reg = /^[0-9]+.?[0-9]*$/
      if (!reg.test(value.toString())) {
        return value
      }
      return value.toString().replace(/\d+/, function(n) { // 先提取整数部分
        return n.replace(/(\d)(?=(\d{3})+$)/g, function($1) { // 对整数部分添加分隔符
          return $1 + ','
        })
      })
    },
    sizeChange(val) {
      this.$emit('sizeChange', val)
    },
    pageChange(val) {
      this.$emit('pageChange', val)
    },
    handleSelectionChange(val) {
      this.$emit('onHandleSelectionChange', val)
    },
    handleSortChange(column) {
      this.$emit('onHandleSortChange', column)
    },
    handleExpandChange(row, type) {
      console.log(row, type, '测试')
      this.$emit('onHandleExpandChange', row, type)
    },
    handleOperation(scope, item) {
      this.$emit(item.Fun, scope.row, scope.$index)
    },
    handleIndexMethod(index) {
      const startRow = (this.table.page - 1) * this.table.size + index + 1
      return startRow
    },
    handleCommand(command, unknown, scope) {
      this.$emit(command, scope.row, scope.$index)
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (this.table.hasMergeRowOrColumn) {
        this.$emit('onMergeRowOrColumn', {
          row,
          column,
          rowIndex,
          columnIndex
        })
      }
    },
    // 点击某一单元格派发事件
    cellClick(row, column, cell, event) {
      this.$emit('cellClick', row, column)
    },
    cellDblclick(row, column) {
      this.$emit('cellDblclick', row, column)
    },
    // 点击某一行时触发的函数
    // *** 按下左键然后移动鼠标到其它列放开左键，会有报错 -- 优化：添加点击行参数，
    rowClick(Row, Event, Column) {
      if (
        !Column ||
        Column.type === 'selection' ||
        Column.columnKey === 'operation' ||
        Column.type === 'expand'
      ) {
        return
      }
      const data1 = {
        row: Row,
        event: Event,
        column: Column
      }
      this.$emit('onRowClick', data1)
    },
    // 行类名的回调函数
    // 在表格数据中添加class字段即为表格行类名，配合css可对表格行中的自定义标签进行样式优化
    rowClassName(rowdata) {
      const data = this.table.data
      let className = data[rowdata.rowIndex].class
        ? data[rowdata.rowIndex].class
        : ''
      if (className.length === 0) {
        return
      }
      className = className.join(' ')
      return className
    }
  }
}
</script>

<style lang="scss">
.tl_table {
  position: relative;
  // height: 100%;
  // .table_box{
  //   height:calc(100% - 130px);
  // }
  .expandTitle {
    color: #333;
    font-size: 16px;
    margin: 10px 0;
    display: block;
    width: 100% !important;
    min-width: 100%;
  }
  .cell{
    max-width: 100%;
    /* overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap; */
    img {
      display: block;
      margin: 0 auto;
    }
  }
  .red {
    color: #F56C6C !important;
  }
  .green {
    color: #67C23A !important;
  }
  .oper_warpper {
    user-select: none;
    .oper_item {
      margin-right: 10px;
      display: inline-block;
      &:last-child {
        margin-right: 0;
      }
    }
    .dropdown_link {
      font-size: 12px;
    }
  }
  .link_btn {
    cursor: pointer;
    margin-right: 10px;
    color: #1e71f9;
    &:hover {
      text-decoration: underline;
    }
    &:last-child {
      margin-right: 0;
    }
  }
  .table_expand {
    font-size: 0;
  }
  .table_icon {
    color: #85C2FF;
    font-size: 22px;
    &:hover {
      color: #1989FA;
      text-decoration: none;
    }
  }
  .table_expand label {
    min-width: 90px;
    color: #99a9bf;
  }
  .table_expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    min-width: 50%;
  }
  .tl_page {
    text-align: center;
    height: 60px;
    padding-top: 20px;
    background: #fff;
  }
  // 排序 --- start
  .el-table .caret-wrapper {
    height: 22px;
    margin-top: -3px;
  }
  .el-table .ascending .sort-caret.ascending {
    border-bottom-color: #409EFF;
  }
  .el-table .sort-caret.ascending {
    top: 0;
  }
  .el-table .sort-caret.descending {
    bottom: 0;
  }
  .el-table .descending .sort-caret.descending {
    border-top-color: #409EFF;
    bottom: 0;
  }
  .el-table .descending .sort-caret.descending{
    border-bottom-color: #fff;
  }
  // 排序 --- end
}
.el-table .cell.el-tooltip {
  white-space: initial;
}
.ellipsis {
  width:101%;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  overflow: hidden;
  -moz-box-orient: vertical;
  -webkit-box-orient: vertical;
}
</style>
