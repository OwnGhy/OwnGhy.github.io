<template>
    <nav>
        <ul class="navigation">
            <li class="navigation-item" v-for="nav in navs" :key="nav.key">
                <router-link :to="nav.to || '#'">
                    <svg class="icon" aria-hidden="true">
                        <use :xlink:href="nav.icon"></use>
                    </svg>
                    {{nav.title}}
                    <ul class="navigation-dropdown" v-if="nav.children && nav.children.length">
                        <li class="navigation-dropdown-item" v-for="dropdown in nav.children" :key="dropdown.key" @click="jumpTo(dropdown.url)">
                            {{dropdown.title}}
                        </li>
                    </ul>
                </router-link>
            </li>
            <span class="navigation-extra">
                <slot></slot>
            </span>
        </ul>
    </nav>
</template>
<script>
    export default {
        name: 'navigation',
        props: {
            // 属性值：{ title: '名字', key: '唯一标示key', icon: 'icon名字' }
            navs: {
                type: Array
            }
        },
        methods: {
            jumpTo(url) {
                window.open(url);
            }
        }
    }
</script>
<style lang="less">
    nav {
        background: rgba(40, 42, 44, 0.9);
        .navigation {
            width: 1110px;
            height: 45px;
            margin: 0 auto;
            padding-left: 0;

            list-style: none;

            .navigation-item {
                color: #fff;
                font-size: 14px;
                font-family: Pudding;
                line-height: 45px;

                float: left;
                height: 45px;
                box-sizing: border-box;

                transition: background-color .3s ease-in;

                position: relative;

                &:hover {
                    background-color: rgba(111, 111, 111, .5);
                    .navigation-dropdown {
                        display: block;
                    }
                }

                .icon {
                    width: 28px;
                    height: 28px;
                    vertical-align: middle;
                }

                a {
                    display: block;
                    color: #fff;
                    padding: 0 12px;
                    text-decoration: none;
                    height: 45px;
                }

                .navigation-dropdown {
                    position: absolute;
                    left: 0;
                    top: 100%;
                    display: none;
                    min-width: 100%;
                    padding: 0;
                    list-style: none;
                    background: rgba(40, 42, 44, 0.9);

                    overflow: hidden;

                    .navigation-dropdown-item {
                        padding: 0 12px;

                        white-space: nowrap;
                        line-height: 45px;

                        &:hover {
                            background-color: rgba(111, 111, 111, .5);
                        }
                    }
                }
            }

            .navigation-extra {
                line-height: 45px;
                float: right;
            }
        }
    }

    @media screen and (max-width: 1120px){
        nav {
            .navigation {
                width: 780px;
                .navigation-item {
                    .icon {
                        display: none;
                    }
                }
            }
        }
    }
    @media screen and (max-width: 800px){
        nav {
            .navigation {
                width: 94%;
                .navigation-item {
                    .icon {
                        display: none;
                    }
                }
            }
        }
    }
</style>