<template>
    <div class="detail-container">
        <left-right-layout affix="">
            <div slot="left">
                <div class="card">
                    <div class="blog-title">
                        <h2 class="title">{{detail.title}}</h2>
                        <div class="info-wrap">
                            <span class="date">
                                <svg class="clock-icon" aria-hidden="true">
                                    <use xlink:href="#icon-clock"></use>
                                </svg>
                                {{detail.date}}
                            </span>
                            <span id="busuanzi_container_page_pv">
                                <span class="read-icon">
                                    阅读
                                </span>
                                <span id="busuanzi_value_page_pv"></span>
                            </span>
                            <span class="tag">
                                {{detail.tags}}
                            </span>
                        </div>
                    </div>
                    <div v-if="detail" class="markdown-container" v-html="detail.content"></div>
                </div>
                <div id="comment-wrap"></div>
                <div class="fix-tool">
                    <span @click="backToTop">
                        <svg class="back-top" aria-hidden="true">
                            <use xlink:href="#icon-top"></use>
                        </svg>
                    </span>
                    <div class="to-comment" @click="toComment">
                        <svg class="comment-icon" aria-hidden="true">
                            <use xlink:href="#icon-comment1"></use>
                        </svg>
                    </div>
                </div>
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
            },
            backToTop() {
                document.getElementById('back-to-top').scrollIntoView();
            },
            toComment() {
                document.getElementById('comment-wrap').scrollIntoView();
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

        .blog-title {
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
                    margin-right: 12px;
                }

                .read-icon {
                    color: @colorPrimary;
                }
            }
            .preview-content {
                :nth-child(n+6):nth-child(n){
                    display: none;
                }
            }
        }

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

        .fix-tool {
            position: sticky;
            bottom: 20px;
            left: calc(~'100% + 24px');
            width: 32px;
            transform: translateX(56px);

            .back-top {
                width: 32px;
                height: 32px;
                vertical-align: middle;
                fill: @colorPrimary;
                cursor: pointer;
            }

            .to-comment {
                margin-top: 12px;
                .comment-icon {
                    cursor: pointer;
                    width: 32px;
                    height: 32px;
                    vertical-align: middle;
                    fill: @colorPrimary;
                }
            }
        }
    }
</style>