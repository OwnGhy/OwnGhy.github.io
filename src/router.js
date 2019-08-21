import Home from './pages/Home.vue';
import Timeline from './pages/Timeline.vue';
// import Hobby from './pages/Hobby.vue';
import YeahMe from './pages/YeahMe.vue';
import Detail from './pages/Detail.vue';

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