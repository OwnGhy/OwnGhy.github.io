const Home = () => import(/* webpackChunkName: "home" */'./pages/Home.vue');
const Timeline = () => import(/* webpackChunkName: "timeline" */'./pages/Timeline.vue');
const Category = () => import(/* webpackChunkName: "category" */'./pages/Category.vue');
const MessageBoard = () => import(/* webpackChunkName: "message" */'./pages/MessageBoard.vue');
const Friends = () => import(/* webpackChunkName: "friends" */'./pages/Friends.vue');
// const Hobby = () => import(/* webpackChunkName: "hobby" */'./pages/Hobby.vue');
const YeahMe = () => import(/* webpackChunkName: "yeahMe" */'./pages/YeahMe.vue');
const Detail = () => import(/* webpackChunkName: "detail" */'./pages/Detail.vue');
const Progressive = () => import(/* webpackChunkName: "detail" */'./pages/Display/Progressive.vue');

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
        {
            path: '/category',
            key: 'category',
            name: 'category',
            component: Category
        },
        {
            path: '/message',
            key: 'message',
            name: 'message',
            component: MessageBoard
        },
        {
            path: '/friends',
            key: 'friends',
            name: 'friends',
            component: Friends
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
        },
        {
            path: '/display/progressive',
            key: 'progressive',
            name: 'progressive',
            component: Progressive
        }
    ]
}