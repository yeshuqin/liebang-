<template>
  <div class="sku_wrapper">
    <el-table
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column
        width="300px"
      >
        <template slot="header" slot-scope="scope">
          属性名
          <el-button v-show="!showAttrName" type="primary" size="small" icon="el-icon-plus" circle @click="handleAddAttrName" />
          <el-input v-show="showAttrName" v-model="attrName" class="add_input" @change="changeAttrName(scope.row)" @blur="changeAttrName" />
        </template>
        <template slot-scope="scope">
          <el-row>
            <el-col :span="4">
              <el-button type="danger" size="small" icon="el-icon-delete" circle />
            </el-col>
            <el-col :span="20">
              <el-input v-model="scope.row.name" placeholder="输入关键字搜索" disabled class="add_input" />
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column
        label="属性值"
      >
        <template slot-scope="scope">
          <el-input v-model="item.name" v-for="(item, index) in scope.row.list" :key="index" disabled class="tag" />
          <el-input v-model="attrValue" @change="changeAttrVal" class="add_input" />
          <el-button type="primary" size="small" icon="el-icon-plus" circle @click="handleAttrValue(index)" />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      attrName: '',
      attrValue: '',
      showAttrName: false,
      tableData: []
    }
  },
  methods: {
    handleAddAttrName() {
      this.showAttrName = true
    },
    handleAttrValue(index) {
      this.tableData.list[index].push({
        name: ''
      })
    },
    changeAttrName() {
      this.showAttrName = false
      if (this.attrName === '') {
        return
      }
      this.tableData.push({
        name: this.attrName,
        list: []
      })
      this.attrName = ''
    },
    changeAttrVal() {}
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
}
</style>
