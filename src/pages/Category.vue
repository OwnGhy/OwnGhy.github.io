<template>
    <left-right-layout affix="576" class="category-container">
        <div slot="left" class="category-content card">
            <ul class="cate-title-wrap">
                <li class="cate-item" v-for="cate in category">
                    <span>{{cate.tag}}</span>
                    <ul class="blog-wrap">
                        <li class="blog-item" v-for="b in cate.blog">
                            <span class="blog-title"><router-link :to="`/blog/${b.id}`">{{b.title}}</router-link></span>
                            <span class="blog-date">{{b.date}}</span>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <div slot="right">
            <overview />
        </div>
    </left-right-layout>
</template>
<script>
    const Overview = () => import(/* webpackChunkName: "overview" */'./../components/Overview.vue');
    const LeftRightLayout = () => import(/* webpackChunkName: "left-right-layout" */'./../layouts/LeftRightLayout.vue');

    export default {
        name: 'category',
        components: {
            LeftRightLayout,
            Overview
        },
        computed: {
            category() {
                return this.$store.state.category
            }
        }
    }
</script>
<style lang="less">
    .category-container {
        margin-top: 45px;

        .category-content {
            .cate-title-wrap {
                list-style: none;
                .cate-item {
                    margin-bottom: 8px;
                    &:last-child {
                        margin-bottom: 0;
                    }
                    > span {
                        font-size: 18px;
                    }

                    .blog-wrap {
                        list-style: none;
                        .blog-item {
                            font-size: 14px;
                            margin-bottom: 4px;

                            &:last-child {
                                margin-bottom: 0;
                            }
                            .blog-title {
                                color: @colorPrimary;
                                a {
                                    text-decoration: none;
                                }
                            }

                            .blog-date {
                                color: #555;
                                margin-left: 8px;
                            }
                        }
                    }
                }
            }
        }
    }
</style> 