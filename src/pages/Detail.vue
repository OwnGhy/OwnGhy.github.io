<template>
    <div class="detail-container">
        <left-right-layout affix="">
            <div slot="left">
                <div class="card">
                    <div v-if="detail" class="markdown-container" v-html="detail.content"></div>
                </div>
                <div id="comment-wrap"></div>
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

                // 初始化 gitalk
                const gitalk = new Gitalk({
                    clientID: '9df6ba9180805813015e',
                    clientSecret: '49ebf141c03115c93550de2dc7d70876428e7c3e',
                    repo: 'OwnGhy.github.io',
                    owner: 'OwnGhy',
                    admin: ['OwnGhy'],
                    id: this.detail.id,
                    distractionFreeMode: false  // Facebook-like distraction free mode
                });

                gitalk.render('comment-wrap');
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

        #comment-wrap {
            .gt-container {
                .gt-meta {
                    .gt-counts {
                        .gt-link-counts {
                            color: @colorPrimary;
                            border-bottom-color: @colorPrimary;
                        }
                    }
                    .gt-popup {
                        .gt-action {
                            color: @colorPrimary;
                            
                            &.is--active {
                                color: #333;
                            }

                            &.is--active:before {
                                background-color: @colorPrimary;
                            }
                        }

                        .gt-copyright .gt-link-project {
                            color: @colorPrimary;
                            border-bottom-color: @colorPrimary;
                        }
                    }
                }

                .gt-header {
                    .gt-header-comment {
                        .gt-header-controls {
                            .gt-header-controls-tip {
                                color: @colorPrimary;
                                .gt-svg {
                                    svg {
                                        fill: @colorPrimary;
                                    }
                                }
                            }
                            .gt-btn-public, .gt-btn-login {
                                background-color: @colorPrimary;
                                border-color: @colorPrimary;
                            }
                            .gt-btn-preview {
                                color: @colorPrimary;
                                border-color: @colorPrimary;
                            }
                        }
                    }
                }

                .gt-comments {
                    .gt-comment-content {
                        .gt-comment-header {
                            .gt-comment-username {
                                color: @colorPrimary;
                            }

                            .gt-comment-reply, .gt-comment-like, .gt-comment-edit {
                                .gt-svg {
                                    svg {
                                        fill: @colorPrimary;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
</style>