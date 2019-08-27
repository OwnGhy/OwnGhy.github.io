<template>
    <div class="detail-container">
        <left-right-layout affix="">
            <div slot="left" class="card">
                <div v-if="detail" class="markdown-container" v-html="detail.content"></div>
            </div>
            <div class="toc" slot="right" v-if="detail" v-html="detail.tocHtml"></div>
        </left-right-layout>
    </div>

</template>
<script>
    import { formatByMarked } from '@utils/tools';
    const LeftRightLayout = () => import(/* webpackChunkName: "left-right-layout" */'./../layouts/LeftRightLayout.vue');

    export default {
        name: 'detail',
        components: {
            LeftRightLayout
        },
        data() {
            return {
                detail: {}
            }
        },
        methods: {
            async getDetail(path) {
                let md = await import(/* webpackChunkName: "publisher-[request]" */`./../../publishers/${path.split('/publishers/')[1]}`);

                return formatByMarked(md.default);
            }
        },
        mounted() {
            window.addEventListener('click', (e) => {
                if (e.target.className === 'anchor-item') {
                    document.getElementById(e.target.dataset.id).scrollIntoView();
                }
            });

            document.documentElement.scrollTop = 0;

            let detail = this.$store.state.blogWithContent.find(b => b.id === this.$route.params.id);

            this.getDetail(detail.path).then((res) => {
                this.detail = {
                    ...detail,
                    ...res
                };
            });
        }
    }
</script>
<style lang="less">
    .detail-container {
        margin-top: 45px;

        .toc {
            ul {
                padding-left: 20px;
                margin: 0;
                a {
                    text-decoration: none;
                    color: #555;
                    font-size: 14px;
                }
            }
        }
    }
</style>