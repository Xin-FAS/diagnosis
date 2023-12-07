<template>
    <view>
        123
    </view>
</template>

<script setup>
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'

const title = ref('Hello')
onLoad(() => {
    console.log('this is load')
})
</script>

<style>
</style>
