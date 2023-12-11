<script setup>
import { ref } from 'vue'

const tipVisible = ref(true)
const closeTip = () => {
    tipVisible.value = false
}
</script>

<template>
    <view>
        <navbar title-text="首页" isHome/>
        <button style="margin-top: 200rpx" @click="tipVisible = !tipVisible">123{{ tipVisible }}</button>
        <uni-transition :duration="500" mode-class="fade" :show="tipVisible">
            <view style="margin-top: 130rpx">
                <view class="weui-cell" style="background-color:#fff9eb;">
                    <view class="weui-cell__hd">
                        <image src="/static/resource/images/ic_myapp.png" style="display: block;width: 40rpx;height: 40rpx;margin-right: 14rpx"></image>
                    </view>
                    <view class="weui-cell__bd">
                        <text style="color: #be9719;font-size: 26rpx">点击右上角“添加到我的小程序”，方便下次找到！</text>
                    </view>
                    <view class="weui-cell__ft" @click="closeTip">
                        <image src="/static/resource/images/modal_closer.png" style="display: block;width: 30rpx;height: 30rpx;"></image>
                    </view>
                </view>
            </view>
        </uni-transition>
    </view>
</template>

<style>
</style>
