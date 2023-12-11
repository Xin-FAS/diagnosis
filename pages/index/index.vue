<script setup>
const navigateTo = () => {
    uni.navigateTo({
        url: '/pages/search/index'
    })
}
</script>

<template>
    <view class="content">
        <navbar title-text="首页" isHome/>
    </view>
</template>

<style>
</style>
