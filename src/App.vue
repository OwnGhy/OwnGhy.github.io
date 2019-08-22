<template>
    <div id="app">
        <header-auto-up-down>
            <navigation :navs="navs">
                <!--<svg class="icon search-icon" aria-hidden="true">-->
                    <!--<use xlink:href="#icon-search"></use>-->
                <!--</svg>-->
            </navigation>
        </header-auto-up-down>
        <router-view></router-view>
    </div>
</template>
<script>
    import HeaderAutoUpDown from './components/HeaderAutoUpDown.vue';
    import Navigation from './components/Navigation.vue';

    export default {
        components: {
            HeaderAutoUpDown,
            Navigation
        },
        data() {
            return {
                navs: [
                    {
                        title: '首页',
                        key: 'home',
                        icon: '#icon-home',
                        to: '/home'
                    },
                    {
                        title: '时间轴',
                        key: 'calendar',
                        icon: '#icon-calendar',
                        to: '/timeline'
                    },
                    {
                        title: '代码',
                        key: 'code',
                        icon: '#icon-robot',
                        children: [
                            {
                                title: 'vue-fun-loading',
                                key: 'vue-fun-loading',
                                url: 'https://github.com/OwnGhy/vue-fun-loading'
                            },
                            {
                                title: 'md-info-generator',
                                key: 'md-info-generator',
                                url: 'https://github.com/OwnGhy/md-info-generator'
                            }
                        ]
                    },
                    // {
                    //     title: '生活小记',
                    //     key: 'hobby',
                    //     icon: '#icon-find',
                    //     to: '/hobby'
                    // },
                    // {
                    //     title: '友链',
                    //     key: 'friends',
                    //     icon: '#icon-collect'
                    // },
                    {
                        title: '耶！我',
                        key: 'me',
                        icon: '#icon-person',
                        to: '/yeah-me'
                    }
                ],
                currentTop: 0,
                previousTop: 0,
                scrollDelta: 10,
                scrollOffset: 200,
                isScroll: false
            }
        },
        mounted() {
            this.$store.dispatch('getAllBlogContent');

            window.addEventListener('scroll', (e) => {
                if (!this.isScroll) {
                    this.isScroll = true;
                    (window.requestAnimationFrame)
                        ? requestAnimationFrame(this.autoHideHeader)
                        : setTimeout(this.autoHideHeader, 250);
                }
                this.autoFixSidebar(e);
            });
        },
        methods: {
            autoHideHeader() {
                const header = document.getElementById('header-auto-up-down');


                this.currentTop = document.documentElement.scrollTop;

                if (this.previousTop >= this.currentTop) {
                    if (this.previousTop - this.currentTop >= this.scrollDelta) {
                        header.className = 'header-auto-up-down';
                    }
                } else {
                    if (this.currentTop - this.previousTop >= this.scrollDelta && this.currentTop > this.scrollOffset) {
                        header.className = 'header-auto-up-down is-hide';
                    }
                }

                this.previousTop = this.currentTop;
                this.isScroll = false;
            },
            autoFixSidebar(e) {
                const sidebar = document.querySelector('.sidebar-inner');

                if (document.documentElement.scrollTop > sidebar.dataset.affix) {
                    sidebar.setAttribute('class', 'sidebar-inner card affix');
                } else {
                    sidebar.setAttribute('class', 'sidebar-inner card');
                }
            }
        }
    }
</script>
<style lang="less">
    .search-icon {
        width: 20px;
        height: 20px;
        vertical-align: middle;
        fill: rgb(100, 237, 172);
    }
</style>