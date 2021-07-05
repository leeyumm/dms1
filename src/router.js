import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routes = [
    {
        path: '',//一级router-view组件默认显示的组件
        redirect: '/login',
    },
    {
        path: '/login',//一级router-view组件默认显示的组件
        component: () => import('./views/LoginLayout'),
        meta: {
            title: '大数据分析平台-登录',
            show:true
        }
    },
    {
        path: '/home',
        component: () => import('./views/MainLayout'),
        children: [
            {
                path: '',
                component: () => import('./views/PageDevComprehensiveAnalysis.vue'),
                meta: {
                    title: '综合分析'
                }
            },
            {
                path: '/realtime',
                component: () => import('./views/PageHomeLayout.vue'),
                meta: {
                    title: '实时采集'
                }
            },
            {
                path:'/dev-category-analysis',
                component: () => import('./views/PageDevCategoryAnalysis.vue'),
                meta:{
                    title:'仪器分类评价'
                }
            },   
            {
                path:'/col-info',
                component:() => import('./views/PageColInfoLayout.vue'),
                meta: {
                    title:'采集记录'
                }
            },
            {
                path:'/follow-up',
                component:() => import('./views/PageDevFollowUpEval.vue'),
                meta:{
                    title:'追踪评价结果'
                }
            },
            {
                path:'/maintenance',
                component:() => import('./views/PageDevMaintenanceEval.vue'),
                meta:{
                    title:'维保售后评价'
                }
            },
            {
                path:'/economic',
                component:() => import('./views/PageDevEconomicEval.vue')
            }
        ]
    }
]

const router = new Router({
    routes
})

router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title = to.meta.title
    }
    next()
})

export default router