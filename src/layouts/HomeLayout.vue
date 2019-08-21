<template>
    <div class="container">
        <header>
            <div class="brand-wrapper">
                <div class="brand">
                    <h1>Sycamore</h1>
                </div>
            </div>
            <div class="author-wrapper">
                <div class="avatar"></div>
                <p class="motto">比你瘦的人都在努力学习，你有什么理由不减肥？</p>
            </div>
        </header>
        <left-right-layout affix="576">
            <div slot="left">
                <slot name="content" class="home-content card"></slot>
            </div>
            <div slot="right">
                <overview />
            </div>
        </left-right-layout>
    </div>
</template>
<script>
    const LeftRightLayout = () => import(/* webpackChunkName: "left-right-layout" */'./LeftRightLayout.vue');
    const Overview = () => import(/* webpackChunkName: "overview" */'./../components/Overview.vue');

    export default {
        name: 'home-layout',
        components: {
            LeftRightLayout,
            Overview
        }
    }
</script>
<style lang="less">
    @import "./../variables.less";
    @import "./../global.less";

    .container {
        .brand-wrapper {
            height: 580px;
            width: 100%;
            background: url("./../assets/swim.jpg") center 30% no-repeat;
            background-size: cover;

            .brand {
                text-align: center;
                padding: 200px 0 0;

                h1 {
                    color: #fff;
                    font-size: 72px;
                    font-family: MarkerScratch-Regular,Microsoft YaHei,sans-serif;

                    margin: 0;
                }
            }
        }

        .home-content {
        }

        .author-wrapper {
            width: 1110px;
            padding: 30px;
            margin: -140px auto 0;
            box-sizing: border-box;

            border-radius: @borderRadius;
            background: rgba(255, 255, 255, .5);

            .avatar {
                width: 80px;
                height: 80px;
                margin: auto;

                border-radius: 50%;
                background: url("./../assets/avatar.jpeg");
                background-size: cover;
            }

            .motto {
                margin: 12px 0 0;

                color: @colorPrimary;
                text-align: center;
                font-size: 20px;
                font-family: Pudding;
            }
        }
    }

    @media screen and (max-width: 1120px) {
        .container {
            .author-wrapper {
                width: 780px;
            }
        }
    }
    @media screen and (max-width: 800px) {
        .container {
            .author-wrapper {
                width: 94%;
            }
        }
    }
</style>