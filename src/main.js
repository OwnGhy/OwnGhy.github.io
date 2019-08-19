import Vue from 'vue';
import VueRouter from 'vue-router';

import App from './App.vue';
import routerConfig from './router';
import store from './store';
import '@assets/iconfont/iconfont.js';

Vue.use(VueRouter);

const router = new VueRouter(
    routerConfig
);

const root = document.createElement('div')
document.body.appendChild(root)

new Vue({
    render: (h) => h(App),
    router,
    store
}).$mount(root)