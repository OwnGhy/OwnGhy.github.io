<template>
    <div class="hobby-container">
        <div class="box">
            <div class="content"></div>
        </div>
    </div>
</template>
<script>

</script>
<style lang="less">
    .hobby-container {
        margin-top: 65px;
        padding: 0 12px 20px;

        .box {
            position: relative;
            width: 100px;
            height: 200px;
            display: flex;
            align-content: center;
            align-items: center;

            .content {
                height: 100%;
                width: 100%;
                background: #fff;
                z-index: 2;
            }

            &:before {
                content: '';
                position: absolute;
                height: 100%;
                width: 100%;
                background: linear-gradient(to right, @colorPrimary, darkolivegreen);
                z-index: 1;
                top: -2px;
                left: -2px;
                right: -2px;
                bottom: -2px;
                transform: skew(3deg, 3deg);
                transition: .5s;
            }
        }
    }
</style>