export default [
    {
        path: '/about/',
        component: require('./pages/about.vue')
    },
    {
        path: '/form/',
        component: require('./pages/form.vue')
    },
    {
        path: '/dynamic-route/blog/:blogId/post/:postId/',
        component: require('./pages/dynamic-route.vue')
    },
    {
        path: '/users/',
        component: require('./pages/select-user.vue')
    },
    {
        path: '/password/',
        component: require('./pages/input-password.vue')
    },
    {
        path: '/main/',
        component: require('./app.vue')
    },
    {
        path: '/tables/',
        component: require('./pages/tables.vue')
    }
]