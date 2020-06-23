import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  // {
  //   path: '/',
  //   component: Layout,
  //   redirect: '/dashboard',
  //   children: [{
  //     path: 'dashboard',
  //     name: 'Dashboard',
  //     component: () => import('@/views/dashboard/index'),
  //     meta: { title: 'Dashboard', icon: 'dashboard' }
  //   }]
  // },

  {
    path: '/',
    redirect: '/operate/adList'
  },

  {
    path: '/operate',
    component: Layout,
    redirect: '/operate/adList',
    name: 'Operate',
    meta: { title: '运营', icon: 'example' },
    children: [
      {
        path: 'adList',
        name: 'AdList',
        component: () => import('@/views/operate/ad/adList'),
        meta: { title: '广告配置' }
      },
      {
        path: 'show',
        name: 'Show',
        component: () => import('@/views/operate/shopwindow/index'),
        meta: { title: '橱窗配置' },
        redirect: '/operate/show/list',
        children: [
          {
            path: 'list',
            name: 'ShowList',
            hidden: true,
            meta: { activeMenu: '/operate/show', title: '橱窗配置', breadcrumb: false },
            component: () => import('@/views/operate/shopwindow/shopList')
          },
          {
            path: 'config',
            name: 'ConfigGoods',
            hidden: true,
            component: () => import('@/views/operate/shopwindow/configList'),
            meta: { title: '配置商品' }
          }
        ]
      }
    ]
  },

  {
    path: '/management',
    component: Layout,
    redirect: '/management/userList',
    name: 'Management',
    meta: { title: '管理', icon: 'example' },
    children: [
      // {
      //   path: 'userList',
      //   name: 'UserList',
      //   component: () => import('@/views/management/user/userList'),
      //   meta: { title: '用户管理' }
      // },
      {
        path: 'categoryList',
        name: 'categoryList',
        component: () => import('@/views/management/category/categoryList'),
        meta: { title: '类别管理' }
      },
      // {
      //   path: 'orderList',
      //   name: 'OrderList',
      //   component: () => import('@/views/management/order/orderList'),
      //   meta: { title: '订单管理' }
      // },
      {
        path: 'goods',
        name: 'Goods',
        component: () => import('@/views/management/goods/index'),
        meta: { title: '商品管理' },
        redirect: '/management/goods/list',
        children: [
          {
            path: 'list',
            name: 'GoodsList',
            hidden: true,
            meta: { activeMenu: '/management/goods', title: '商品管理', breadcrumb: false },
            component: () => import('@/views/management/goods/goodsList')
          },
          {
            path: 'skuAudit',
            name: 'GoodsSkuAudit',
            hidden: true,
            meta: { activeMenu: '/management/goods', title: 'sku编辑' },
            component: () => import('@/views/management/goods/skuAudit.vue')
          },
          {
            path: 'spuAudit',
            name: 'GoodsSpuAudit',
            hidden: true,
            meta: { activeMenu: '/management/goods', title: 'spu编辑', hiddenTags: true },
            component: () => import('@/views/management/goods/spuAudit.vue')
          }
        ]
      }
      // {
      //   path: 'newsList',
      //   name: 'NewsList',
      //   component: () => import('@/views/management/news/newsList'),
      //   meta: { title: '消息管理' }
      // }
    ]
  },
  // {
  //   path: '/set',
  //   component: Layout,
  //   redirect: '/set/platform',
  //   name: 'Example',
  //   meta: { title: '设置', icon: 'example' },
  //   alwaysShow: true,
  //   children: [
  //     {
  //       path: 'platformList',
  //       name: 'Platform',
  //       component: () => import('@/views/set/platform/platformList'),
  //       meta: { title: '平台信息' }
  //     }
  //   ]
  // },

  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
