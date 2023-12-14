<script setup>
import { onLoad } from '@dcloudio/uni-app'
import { ref, toRaw } from 'vue'

// 定义轮播图数据
const slides = ref([])
// 快捷入口2
const nav2s = ref([])
// 快捷入口多个
const navs = ref([])

const app = getApp()
onLoad(() => {
    app.globalData.Utils.getUserInfo()
    app.globalData.Utils.request({
        url: '/app/init',
        success: res => {
            const { id } = res.data.area
            // 使用id获取当前地址的页面数据
            app.globalData.Utils.request({
                url: '/Index/index',
                data: {
                    aid: id
                },
                success: ({ data }) => {
                    slides.value = data.slides
                    nav2s.value = data.nav2s
                    navs.value = data.navs
                }
            })
        }
    })
})
const onNavTap = (e, type) => {
    const nav = toRaw(nav2s.value)[e.currentTarget.dataset.index]
    // 判断是否为内部链接
    if (type === 'nav2' && nav.stype === '1') {
        uni.navigateTo({
            url: nav.stype_link
        })
    }
    if (type === 'navs' && nav.stype === '1') {
        uni.navigateTo({
            url: nav.stype_link
        })
    }
}
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
        <view v-if="nav2s.length" class="nav2-list">
            <block v-for="(item, index) in nav2s" :key="index">
                <view class="nav2-item" :data-index="index" @click="e => onNavTap(e, 'nav2')">
                    <image :src="item.pic_image_url" mode="widthFix"></image>
                </view>
            </block>
        </view>
        <view v-if="navs && navs.length > 0" class="nav-list">
            <block v-for="(item, index) in navs" :key="index">
                <view class="nav-item" @click="e => onNavTap(e, 'navs')" :data-index="index">
                    <view class="nav-pic">
                        <image :src="item.pic_image_url"></image>
                        <view class="nav-text" :style="{
                            color: item.tcolor
                        }">
                            {{ item.title }}
                        </view>
                    </view>
                </view>
            </block>
        </view>
        123
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
.nav2-list {
    margin: 10rpx 20rpx 0 20rpx;
    display: flex;

    .nav2-item {
        flex: 1;
        padding: 0 5rpx;

        image {
            width: 100%;
        }
    }
}
.nav-list {
    display: flex;
    justify-content: space-around;
    margin-top: 20rpx;
    padding: 10rpx 0;

    .nav-item {
        .nav-pic {
            text-align: center;
            image {
                width: 110rpx;
                height: 110rpx;
            }
        }
        .nav-text {
            font-size: 24rpx;
            font-weight: bold;
            white-space: nowrap;
            overflow: hidden;
        }
    }
}
</style>
