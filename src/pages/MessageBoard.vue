<template>
    <home-layout>
        <div slot="content" class="card" id="comment-wrap">

        </div>
    </home-layout>
</template>
<script>
    const HomeLayout = () => import(/* webpackChunkName: "home-layout" */'./../layouts/HomeLayout.vue');

    export default {
        name: 'message_board',
        components: {
            HomeLayout
        },
        mounted() {
            setTimeout(() => {
                // 初始化 gitalk
                const gitalk = new Gitalk({
                    clientID: '9df6ba9180805813015e',
                    clientSecret: '49ebf141c03115c93550de2dc7d70876428e7c3e',
                    repo: 'OwnGhy.github.io',
                    owner: 'OwnGhy',
                    admin: ['OwnGhy'],
                    id: 'MessageBoard',
                    distractionFreeMode: false  // Facebook-like distraction free mode
                });

                gitalk.render('comment-wrap');
            }, 1000);
        }
    }
</script>