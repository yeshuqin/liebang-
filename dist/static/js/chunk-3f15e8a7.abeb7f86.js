(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3f15e8a7"],{"08a0":function(e,t,a){"use strict";a.r(t);var l=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"platform_list"},[a("el-form",{attrs:{inline:!0,model:e.formInline}},[a("el-form-item",{attrs:{label:"导航ID"}},[a("el-input",{attrs:{clearable:"",placeholder:"请输入导航ID"},model:{value:e.formInline.id,callback:function(t){e.$set(e.formInline,"id","string"===typeof t?t.trim():t)},expression:"formInline.id"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"列表名称"}},[a("el-input",{attrs:{clearable:"",placeholder:"请输入列表名称"},model:{value:e.formInline.name,callback:function(t){e.$set(e.formInline,"name","string"===typeof t?t.trim():t)},expression:"formInline.name"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"列表位名"}},[a("el-input",{attrs:{clearable:"",placeholder:"请输入列表位名"},model:{value:e.formInline.name,callback:function(t){e.$set(e.formInline,"name","string"===typeof t?t.trim():t)},expression:"formInline.name"}})],1),e._v(" "),a("el-form-item",[a("el-button",{attrs:{type:"success"},on:{click:e.handleSubmit}},[e._v("搜索")])],1),e._v(" "),a("el-form-item",[a("el-button",{attrs:{type:"primary"},on:{click:e.handleAdd}},[e._v("新增")])],1)],1),e._v(" "),a("div",{staticClass:"table_wrapper"},[a("tl-table",{attrs:{table:e.dataTable},on:{sizeChange:e.sizeChange,pageChange:e.pageChange,handledit:e.handledit,handleDelete:e.handleDelete}},[e._v("\n      11\n    ")])],1),e._v(" "),a("el-dialog",{attrs:{title:"新增平台信息",visible:e.showAddDialog,"custom-class":"add_dialog",width:"800px",center:""},on:{"update:visible":function(t){e.showAddDialog=t}}},[a("el-form",{attrs:{model:e.addObj,"label-width":"120px"}},[a("el-form-item",{attrs:{label:"列表位名:",required:""}},[a("el-select",{attrs:{clearable:"",placeholder:"请选择"},model:{value:e.addObj.name,callback:function(t){e.$set(e.addObj,"name","string"===typeof t?t.trim():t)},expression:"addObj.name"}},[a("el-option",{attrs:{label:"区域一",value:"shanghai"}}),e._v(" "),a("el-option",{attrs:{label:"区域二",value:"beijing"}})],1)],1),e._v(" "),a("el-form-item",{attrs:{label:"列表名称:",required:""}},[a("el-input",{attrs:{clearable:"",placeholder:"请输入列表名称"},model:{value:e.addObj.name,callback:function(t){e.$set(e.addObj,"name","string"===typeof t?t.trim():t)},expression:"addObj.name"}}),e._v(" "),a("span",[e._v("长度不能超过50个汉字")])],1),e._v(" "),a("el-form-item",{attrs:{label:"展示时间:",required:""}},[a("el-col",{attrs:{span:11}},[a("el-date-picker",{staticStyle:{width:"100%"},attrs:{"value-format":"yyyy-MM-dd",type:"date",placeholder:"选择日期"},model:{value:e.addObj.startTime,callback:function(t){e.$set(e.addObj,"startTime",t)},expression:"addObj.startTime"}})],1),e._v(" "),a("el-col",{staticClass:"line",attrs:{span:2}},[e._v("至")]),e._v(" "),a("el-col",{attrs:{span:11}},[a("el-date-picker",{staticStyle:{width:"100%"},attrs:{"value-format":"yyyy-MM-dd",type:"date",placeholder:"选择日期"},model:{value:e.addObj.endTime,callback:function(t){e.$set(e.addObj,"endTime",t)},expression:"addObj.endTime"}})],1)],1),e._v(" "),a("el-form-item",{attrs:{label:"配置链接:",required:""}},[a("el-input",{attrs:{clearable:"",placeholder:"请输入配置链接"},model:{value:e.addObj.name,callback:function(t){e.$set(e.addObj,"name","string"===typeof t?t.trim():t)},expression:"addObj.name"}}),e._v(" "),a("span",[e._v("非必填")])],1),e._v(" "),a("el-form-item",{attrs:{label:"广告内容:",required:""}},[a("el-upload",{staticClass:"upload-demo",attrs:{action:"https://jsonplaceholder.typicode.com/posts/",multiple:"",limit:3,"file-list":e.fileList}},[a("el-button",{attrs:{size:"small",type:"primary"}},[e._v("图片上传")]),e._v(" "),a("span",{staticClass:"el-upload__tip",attrs:{slot:"tip"},slot:"tip"},[e._v("(格式:png,jpg,jpeg,gif,大小不超过1M)")])],1)],1)],1),e._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{type:"primary"},on:{click:e.handleSumbitAdd}},[e._v("提 交")]),e._v(" "),a("el-button",{on:{click:function(t){e.showAddDialog=!1}}},[e._v("返 回")])],1)],1)],1)},n=[],i=a("f0f9"),o={components:{tlTable:i["a"]},data:function(){return{formInline:{name:"",id:""},dataTable:{hasSelect:!1,hasExpand:!1,loading:!1,page:1,size:50,total:0,expands:[],tr:[{label:"导航ID",prop:"id",init:"-"},{label:"列表名称",prop:"",init:"—"},{label:"广告内容",prop:"",init:"—"},{label:"列表位名",prop:"",init:"—"},{label:"链接地址",prop:"",init:"—"},{label:"展示时间",prop:"",init:"—"},{label:"状态",prop:"",init:"—"},{label:"操作信息",prop:"",init:"—"}],data:[{id:"001",status:1},{id:"002",status:2}],operation:{width:"200",data:[{label:"修改",Fun:"handledit"},{label:"删除",Fun:"handleDelete"}]}},addObj:{name:"",startTime:"",endTime:""},showAddDialog:!1,fileList:[]}},methods:{getInfor:function(){},handleSubmit:function(){},handleAdd:function(){this.showAddDialog=!0},handledit:function(e){},handleDelete:function(){},handleSumbitAdd:function(){},pageChange:function(e){this.dataTable.page=e,this.getInfor()},sizeChange:function(e){this.dataTable.size=e,this.getInfor()}}},s=o,r=(a("cbfb"),a("4023")),d=Object(r["a"])(s,l,n,!1,null,"5113653e",null);t["default"]=d.exports},"305b":function(e,t,a){"use strict";var l=a("e4f1"),n=a.n(l);n.a},cbfb:function(e,t,a){"use strict";var l=a("ecb1"),n=a.n(l);n.a},e4f1:function(e,t,a){},ecb1:function(e,t,a){},f0f9:function(e,t,a){"use strict";var l=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{ref:"tableBox",staticClass:"tl_table"},[[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.table.loading,expression:"table.loading"}],ref:"TlRlTable",staticClass:"table_box",staticStyle:{width:"100%","max-height":"100%"},attrs:{height:e.table.height,"show-summary":e.table.hasShowSummary,"summary-method":e.table.getSummaries,data:e.table.data,border:e.table.border,"tooltip-effect":"dark","max-height":e.maxHeight,"row-class-name":e.rowClassName,"span-method":e.objectSpanMethod,"header-row-class-name":"thClassName"},on:{"selection-change":e.handleSelectionChange,"sort-change":e.handleSortChange,"cell-click":e.cellClick,"cell-dblclick":e.cellDblclick,"row-click":e.rowClick}},[e.table.hasExpand?a("el-table-column",{attrs:{type:"expand"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-form",{staticClass:"table_expand",attrs:{"label-position":"left",inline:""}},[e._l(e.table.expands,(function(l,n){return[l.HProp?a("div",{key:n,staticClass:"expandTitle"},[e._v(e._s(l.label))]):e._e(),e._v(" "),l.slot?e._t(l.prop,null,{obj:t}):e._e()]}))],2)]}}],null,!0)}):e._e(),e._v(" "),e.table.hasSelect?a("el-table-column",{attrs:{selectable:e.isDisabled,type:"selection",width:"55"}}):e._e(),e._v(" "),e.table.hasIndex?a("el-table-column",{attrs:{type:"index",label:"序号",index:e.handleIndexMethod}}):e._e(),e._v(" "),e._l(e.table.tr,(function(t,l){return[!1!==t.show&&t.slot?a("el-table-column",{key:l,attrs:{"show-overflow-tooltip":"",prop:t.prop,sortable:t.sortable,"class-name":t.className?t.className:"",width:t.width?t.width:"","min-width":t.minWidth?t.minWidth:""},scopedSlots:e._u([{key:"header",fn:function(l){return[t.slotH?e._t(t.HProp,null,{obj:l}):a("span",[e._v(e._s(t.label))])]}},{key:"default",fn:function(a){return[e._t(t.prop,null,{obj:a})]}}],null,!0)}):!1===t.show||t.slot?e._e():a("el-table-column",{key:l,attrs:{"show-overflow-tooltip":"",prop:t.prop,sortable:t.sortable,"class-name":t.className?t.className:"",width:t.width?t.width:"","min-width":t.minWidth?t.minWidth:""},scopedSlots:e._u([{key:"header",fn:function(l){return[t.slotH?e._t(t.HProp,null,{obj:l}):a("span",[e._v(e._s(t.label))])]}},{key:"default",fn:function(l){return[t.ellipsis?a("div",{staticClass:"ellipsis"},[e._v("\n              "+e._s(l.row[t.prop]||t.init)+"\n            ")]):a("span",[e._v(e._s(t.showThousands?e.tableThousands(l.row[t.prop])||t.init:l.row[t.prop]||t.init))])]}}],null,!0)})]})),e._v(" "),e.table.hasOperation?a("el-table-column",{attrs:{"column-key":"operation",label:e.table.operation.label||"操作",width:e.table.operation.width?e.table.operation.width:"","min-width":e.table.operation.minWidth?e.table.operation.minWidth:"","class-name":e.table.operation.className},scopedSlots:e._u([{key:"default",fn:function(t){return[a("div",{staticClass:"oper_warpper clearfix"},[e._l(e.table.operation.data,(function(l,n){return[l.hidden?e._e():a("div",{key:n,staticClass:"fl oper_item"},[l.slot?e._t(l.Fun,null,{obj:t}):l.icon?a("span",{directives:[{name:"auth",rawName:"v-auth",value:l.auth,expression:"item.auth"}],key:n,staticClass:"link_btn table_icon iF",attrs:{href:"javascript:;",title:l.label},domProps:{innerHTML:e._s(l.icon)},on:{click:function(a){return a.stopPropagation(),e.handleOperation(t,l)}}},[e._v(e._s(l.label))]):a("span",{key:n,staticClass:"link_btn",attrs:{href:"javascript:;"},on:{click:function(a){return a.stopPropagation(),e.handleOperation(t,l)}}},[e._v(e._s(l.label))])],2)]})),e._v(" "),e.table.operation.other&&e.table.operation.other.length?a("el-dropdown",{staticClass:"fl",on:{command:function(a){return e.handleCommand(a,e.unknown,t)}}},[a("span",{staticClass:"dropdown_link"},[e._v("\n                更多操作"),a("i",{staticClass:"el-icon-arrow-down el-icon--right"})]),e._v(" "),a("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},e._l(e.table.operation.other,(function(l,n){return a("el-dropdown-item",{key:n,attrs:{command:l.Fun,disabled:!l.Fun}},[l.slot?a("span",[e._t(l.Fun,null,{obj:t})],2):a("span",[e._v(e._s(l.label))])])})),1)],1):e._e()],2)]}}],null,!0)}):e._e()],2),e._v(" "),e.showPagination?a("div",{ref:"bottomPage",staticClass:"tl_page"},[a("el-pagination",{attrs:{background:"",layout:"total, sizes, prev, pager, next, jumper","current-page":e.table.page,"page-size":e.table.size,"page-sizes":e.pageSizes,total:e.table.total},on:{"size-change":e.sizeChange,"current-change":e.pageChange}})],1):e._e()]],2)},n=[],i=(a("f548"),a("2b45"),{name:"TlTable",props:{table:{type:Object,default:function(){return{hasMergeRowOrColumn:!1,loading:!1,hasShowSummary:!1,border:!1,hasSelect:!0,hasOperation:!1,hasExpand:!1,hasIndex:!1,height:"",page:1,size:50,total:0,tr:[{label:"label",prop:"prop",className:"classname",minWidth:"80",showThousands:!1,sortable:!1,ellipsis:!1,show:!0,slot:!1}],data:[],operation:{label:"操作",width:"200",className:"",data:[{label:"通过",Fun:"handleSubmit",size:"mini",classname:"show"}],other:[]},expands:[{label:"label",prop:"prop"}],getSummaries:function(e){return console.log(e),[]}}}},pageSizes:{type:Array,default:function(){return[20,50,100,500]}},showPagination:{type:Boolean,default:!0},showTopPage:{type:Boolean,default:!1},autoTable:{type:Boolean,default:!1},clearSelect:{type:Boolean,default:!1}},data:function(){return{maxHeight:"auto"}},watch:{clearSelect:function(e,t){console.log(77777),this.$refs.TlRlTable.clearSelection()}},created:function(){var e=this;this.table.page=this.table.page||1,this.table.size=this.table.size||50,this.table.total=this.table.total||0,this.$nextTick((function(){e.showTopPage?e.maxHeight=parseFloat(window.innerHeight)-parseFloat(e.$refs.tableBox.getBoundingClientRect().top)-120:e.maxHeight=parseFloat(window.innerHeight)-parseFloat(e.$refs.tableBox.getBoundingClientRect().top)-60})),this.table.hasOperation="undefined"===typeof this.table.hasOperation||this.table.hasOperation,this.table.hasExpand=this.table.hasExpand||!1,this.table.hasSelect=this.table.hasSelect||!1,this.table.hasIndex=this.table.hasIndex||!1},methods:{isDisabled:function(e){return e.check?0:1},tableThousands:function(e){if(!e||e.toString().length<4)return e;var t=/^[0-9]+.?[0-9]*$/;return t.test(e.toString())?e.toString().replace(/\d+/,(function(e){return e.replace(/(\d)(?=(\d{3})+$)/g,(function(e){return e+","}))})):e},sizeChange:function(e){this.$emit("sizeChange",e)},pageChange:function(e){this.$emit("pageChange",e)},handleSelectionChange:function(e){this.$emit("onHandleSelectionChange",e)},handleSortChange:function(e){this.$emit("onHandleSortChange",e)},handleOperation:function(e,t){this.$emit(t.Fun,e.row,e.$index)},handleIndexMethod:function(e){var t=(this.table.page-1)*this.table.size+e+1;return t},handleCommand:function(e,t,a){this.$emit(e,a.row,a.$index)},objectSpanMethod:function(e){var t=e.row,a=e.column,l=e.rowIndex,n=e.columnIndex;this.table.hasMergeRowOrColumn&&this.$emit("onMergeRowOrColumn",{row:t,column:a,rowIndex:l,columnIndex:n})},cellClick:function(e,t,a,l){this.$emit("cellClick",e,t)},cellDblclick:function(e,t){this.$emit("cellDblclick",e,t)},rowClick:function(e,t,a){if(a&&"selection"!==a.type&&"operation"!==a.columnKey&&"expand"!==a.type){var l={row:e,event:t,column:a};this.$emit("onRowClick",l)}},rowClassName:function(e){var t=this.table.data,a=t[e.rowIndex].class?t[e.rowIndex].class:"";if(0!==a.length)return a=a.join(" "),a}}}),o=i,s=(a("305b"),a("4023")),r=Object(s["a"])(o,l,n,!1,null,null,null);t["a"]=r.exports}}]);