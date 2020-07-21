<template>
  <div class="sku_wrapper">
    <!-- <el-form label-width="100px" class="mb20">
      <el-form-item label="SKU前缀：" required>
        <el-input v-model="skuNmae" size="small" style="width:300px" />
      </el-form-item>
    </el-form> -->
    <el-card class="box-card mb20">
      <div slot="header" class="clearfix">
        <span>属性设置</span>
      </div>
      <el-table
        :data="tableData"
        :row-class-name="tableRowClassName"
        style="width: 100%"
      >
        <el-table-column
          width="300px"
        >
          <template slot="header" slot-scope="scope">
            属性名
            <el-button v-show="!showAttrName && !isEdit" type="primary" size="mini" icon="el-icon-plus" circle @click.stop="handleAddAttrName" />
            <el-input v-show="showAttrName" v-model.trim="attrName" size="mini" class="add_input" @blur.stop="changeAttrName(scope.row)" />
          </template>
          <template slot-scope="scope">
            <el-row>
              <el-col :span="4">
                <el-button type="danger" size="mini" icon="el-icon-delete" v-if="!isEdit" circle @click="handleDelAttr(scope.row)" />
              </el-col>
              <el-col :span="20">
                <el-input v-model="scope.row.name" size="mini" placeholder="输入关键字搜索" disabled class="add_input" />
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column
          label="属性值"
        >
          <template slot-scope="scope">
            <el-input v-for="(name, index) in scope.row.list" :key="index" :value="name" size="mini" disabled class="tag" />
            <el-input v-if="showAttrIndex === scope.row.index" v-model.trim="attrValue" size="mini" class="add_input" @blur.stop="changeAttrVal(scope.row)" />
            <span v-else>
              <el-button  v-if="!isEdit" type="primary" size="mini" icon="el-icon-plus" circle @click.stop="handleAttrValue(scope.row)" />
            </span>
            
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-card class="box-card mb20">
      <div slot="header" class="clearfix">
        <span>SKU设置</span>
      </div>
      <div class="mb20">
        <span>批量填充：</span>
        <el-input v-model.trim="costPrice" size="small" type="number" class="add_input mr20" placeholder="请输入成本价" />
        <el-input v-model.trim="marketPrice" size="small" type="number" class="add_input mr20" placeholder="请输入市场价" />
        <el-input v-model.trim="salePrice" size="small" type="number" class="add_input mr20" placeholder="请输入销售价" />
        <el-button type="default" size="small" :disabled="checkBox.length === 0" @click="handleSumbitPrice">确 定</el-button>
      </div>
      <tl-table
        :showpagination="false"
        :table="skuDataTable"
        @onHandleSelectionChange="onHandleSelectionChange"
      >
        <template slot="name" slot-scope="props">
          <!-- <el-input v-model.trim="props.obj.row.costPrice" size="small" type="number" placeholder="" /> -->
          <span v-for="(value, index) in props.obj.row.name" :key="index">{{ value }}</span>
        </template>
        <template slot="costPrice" slot-scope="props">
          <el-input v-model.trim="props.obj.row.costPrice" size="small" type="number" placeholder="" />
        </template>
        <template slot="marketPrice" slot-scope="props">
          <el-input v-model.trim="props.obj.row.marketPrice" size="small" type="number" placeholder="" />
        </template>
        <template slot="salePrice" slot-scope="props">
          <el-input v-model.trim="props.obj.row.salePrice" size="small" type="number" placeholder="" />
        </template>
      </tl-table>
    </el-card>
    <!-- <div>
      <el-button type="primary" size="small" @click="handleSumbitSave">确 定</el-button>
      <el-button size="small" @click="handleGoBack">返 回</el-button>
    </div> -->
  </div>
</template>

