<template>
    <home-layout>
        <div slot="content">
            <div class="card message-desc">
                <p>有个同学说要来给我喊 666，所以加了个留言板，hhhhhh～😜</p>
                <p>当然，希望大家一起来讨论或者是给我提意见才是正经的～</p>
            </div>
            <div class="card" id="comment-wrap"></div>
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
            this.$nextTick(() => {
                document.getElementById('main').scrollIntoView();

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
            });
        }
    }
</script>
<style lang="less">
    .message-desc {
        margin-bottom: 20px;
        color: #555;
        font-size: 14px;
        p {
            margin-top: 0;
            margin-bottom: 16px;

            &:last-child {
                margin-bottom: 0;
            }
        }
    }
</style>