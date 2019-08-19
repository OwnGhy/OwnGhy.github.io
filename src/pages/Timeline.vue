<template>
    <left-right-layout affix="576" class="timeline-container">
        <div slot="left" class="timeline-content card">
            <div class="timeline-item" v-for="i in timelineBlog">
                <p class="timeline-year">{{i.year}}</p>
                <div class="timeline-blog-info" v-for="b in i.blog">
                    <span class="date">{{getMonthDate(b.date)}}</span>
                    <span class="title"><router-link :to="`/blog/${b.id}`">{{b.title}}</router-link></span>
                    <span class="tag">{{b.tags}}</span>
                </div>
            </div>
        </div>
        <div slot="right">
            <overview />
        </div>
    </left-right-layout>
</template>
<script>
    import LeftRightLayout from './../layouts/LeftRightLayout.vue';
    import Overview from './../components/Overview.vue';
    import { getMonthDate } from "../utils/tools";

    export default {
        name: 'home',
        components: {
            LeftRightLayout,
            Overview
        },
        methods: {
            getMonthDate(date) {
                return getMonthDate(date);
            }
        },
        computed: {
            timelineBlog() {
                const originBlog = this.$store.state.blogsConfig;
                const count = this.$store.state.countBlog;

                let timelineBlog = [];

                let yearBlog = {
                    year: '',
                    blog: []
                };

                for (let i = 0; i < count; i++) {
                    let year = new Date(originBlog[i].date).getFullYear();

                    if (yearBlog.year === year) {
                        yearBlog.blog.push(originBlog[i]);
                    } else if (yearBlog.year) {
                        timelineBlog.push(yearBlog);
                        yearBlog = {
                            year,
                            blog: [originBlog[i]]
                        };
                    } else {
                        yearBlog= {
                            year,
                            blog: [originBlog[i]]
                        };
                    }
                }

                timelineBlog.push(yearBlog);

                return timelineBlog;
            }
        }
    }
</script>
<style lang="less">
    @import "./../variables.less";
    @import "./../global.less";
    .timeline-container {
        margin-top: 45px;

        .timeline-content {
            .timeline-item {
                position: relative;
                padding: 0 12px 20px;
                border-left: 2px solid #b2d3be;

                .timeline-year {
                    position: relative;
                    top: -5px;
                    margin: 0;

                    font-size: 20px;
                    font-family: Pudding;
                }

                .timeline-blog-info {
                    margin-bottom: 8px;
                    position: relative;

                    font-size: 14px;

                    .date {
                        color: #555;
                    }
                    
                    .title {
                        a {
                            text-decoration: none;
                        }
                    }

                    &:last-child {
                        margin-bottom: 0;
                    }
                }

                &:last-child {
                    padding-bottom: 12px;
                }

                &:before {
                    content: '';
                    position: absolute;
                    left: -7px;
                    width: 12px;
                    height: 12px;
                    border-radius: 50%;
                    background: @colorPrimary;
                }
            }
        }
    }
</style>