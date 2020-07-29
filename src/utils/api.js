
export default {
  addCate: 'cate',
  showcase: 'showcase',
  showcaseSpu: 'showcase/spu',
  banner: 'banner',
  spu: 'spu',
  sku: 'sku',
  upload: '/admin/upload/image',
  uploadFile: '/admin/upload/file',
  account: 'account',
  login: 'account/login',
  logout: 'account/logout',

  // 用户管理
  faqPage: 'faq/page', // 分页查询用户咨询信息
  faqConfirm: 'faq/confirm', // 将咨询消息扭转为已处理

  // 用户信息管理
  userAuth: 'user/auth', // 更新企业认证状态 
  userInfo: 'user/info', //查询单个用户详细信息
  userPage: 'user/page', // 分页查询用户基础信息
  userUpdate: 'user/update', // 修改用户信息

  // 订单交易API
  orderAudit: 'order/audit', // 订单资料审核
  orderCancel: 'order/cancel', // 订单取消
  orderConfirm: 'order/confirm', // 确认支付
  orderDeliver: '/order/deliver', // 订单发货
  orderDelivered: 'order/delivered', // 确认收货
  orderDetail: 'order/detail', // 订单详情
  orderPage: 'order/page', //分页查询订单列表

  systemExpressList: 'system/expressList' // 查询物流供应商列表
}
