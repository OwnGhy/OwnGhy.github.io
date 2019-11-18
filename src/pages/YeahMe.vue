<template>
    <home-layout>
        <div slot="content" class="card markdown-container" v-html="yeahmeMd"></div>
    </home-layout>
</template>
<script>
    import marked from 'marked';
    import yeahme from '@assets/yeahme.md';

    const HomeLayout = () => import(/* webpackChunkName: "home-layout" */'./../layouts/HomeLayout.vue');

    marked.setOptions({
        gfm: true,
        tables: true,
        breaks: false,
        pedantic: false,
        sanitize: false,
        smartLists: true,
        smartypants: false
    });

    export default {
        name: 'yeah-me',
        components: {
            HomeLayout
        },
        computed: {
            yeahmeMd() {
                return marked(yeahme);
            }
        },
        mounted() {
            this.$nextTick(() => {
                document.getElementById('main').scrollIntoView();
            });
        }
    }
</script>