<template>
    <div class="container">
        <header>
            <div class="brand-wrapper">
                <img id="brand-img" />
                <div class="brand">
                    <h1>Sycamore</h1>
                </div>
            </div>
            <div class="author-wrapper">
                <img id="avatar" />
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
    import brand from '@assets/swim.jpg';
    import avatar from '@assets/avatar.jpeg';
    import catchme from '@assets/pages/catch.png';

    const LeftRightLayout = () => import(/* webpackChunkName: "left-right-layout" */'./LeftRightLayout.vue');
    const Overview = () => import(/* webpackChunkName: "overview" */'./../components/Overview.vue');

    export default {
        name: 'home-layout',
        components: {
            LeftRightLayout,
            Overview
        },
        mounted() {
            window.onload = () => {
                const brandImg = document.getElementById('brand-img');
                const avatarImg = document.getElementById('avatar');
                const catchImg = document.getElementById('catch-pic');

                if (brandImg) {
                    brandImg.setAttribute('src', brand);
                }

                if (avatarImg) {
                    avatarImg.setAttribute('src', avatar);
                }

                if (catchImg) {
                    catchImg.setAttribute('src', catchme);
                }
            }
        }
    }
</script>
<style lang="less">
    .container {
        .brand-wrapper {
            height: 580px;
            width: 100%;
            background: @colorPrimary;
            position: relative;
            z-index: 1;

            #brand-img {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 1;
            }

            .brand {
                z-index: 2;
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
            position: relative;
            z-index: 2;
            width: 1110px;
            padding: 30px;
            margin: -120px auto 0;
            box-sizing: border-box;
            text-align: center;
            border-radius: @borderRadius;
            background: rgba(255, 255, 255, .5);

            #avatar {
                width: 80px;
                height: 80px;

                border-radius: 50%;
                background: @colorPrimary;
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