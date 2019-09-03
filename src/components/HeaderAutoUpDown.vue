<template>
    <div class="header-auto-up-down" id="header-auto-up-down">
        <slot></slot>
    </div>
</template>
<script>
    export default {
        name: 'HeaderAutoUpDown'
    }
</script>
<style lang="less">
    .header-auto-up-down {
        z-index: 9;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;

        transition: transform .5s;

        &.is-hide {
            transform: translateY(-100%);
        }
    }
</style>