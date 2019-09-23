<template>
    <home-layout>
        <div slot="content" class="friends-container card">
            <div class="friends-wrapper">
                <a v-for="f in friends" class="friends-item" :href="f.site" target="_blank">
                    <img :src="f.avatar" class="friends-avatar" />
                    <div class="friends-text">
                        <span class="friends-name">{{f.name}}</span>
                        <p class="friends-motto">{{f.motto}}</p>
                    </div>
                </a>
            </div>

            <p class="friends-extra">新胖友们，请到<router-link to="/message">留言板</router-link>备注信息哟～</p>
        </div>
    </home-layout>
</template>
<script>
    import wangzi from '@assets/friends/wangzi.jpeg';

    const HomeLayout = () => import(/* webpackChunkName: "home-layout" */'./../layouts/HomeLayout.vue');

    export default {
        name: 'friends',
        components: {
            HomeLayout
        },
        mounted() {
            setTimeout(() => {
                document.getElementById('main').scrollIntoView();
            }, 300);
        },
        data() {
            return {
                friends: [
                    {
                        name: '怡潼',
                        site: 'https://minemine.cc/',
                        motto: 'Write something for my love！',
                        avatar: 'https://i.loli.net/2019/04/28/5cc57985cee35.jpg'
                    },
                    {
                        name: 'zlion',
                        site: 'https://zlion.site/',
                        motto: 'Talk is cheap, show me your code!',
                        avatar: 'https://avatars3.githubusercontent.com/u/11694477?s=460&v=4'
                    },
                    {
                        name: '见字如面',
                        site: 'https://hiwannz.com/',
                        motto: '别再说话，你别烦我',
                        avatar: wangzi
                    },
                    {
                        name: 'xibaXIBAxibaba',
                        site: 'https://ohiamfine.github.io/',
                        motto: 'Hurry | Coding',
                        avatar: 'https://avatars1.githubusercontent.com/u/10390004?s=460&v=4'
                    }
                ]
            };
        }
    }
</script>
<style lang="less">
    .friends-container {
        .friends-wrapper {
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            .friends-item {
                text-decoration: none;
                color: #555;
                display: flex;
                width: 48%;
                padding: 16px;
                box-sizing: border-box;
                border-radius: 4px;
                transition: background-color .3s ease-in;

                &:hover {
                    background-color: #f2f6f5;
                }

                .friends-avatar {
                    border-radius: 50%;
                    width: 50px;
                    height: 50px;
                    margin-right: 12px;
                }

                .friends-text {
                    flex: 1;
                    .friends-name {
                        font-size: 16px;
                        font-weight: 500;
                    }
                    .friends-motto {
                        font-size: 14px;
                        color: #999;
                        margin: 8px 0 0;
                    }
                }
            }
        }

        .friends-extra {
            text-align: center;
            margin: 16px 0 0;
            color: #555;
        }
    }
</style>