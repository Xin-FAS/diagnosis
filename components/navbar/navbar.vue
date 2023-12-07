<script setup>
import { onBeforeMount, ref } from 'vue'

onBeforeMount(() => {
    setNavSize()
})
// 状态栏高度rpx
const statusBarHeight = ref(0)
// 内容高度
const navHeight = ref(0)
const setNavSize = () => {
    const { statusBarHeight, system } = uni.getSystemInfoSync()
    // 使用rpx作为单位，以iphone6的375对比
    statusBarHeight.value = statusBarHeight * 2
    // 判断设备，IOS设备顶部有刘海
    const isIOS = system.indexOf('IOS') !== -1
    if (!isIOS) {
        navHeight.value = 96
    } else {
        navHeight.value = 88
    }
}
</script>

<template>
    <view class="nav">
        <!-- 状态栏 -->
        <view :style="`height: ${statusBarHeight}px`" style="background-color: sandybrown;" />
        <!-- 内容区 -->
        <view class="navbar"></view>
    </view>
</template>

<style scoped>
.nav {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
}
</style>
