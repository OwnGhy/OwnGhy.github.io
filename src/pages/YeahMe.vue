<template>
    <home-layout>
        <div slot="content" class="card markdown-container" v-html="yeahmeMd"></div>
    </home-layout>
</template>
<script>
    import marked from 'marked';
    import HomeLayout from './../layouts/HomeLayout.vue';
    import yeahme from '@assets/yeahme.md';

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
        }
    }
</script>
<style lang="less">
    @import "./../variables.less";
    @import "./../global.less";

</style>