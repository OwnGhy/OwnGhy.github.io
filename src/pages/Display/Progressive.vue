<template>
    <div class="progressive">
        <div class="progressive-item" v-for="p in imgs">
            <p>{{p.title}}</p>
            <div class="preview-wrap">
                <img class="preview lazy" :data-src="p.url" :src="p.compressedUrl" />
            </div>
        </div>
    </div>
</template>
<script>
    import { throttle } from '@utils/tools';
    export default {
        name: 'progressive',
        data() {
            return {
                imgs: [
                    {
                        title: '路飞',
                        url: 'https://github.com/OwnGhy/Jotting/blob/master/assets/OnePiece/路飞.jpg?raw=true',
                        compressedUrl: 'https://github.com/OwnGhy/Jotting/blob/master/assets/OnePiece/路飞_r.jpg?raw=true'
                    },
                    {
                        title: '索隆',
                        url: 'https://github.com/OwnGhy/Jotting/blob/master/assets/OnePiece/索隆.jpg?raw=true',
                        compressedUrl: 'https://github.com/OwnGhy/Jotting/blob/master/assets/OnePiece/索隆_r.jpg?raw=true'
                    },
                    {
                        title: '娜美',
                        url: 'https://github.com/OwnGhy/Jotting/blob/master/assets/OnePiece/娜美.jpg?raw=true',
                        compressedUrl: 'https://github.com/OwnGhy/Jotting/blob/master/assets/OnePiece/娜美_r.jpg?raw=true'
                    },
                    {
                        title: '乌索普',
                        url: 'https://github.com/OwnGhy/Jotting/blob/master/assets/OnePiece/乌索普.jpg?raw=true',
                        compressedUrl: 'https://github.com/OwnGhy/Jotting/blob/master/assets/OnePiece/乌索普_r.jpg?raw=true'
                    },
                    {
                        title: '山治',
                        url: 'https://github.com/OwnGhy/Jotting/blob/master/assets/OnePiece/山治.jpg?raw=true',
                        compressedUrl: 'https://github.com/OwnGhy/Jotting/blob/master/assets/OnePiece/山治_r.jpg?raw=true'
                    },
                    {
                        title: '乔巴',
                        url: 'https://github.com/OwnGhy/Jotting/blob/master/assets/OnePiece/乔巴.jpg?raw=true',
                        compressedUrl: 'https://github.com/OwnGhy/Jotting/blob/master/assets/OnePiece/乔巴_r.jpg?raw=true'
                    },
                    {
                        title: '罗宾',
                        url: 'https://github.com/OwnGhy/Jotting/blob/master/assets/OnePiece/罗宾.jpg?raw=true',
                        compressedUrl: 'https://github.com/OwnGhy/Jotting/blob/master/assets/OnePiece/罗宾_r.jpg?raw=true'
                    },
                    {
                        title: '弗兰奇',
                        url: 'https://github.com/OwnGhy/Jotting/blob/master/assets/OnePiece/弗兰奇.jpg?raw=true',
                        compressedUrl: 'https://github.com/OwnGhy/Jotting/blob/master/assets/OnePiece/弗兰奇_r.jpg?raw=true'
                    },
                    {
                        title: '布鲁克',
                        url: 'https://github.com/OwnGhy/Jotting/blob/master/assets/OnePiece/布鲁克.jpg?raw=true',
                        compressedUrl: 'https://github.com/OwnGhy/Jotting/blob/master/assets/OnePiece/布鲁克_r.jpg?raw=true'
                    }
                ],
                throttleCheckImage: throttle(this.checkImage, 300)
            };
        },
        mounted() {
            window.onload = () => {
                // 首屏
                this.$nextTick(() => {
                    this.checkImage();

                    window.addEventListener('scroll', this.throttleCheckImage);
                });
            }
        },
        methods: {
            checkImage() {
                const windowInnerHeight = window.innerHeight;
                const imgs = document.querySelectorAll('.lazy');

                // 没有图片未加载的时候就接触scroll监听
                if (!Array.prototype.slice.call(imgs).length) {
                    window.removeEventListener('scroll', this.throttleCheckImage);
                }
                for (let i = 0; i < imgs.length; i++) {
                    const top = imgs[i].getBoundingClientRect().top;
                    if (top < windowInnerHeight && top > 0) {
                        const wrapper = imgs[i].parentNode;
                        let newImg = new Image();
                        newImg.src = imgs[i].dataset.src;
                        imgs[i].className = 'preview';
                        newImg.onload = () => {
                            wrapper.insertBefore(newImg, imgs[i]);
                            imgs[i].className = 'preview origin';
                        };
                    }
                }
            }
        }
    }
</script>
<style lang="less">
    .progressive {
        position: relative;
        display: block;
        overflow: hidden;
        width: 400px;
        margin: 0 auto;

        .progressive-item {
            width: 100%;
        }

        .preview-wrap {
            position: relative;
            width: 100%;

            img {
                display: block;
                width: 100%;
                max-width: 100%;
                height: auto;
                border: 0 none;
                margin-bottom: 100px;
            }

            img.preview {
                filter: blur(2vw);
                transform: scale(1.05);
            }

            img.pending {
                position: absolute;
                left: 0;
                top: 0;
            }

            img.origin {
                pointer-events: none;
                position: absolute;
                left: 0;
                top: 0;
                animation: origin 1s ease-out;
                animation-fill-mode: forwards;
            }

            @keyframes origin {
                0% {
                    transform: scale(1.1);
                    opacity: 1;
                }
                100% {
                    transform: scale(1);
                    opacity: 0;
                }
            }
        }

    }
</style>