export default [
    {
        path: '/about/',
        component: require('./pages/old/about.vue')
    },
    {
        path: '/form/',
        component: require('./pages/old/form.vue')
    },
    {
        path: '/dynamic-route/blog/:blogId/post/:postId/',
        component: require('./pages/old/dynamic-route.vue')
    },
    {
        path: '/users/',
        component: require('./pages/select-user.vue')
    },
    {
        path: '/halls/',
        component: require('./pages/select-halls.vue')
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
    },
    {
        path: '/free-tables/',
        component: require('./pages/free-tables.vue')
    },
    {
        path: '/guest-count/',
        component: require('./pages/guest-count.vue')
    },
    {
        path: '/add-order/',
        component: require('./pages/new-order.vue')
    }
]