<script>
import tlTable from '@/components/BaseTable/tlTable'
export default {
  components: {
    tlTable
  },
  props: {
    dataList: {
      type: Array,
      default() {
        return []
      }
    },
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      spuId: this.$route.query.spuId,
      skuNmae: '', //sku前缀
      attrName: '', //属性名
      attrValue: '', //属性值
      showAttrName: false,
      tableData: [],
      attrNameArr: [], //属性名数组
      showAttrIndex: -1, // 当前输入的属性框
      result: [],
      skuDataTable: {
        hasSelect: true,
        hasExpand: false,
        loading: false,
        border: true,
        hasOperation: false,
        page: 1,
        size: 50,
        total: 0,
        expands: [],
        tr: [
          {
            label: 'SKU属性',
            prop: 'name',
            slot: true,
            init: '-'
          },
          {
            label: 'SKUID',
            prop: 'skuid',
            init: '系统自动生成'
          },
          {
            label: '成本价',
            prop: 'costPrice',
            slot: true,
            init: '—'
          },
          {
            label: '市场价',
            prop: 'marketPrice',
            slot: true,
            init: '—'
          },
          {
            label: '销售价',
            prop: 'salePrice',
            slot: true,
            init: '—'
          }
        ],
        data: [],
        operation: {
          width: '100',
          data: [
          ]
        }
      },
      costPrice: '', // 成本价
      marketPrice: '', // 市场价
      salePrice: '', // 销售价
      checkBox: [],
      attrKey: [],
      skuDataMap: {},
      skuDataList: {}
    }
  },
  watch: {
    'tableData': {
      handler() {
        if(this.isEdit) {
          return
        }
        this.skuDataList = {}
        this.tableData.forEach((item, index) => {
          if (item.list.length > 0) {
            this.skuDataList[item.name] = []
            item.list.forEach(sku => {
              this.skuDataList[item.name].push(item.name + '：' + sku)
            })
          }
        })
        var values = Object.values(this.skuDataList)
        if (values.length > 1) {
          this.getSku(values)
        } else if (values.length === 1) {
          this.result = values[0]
        } else {
          this.result = []
        }
        this.updateSku()
        // console.log(this.result, 'result')
      },
      deep: true
    },
    'dataList': {
      handler() {
        this.skuDataTable.data = this.dataList
        let ObjMap = {}
        this.dataList.forEach(item => {
          let obj = JSON.parse(item.attribute)
          for(let i in obj) {
            if(!(ObjMap[i] instanceof Array)) {
               ObjMap[i] = []
            }
            if(!ObjMap[i].includes(obj[i])) {
              ObjMap[i].push(obj[i])
            }
          }
        })
        console.log(ObjMap)
        for(let attr in ObjMap) {
          this.tableData.push({
          name: attr,
          list: ObjMap[attr]
        })
      }
        
      }
    }
  },
  mounted() {
    var self = this
    document.addEventListener('click', function(e) {
      if (e.target.nodeName === 'INPUT') {
        return
      }
      self.showAttrName = false
      self.showAttrIndex = -1
    }, false)
  },
  methods: {
    getSku(arr) {
      var reslut = arr.reduce((last, current) => {
        const array = []
        last.forEach(par1 => {
          current.forEach(par2 => {
            array.push(par1 + ',' + par2)
          })
        })
        return array
      })
      this.result = reslut
    },
    handleAddAttrName() { //新增sku属性名
      this.showAttrName = true
       this.attrNameArr = this.tableData.map(item => {
        return item.name
      })
    },
    changeAttrName() {
      this.showAttrName = false
      if (!this.attrName) {
        return
      }
      if (!this.attrNameArr.includes(this.attrName)) {
        //属性名不能重复
        this.tableData.push({
          name: this.attrName,
          list: []
        })
      } else {
        this.$message.error('属性名不能重复')
      }
      this.attrName = ''
    },
    handleAttrValue(item) { //新增sku属性值
      var index = item.index
      this.showAttrIndex = index
    },
    changeAttrVal(item) { //新增sku属性值
      if (this.attrValue !== '' && !item.list.includes(this.attrValue)) {
        //属性值不能重复
        item.list.push(this.attrValue)
      }
      this.showAttrIndex = -1
      this.attrValue = ''
    },
    handleDelAttr(item) { //删除sku属性名
      this.tableData.splice(item.index, 1)
    },
    onHandleSelectionChange(val) {
      this.checkBox = val
    },
    updateSku() {
      var data = JSON.parse(JSON.stringify(this.skuDataTable.data))
      this.skuDataMap = {}
      data.forEach(sku => {
        this.skuDataMap[sku.name] = sku
      })
      this.getSkuList()
    },
    getSkuList() { //更新sku表格
      this.skuDataTable.data = []
      this.result.forEach(item => {
        var obj = this.skuDataMap[item] || {
          attribute: this.getAttribute(item),
          costPrice: '',
          marketPrice: '',
          salePrice: '',
          id: '',
          spuId: '',
          name: item
        }
        this.skuDataTable.data.push(obj)
      })
    },
    handleSumbitPrice() { //批量修改价格
      this.checkBox.forEach(item => {
        item.costPrice = this.costPrice ? this.costPrice : item.costPrice
        item.marketPrice = this.marketPrice ? this.marketPrice : item.marketPrice
        item.salePrice = this.salePrice ? this.salePrice : item.salePrice
      })
    },
    getAttribute(str) {
      var arr = str.split(',')
      var obj = {}
      arr.forEach(item => {
        var keyArr = item.split('：')
        obj[keyArr[0]] = keyArr[1]
      })
      return JSON.stringify(obj)
    },
    handleSumbitSave() {
      // var params = {
      //   spuId: this.spuId,
      //   skuList: this.skuDataTable.data
      // }
      return this.skuDataTable.data
      // this.$http.send(this.$api.sku, params, 'post').then(res => {
      //   this.$message.success('操作成功~')
      //   this.$router.push({ name: 'Goods' })
      //   this.getInfor()
      // }).catch(res => {
      //   this.$message.error(res.msg)
      // })
    },
    handleGoBack() {
      this.$router.push({ name: 'Goods' })
    },
    tableRowClassName({ row, rowIndex }) {
      //把每一行的索引放进row
      row.index = rowIndex
      // console.log(rowIndex, 'rowIndex')
    }
  }
}
</script>

<style lang="scss" scoped>
.sku_wrapper {
  .add_input {
    width: 150px;
  }
  .tag {
    width: 100px;
    margin-right: 4px;
  }
  .mr20 {
    margin-right: 20px;
  }
}
</style>
