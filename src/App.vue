<template>
    <div id="app">
        <div id="back-to-top"></div>
        <header-auto-up-down>
            <navigation :navs="navs">
                <div class="search-wrap">
                    <input @keyup.enter="search" @input="filterChange" class="search-input" />
                    <span @click="search">
                        <svg class="icon search-icon" aria-hidden="true">
                        <use xlink:href="#icon-search"></use>
                    </svg>
                    </span>
                </div>
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
                filter: '',
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
                        title: '分类',
                        key: 'category',
                        icon: '#icon-book',
                        to: '/category'
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
                    {
                        title: '留言板',
                        key: 'message',
                        icon: '#icon-message',
                        to: '/message'
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
            this.$store.dispatch('getBlogContent');

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
                // scrolltop = (((t = document.documentElement) || (t = document.body.parentNode)) &&  typeof t.scrollTop == 'number' ? t : document.body).scrollTop;

                this.currentTop = document.documentElement.scrollTop || document.body.scrollTop;

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

                const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;

                if (scrollTop > sidebar.dataset.affix) {
                    sidebar.setAttribute('class', 'sidebar-inner card affix');
                } else {
                    sidebar.setAttribute('class', 'sidebar-inner card');
                }
            },
            filterChange(e) {
                this.filter = e.target.value;
            },
            search() {
                this.$router.push('/home');
                this.$store.dispatch('getBlogContent', this.filter);
                document.getElementById('main').scrollIntoView();
            }
        }
    }
</script>
<style lang="less">
    #back-to-top {
        height: 0;
        position: absolute;
        z-index: -1;
        top: -20px;
    }
    .search-wrap {
        height: 25px;
        border-bottom: 1px solid #64edac;
        margin-top: 10px;

        .search-input {
            background-color: rgba(0, 0, 0, 0);
            border: unset;
            outline: unset;
            color: #fff;
        }
        .search-icon {
            width: 20px;
            height: 20px;
            vertical-align: middle;
            fill: rgb(100, 237, 172);
        }
    }
</style>