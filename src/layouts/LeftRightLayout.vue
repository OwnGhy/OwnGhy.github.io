<template>
    <main class="main">
        <div class="content">
            <slot name="left"></slot>
        </div>
        <aside class="sidebar">
            <div class="sidebar-inner card" :data-affix="affix">
                <slot name="right"></slot>
            </div>
        </aside>
    </main>
</template>
<script>
    export default {
        name: 'LeftRightLayout',
        props: ['affix']
    }
</script>
<style lang="less">
    .main {
        position: relative;
        width: 1110px;
        margin: 0 auto;
        padding-top: 20px;
        .content {
            float: left;
            width: 780px;
        }
        .sidebar {
            float: right;
            position: static;
            width: 300px;
            .sidebar-inner {
                width: 300px;
                &.affix {
                    position: fixed;
                    top: 60px;
                }
            }
        }
    }

    @media screen and (max-width: 1120px) {
        .main {
            width: 100%;
            .content {
                float: unset;
                margin: 0 auto;
            }
            .sidebar {
                display: none;
            }
        }
    }
    @media screen and (max-width: 800px) {
        .main {
            .content {
                width: 96%;
            }
        }
    }
</style>