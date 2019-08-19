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
    import LeftRightLayout from './../layouts/LeftRightLayout.vue';

    export default {
        name: 'detail',
        components: {
            LeftRightLayout
        },
        computed: {
            detail() {
                return this.$store.state.blogWithContent.find(b => b.id === this.$route.params.id)
            }
        },
        mounted() {
            window.addEventListener('click', (e) => {
                if (e.target.className === 'anchor-item') {
                    document.getElementById(e.target.dataset.id).scrollIntoView();
                }
            });

            document.documentElement.scrollTop = 0;
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