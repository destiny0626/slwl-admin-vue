import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { Loading } from 'element-ui'
import db from '@/utils/localstorage'
import Cookies from 'js-cookie'
import store from '@/store/index'
// import { getRouter } from '@/api/login.js'
import { getRouter } from '@/api/login.js'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */

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
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index'),
        meta: { title: '?????????', icon: 'dashboard', navShow: false }
      }
    ]
  },
  {
    path: '/business',
    component: Layout,
    redirect: '/business/list',
    name: 'business',
    meta: {
      title: '????????????',
      icon: 'form'
    },
    children: [
      {
        path: 'order-manage',
        component: () => import('@/views/order-manage/list'),
        name: 'order-manage',
        meta: { title: '????????????', noCache: true }
      },
      {
        path: 'edit-order',
        component: () => import('@/views/order-manage/edit-order'),
        name: 'edit-order',
        hidden: true,
        meta: { title: '????????????', noCache: true, pageHeader: true }
      }
    ]
  },
  {
    path: '/business',
    component: Layout,
    redirect: '/business/list',
    name: 'business',
    meta: {
      title: '????????????',
      icon: 'form'
    },
    children: [
      {
        path: 'waybill',
        component: () => import('@/views/waybill/list'),
        name: 'waybill',
        meta: { title: '????????????', noCache: true }
      },
      {
        path: 'waybill-detail',
        component: () => import('@/views/waybill/waybill-detail'),
        hidden: true,
        name: 'waybill-detail',
        meta: { title: '????????????', noCache: true, pageHeader: true }
      }
    ]
  },
  {
    path: '/branches',
    component: Layout,
    redirect: '/branches/operational',
    name: 'branches',
    meta: {
      title: '????????????',
      icon: 'form'
    },
    children: [
      {
        path: 'organization-manage',
        component: () => import('@/views/branches/organization-manage'),
        name: 'organization-manage',
        meta: { title: '????????????', noCache: true }
      },
      {
        path: 'operational',
        component: () => import('@/views/branches/operational'),
        name: 'operational',
        meta: { title: '??????????????????', noCache: true }
      },
      {
        path: 'pickUptask',
        component: () => import('@/views/branches/components/pickup-task'),
        name: 'operational',
        meta: { title: '??????????????????', noCache: true }
      },
      {
        path: 'dispatchTask',
        component: () => import('@/views/branches/components/dispatch-task'),
        name: 'operational',
        meta: { title: '??????????????????', noCache: true }
      },
      {
        path: 'MapContent',
        component: () => import('@/views/branches/components/MapContent'),
        name: 'MapContent',
        hidden: true,
        meta: { title: '??????????????????', noCache: true, pageHeader: true }
      },
      {
        path: 'operational-range',
        component: () => import('@/views/branches/operational-range'),
        name: 'operational-range',
        meta: { title: '???????????????', noCache: true }
      },
      // {
      //   path: 'goods-type',
      //   component: () => import('@/views/branches/goods-type'),
      //   name: 'goods-type',
      //   meta: { title: '??????????????????', noCache: true }
      // },
      {
        path: 'institutions-jobs-area',
        component: () => import('@/views/branches/institutions-jobs-area'),
        name: 'institutions-jobs-area',
        meta: { title: '??????????????????', noCache: true }
      }
    ]
  },
  {
    path: '/transit',
    component: Layout,
    redirect: '/transit/car-models',
    name: 'transit',
    meta: {
      title: '????????????',
      icon: 'form'
    },
    children: [
      {
        path: 'workArrange-manage',
        component: () => import('@/views/transit/workArrange-manage'),
        name: 'workArrange-manage',
        meta: { title: '????????????', noCache: true }
      },
      {
        path: 'workArrange-setting',
        component: () => import('@/views/transit/workArrange-setting'),
        name: 'workArrange-setting',
        hidden: true,
        meta: { title: '????????????', noCache: true, pageHeader: true }
      },
      {
        path: 'freight-manage',
        component: () => import('@/views/transit/freight-manage'),
        name: 'freight-manage',
        meta: { title: '????????????', noCache: true }
      },
      {
        path: 'car-models',
        component: () => import('@/views/transit/car-models'),
        name: 'car-models',
        meta: { title: '????????????', noCache: true }
      },
      {
        path: 'driver',
        component: () => import('@/views/transit/driver'),
        name: 'driver',
        meta: { title: '????????????', noCache: true }
      },
      {
        path: 'driver-detail',
        component: () => import('@/views/transit/driver-detail'),
        name: 'driver-detail',
        hidden: true,
        meta: { title: '????????????', noCache: true, pageHeader: true }
      },
      {
        path: 'vehicle',
        component: () => import('@/views/transit/vehicle'),
        name: 'vehicle',
        meta: { title: '????????????', noCache: true }
      },
      {
        path: 'vehicle-detail',
        component: () => import('@/views/transit/vehicle-detail'),
        name: 'vehicle-detail',
        hidden: true,
        meta: { title: '????????????', noCache: true, pageHeader: true }
      },
      {
        path: 'car-register',
        component: () => import('@/views/transit/car-register'),
        name: 'car-register',
        meta: { title: '????????????', noCache: true }
      },
      {
        path: 'car-register-info',
        component: () => import('@/views/transit/car-register-info'),
        name: 'car-register',
        meta: { title: '????????????', noCache: true, pageHeader: true }
      }
    ]
  },
  {
    path: '/transport',
    component: Layout,
    redirect: '/transport/transport-task',
    name: 'transport',
    meta: {
      title: '????????????',
      icon: 'form'
    },
    children: [
      {
        path: 'transport-task',
        component: () => import('@/views/transport/transport-task'),
        name: 'transport-task',
        meta: { title: '??????????????????', noCache: true }
      },
      {
        path: 'task-detail',
        component: () => import('@/views/transport/task-detail'),
        name: 'task-detail',
        hidden: true,
        meta: { title: '??????????????????', noCache: true, pageHeader: true }
      },
      {
        path: 'line-manage',
        component: () => import('@/views/transit/line-manage'),
        name: 'line-manage',
        meta: { title: '????????????', noCache: true }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]
const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: (to, from, savedPosition) => {
      return { y: 0, x: 0 }
    },
    routes: constantRoutes
  })

