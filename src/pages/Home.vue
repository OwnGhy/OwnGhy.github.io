<template>
    <home-layout>
        <div slot="content">
            <div v-for="b in blogsConfig" class="blog-item card">
                <h2 class="title"><router-link :to="`/blog/${b.id}`">{{b.title}}</router-link></h2>
                <div class="info-wrap">
                    <span class="date">
                        <svg class="clock-icon" aria-hidden="true">
                            <use xlink:href="#icon-clock"></use>
                        </svg>
                        {{b.date}}
                    </span>
                    <span class="tag">
                        {{b.tags}}
                    </span>
                </div>
                <article class="preview-content markdown-container" v-html="b.content"></article>
            </div>
            <div class="pagination">
                <span @click="prev" class="pagination-op" :data-disabled="cur === 1">
                    <svg class="pagination-icon" aria-hidden="true">
                        <use xlink:href="#icon-prev"></use>
                    </svg>
                </span>
                <span class="pagination-cur">{{cur}}</span>
                <span @click="next" class="pagination-op" :data-disabled="cur === page">
                    <svg class="pagination-icon" aria-hidden="true">
                        <use xlink:href="#icon-next"></use>
                    </svg>
                </span>
                <span>共 {{page}} 页</span>
            </div>
        </div>
    </home-layout>
</template>
<script>
    const HomeLayout = () => import(/* webpackChunkName: "home-layout" */'./../layouts/HomeLayout.vue');

    export default {
        name: 'home',
        components: {
            HomeLayout
        },
        data() {
            return {
                cur: 1,
                pageSize: 10
            }
        },
        computed: {
            blogsConfig() {
                return this.$store.state.blogWithContent.slice((this.cur - 1) * this.pageSize, this.cur * this.pageSize)
            },
            page() {
                return Math.ceil(this.$store.state.blogWithContent.length / this.pageSize)
            }
        },
        mounted() {
            this.$nextTick(() => {
                document.getElementById('main').scrollIntoView();
            });
        },
        methods: {
            prev() {
                if (this.cur === 1) return;
                this.cur = this.cur - 1;
                document.getElementById('main').scrollIntoView();
            },
            next() {
                if (this.cur === this.page) return;
                this.cur = this.cur + 1;
                document.getElementById('main').scrollIntoView();
            }
        }
    }
</script>
<style lang="less">
    .blog-item {
        margin-bottom: 20px;
        .title {
            text-align: center;
            margin: 0 0 12px;
            a {
                text-decoration: none;
            }
        }
        .info-wrap {
            color: #555;
            font-size: 14px;
            text-align: center;
            .date {
                .clock-icon {
                    width: 16px;
                    height: 16px;
                    vertical-align: middle;
                    fill: @colorPrimary;
                }
            }
        }
        .preview-content {
            :nth-child(n+6):nth-child(n){
                display: none;
            }
        }
    }

    .pagination {
        text-align: center;
        color: #555555;

        .pagination-op {
            cursor: pointer;
            &[data-disabled="true"] {
                cursor: not-allowed;
            }
        }

        .pagination-icon {
            width: 22px;
            height: 22px;
            vertical-align: bottom;
            fill: #555;
        }
    }
</style>