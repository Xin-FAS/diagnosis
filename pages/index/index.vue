<script setup>
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'

// 定义轮播图数据
const slides = ref([])


const app = getApp()
onLoad(() => {
    app.globalData.Utils.getUserInfo()
    app.globalData.Utils.request({
        url: '/app/init',
        success: res => {
            const { id } = res.data.data.area
            // 使用id获取当前地址的页面数据
            app.globalData.Utils.request({
                url: '/Index/index',
                data: {
                    aid: id
                },
                success: ({ data }) => {
                    slides.value = data.data.slides
                }
            })
        }
    })
})
</script>

<template>
    <view>
        <navbar title-text="首页" isHome />
        <view style="margin-top: 130rpx">
            <view class="weui-cell" style="background-color:#fff9eb;">
                <view class="weui-cell__hd">
                    <image src="/static/resource/images/ic_myapp.png" style="display: block;width: 40rpx;height: 40rpx;margin-right: 14rpx"></image>
                </view>
                <view class="weui-cell__bd">
                    <text style="color: #be9719;font-size: 26rpx">点击右上角“添加到我的小程序”，方便下次找到！</text>
                </view>
                <view class="weui-cell__ft">
                    <image src="/static/resource/images/modal_closer.png" style="display: block;width: 30rpx;height: 30rpx;"></image>
                </view>
            </view>
        </view>
        <view v-if="slides.length" class="index-swiper">
            <swiper autoplay circular :interval="4000" :duration="500">
                <block v-for="(item, index) in slides" :key="index">
                    <swiper-item>
                        <image :src="item.pic_image_url" mode="widthFix" show-menu-by-longpress :data-index="index"></image>
                    </swiper-item>
                </block>
            </swiper>
        </view>
    </view>
</template>

<style lang="scss">
.index-swiper {
    padding: 20rpx 20rpx 0 20rpx;
    overflow: hidden;

    swiper {
        height: 320rpx;
        overflow: hidden;
        border-radius: 10rpx;
        image {
            width: 100%;
            height: 100%;
        }
    }
}
</style>
