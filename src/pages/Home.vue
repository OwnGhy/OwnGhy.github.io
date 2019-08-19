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
        </div>
    </home-layout>
</template>
<script>
    import HomeLayout from './../layouts/HomeLayout.vue';

    export default {
        name: 'home',
        components: {
            HomeLayout
        },
        computed: {
            blogsConfig() {
                return this.$store.state.blogWithContent
            }
        }
    }
</script>
<style lang="less">
    @import "./../variables.less";
    @import "./../global.less";
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
</style>