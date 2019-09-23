<template>
    <div class="overview">
        <div class="catch-me">
            <img id="catch-pic" :src="catchImg" />
            <p class="catch-label">Can you catch me?</p>
            <div class="catch-wrap">
                <a target="_blank" class="catch-item" v-for="c in this.catch" :key="c.icon" :data-tip="c.tip" :href="c.url">
                    <svg class="icon" aria-hidden="true">
                        <use :xlink:href="`#icon-${c.icon}`"></use>
                    </svg>
                </a>
            </div>
        </div>
        <div class="blog-count">
            <div class="count-item">
                <p>文章</p>
                <span>{{countBlog}}</span>
            </div>
            <div class="count-item cate-item">
                <p><router-link to="/category">分类</router-link></p>
                <span><router-link to="/category">{{countCategory}}</router-link></span>
            </div>
        </div>
    </div>
</template>
<script>
    import catchme from '@assets/pages/catch.png';

    export default {
        name: 'overview',
        computed: {
            countBlog() {
                return this.$store.state.countBlog
            },
            countCategory() {
                return this.$store.state.countCategory
            }
        },
        data() {
            return {
                catchImg: '',
                catch: [
                    {
                        name: 'Github',
                        icon: 'github',
                        tip: 'Github',
                        url: 'https://github.com/OwnGhy'
                    },
                    {
                        name: '微博',
                        icon: 'weibo',
                        tip: '微博',
                        url: 'https://weibo.com/3211313701/profile?topnav=1&wvr=6&is_all=1'
                    },
                    {
                        name: 'Email',
                        icon: 'email',
                        tip: 'Email me!',
                        url: 'mailto:guohy7@gmail.com'
                    }
                ]
            }
        },
        mounted() {
            this.catchImg = catchme;
        }
    }
</script>

<style lang="less">
    .overview {
        .catch-me {
            #catch-pic {
                background: @colorPrimary;
                width: 100%;
                height: 148px;
                margin-bottom: 6px;
            }
            .catch-label {
                color: #555;
                font-size: 14px;
                font-weight: 700;
                text-align: center;
                margin: 0 0 6px;
            }

            .catch-wrap {
                text-align: center;
                .catch-item {
                    position: relative;
                    display: inline-block;
                    width: 28px;
                    height: 28px;
                    margin-right: 12px;

                    &:last-child {
                        margin-right: 0;
                    }
                    .icon {
                        width: 28px;
                        height: 28px;
                        vertical-align: middle;
                        fill: rgba(0,0,0,.6);
                    }

                    &:after {
                        content: attr(data-tip);
                        padding: 3px 10px;
                        pointer-events: none;

                        color: #fff;
                        font-size: 12px;
                        line-height: 24px;
                        white-space: nowrap;
                        background-color: rgba(102, 102, 102, .9);
                        border-radius: @borderRadius;

                        position: absolute;
                        left: 50%;
                        transform: translate(-50%,14px);
                        opacity: 0;

                        transition: all .1s ease-in;
                    }

                    &:before {
                        content: '';
                        border: 6px solid transparent;
                        border-top: 9px solid #666;
                        pointer-events: none;

                        position: absolute;
                        left: 50%;
                        transform: translate(-50%,43px);
                        opacity: 0;

                        transition: all .1s ease-in;
                    }

                    &:hover {
                        &:after {
                            transform: translate(-50%,-40px);
                            opacity: 1;
                        }

                        &:before {
                            transform: translate(-50%,-11px);
                            opacity: 1;
                        }
                    }
                }
            }
        }
        .blog-count {
            text-align: center;
            margin-top: 16px;
            .count-item {
                width: 48%;
                padding: 8px 8px 6px;
                display: inline-block;
                box-sizing: border-box;

                color: #555;
                font-size: 14px;
                font-weight: 700;
                line-height: 18px;


                &.cate-item {
                    a {
                        color: #555;
                        text-decoration: none;
                    }
                    &:hover {
                        a {
                            color: @colorPrimary;
                        }
                    }
                }

                &:first-child {
                    border-right: 1px solid #ccc;
                }

                > p {
                    margin: 0 0 8px;
                }
            }
        }
    }
</style>