const router = createRouter()
// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}
let asyncRouter
const whiteList = ['/login']
function go(to, next) {
  next()
}

export const view = path => {
  return resolve => require([`@/views/${path}.vue`], resolve)
}

function save(name, data) {
  localStorage.setItem(name, JSON.stringify(data))
}

function get(name) {
  return JSON.parse(localStorage.getItem(name))
}
// ?????????????????????????????????
router.beforeEach((to, from, next) => {
  NProgress.start()
  document.documentElement.scrollTop = 0
  console.dir(document.documentElement, 'document.documentElement')
  if (whiteList.indexOf(to.path) !== -1) {
    next()
  } else {
    const token = Cookies.get('TOKEN')
    const user = db.get('USER')
    const userRouter = get('USER_ROUTER')
    const iconList = [
      require('@/assets/navIcons/gzt.png'),
      require('@/assets/navIcons/jcsj.png'),
      require('@/assets/navIcons/clgl.png'),
      require('@/assets/navIcons/yggl.png'),
      require('@/assets/navIcons/ywgl.png'),
      require('@/assets/navIcons/ddgl.png')
    ]

    if (token && user) {
      if (!asyncRouter) {
        if (!userRouter) {
          getRouter({}).then(response => {
            const res = response.data
            asyncRouter = res.map((res, index) => {
              return Object.assign({}, res, { icon: iconList[index] })
            })
            store.commit('account/setRoutes', asyncRouter)
            save('USER_ROUTER', asyncRouter)
            go(to, next)
          })
          // go(to, next)
        } else {
          asyncRouter = userRouter
          go(to, next)
        }
      } else {
        const options = {
          lock: true,
          // text: '???????????????...',
          // spinner: 'el-icon-loading',
          background: 'rgba(255, 255, 255, 0.8)'
        }
        const loadingInstance = Loading.service(options)
        const origin = window.location.protocol + '//' + window.location.host
        if (to.path === '/dashboard') {
          // http://localhost:9528/
          // http://pinda.itheima.net
          // next('/myiframe/iframe?urlPath&src=http://localhost:9528/#/forpinda')
          // next('/myiframe/iframe?urlPath&src=http://localhost:8080/#/forpinda')
          next()
          setTimeout(() => {
            loadingInstance.close()
          }, 600)
        }
        next()
        setTimeout(() => {
          loadingInstance.close()
        }, 600)
      }
    } else {
      if (to.path === '/login') {
        next()
      } else {
        next('/login')
      }
    }
  }
})

router.afterEach(() => {
  NProgress.done()

  // next()
})
export default router
