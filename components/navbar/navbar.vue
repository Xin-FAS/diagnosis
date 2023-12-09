<script setup>
import { onBeforeMount, ref, defineProps } from 'vue'

defineProps({
    background: {
        type: String,
        default: '#fff'
    },
    color: {
        type: String,
        default: '#000'
    },
    fontSize: {
        type: Number,
        default: 32
    },
    iconWidth: {
        type: Number,
        default: 116
    },
    iconHeight: {
        type: Number,
        default: 38
    },
    titleText: {
        type: String,
        default: ''
    }
})

onBeforeMount(() => {
    setNavSize()
})
// 状态栏高度rpx
const statusBarHeight = ref(0)
// 内容高度rpx
const navHeight = ref(0)
const setNavSize = () => {
    const { statusBarHeight: sBarHeight, system } = uni.getSystemInfoSync()
    // 以375对比，需要乘2
    statusBarHeight.value = sBarHeight * 2
    // 判断设备，IOS设备顶部有刘海
    const isIOS = system.indexOf('IOS') !== -1
    if (!isIOS) navHeight.value = 96
    else navHeight.value = 88
}

// 页面栈的数据
const pagesNum = ref(getCurrentPages().length)
// 判断页面栈跳转
const backOrHome = () => {
    if (pagesNum.value > 1) uni.navigateBack()
    else uni.switchTab({
        url: '/pages/index/index'
    })
}
</script>

<template>
    <view class="nav">
        <!-- 状态栏 -->
        <view :style="{
            height: statusBarHeight + 'rpx',
            background,
        }" />
        <!-- 内容区 -->
        <view class="navbar" :style="{
            height: navHeight + 'rpx',
            background
        }">
            <view class="back-icon" @click="backOrHome">
                <image v-if="pagesNum > 1" src="/static/resource/navbar/ic_back.png"></image>
                <image v-else src="/static/resource/navbar/ic_home.png"></image>
            </view>
            <view class="nav-title" v-if="titleText">{{ titleText }}</view>
            <slot v-else />
        </view>
    </view>
</template>

<style scoped lang="scss">
.nav {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 2;

    .navbar {
        .back-icon {
            display: flex;
            align-items: center;
            width: 64rpx;
            height: 100%;
            margin-left: 20rpx;

            image {
                height: 64rpx;
                width: 64rpx;
            }
        }
    }
}
</style>
