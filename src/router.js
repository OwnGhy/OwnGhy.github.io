const Home = () => import(/* webpackChunkName: "home" */'./pages/Home.vue');
const Timeline = () => import(/* webpackChunkName: "Timeline" */'./pages/Timeline.vue');
// const Hobby = () => import(/* webpackChunkName: "Hobby" */'./pages/Hobby.vue');
const YeahMe = () => import(/* webpackChunkName: "YeahMe" */'./pages/YeahMe.vue');
const Detail = () => import(/* webpackChunkName: "Detail" */'./pages/Detail.vue');

export default {
    mode: 'hash',
    routes: [
        {
            path: '/',
            redirect: '/home'
        },
        {
            path: '/home',
            key: 'home',
            name: 'home',
            component: Home
        },
        {
            path: '/timeline',
            key: 'timeline',
            name: 'timeline',
            component: Timeline
        },
        // {
        //     path: '/hobby',
        //     key: 'hobby',
        //     name: 'hobby',
        //     component: Hobby
        // },
        {
            path: '/yeah-me',
            key: 'yeah-me',
            name: 'yeah-me',
            component: YeahMe
        },
        {
            path: '/blog/:id',
            key: 'detail',
            name: 'detail',
            component: Detail
        }
    ]
}