<script setup>
import { onLaunch, onShow, onHide } from '@dcloudio/uni-app'
onLaunch(() => {
    console.log('App Launch')
})
onShow(() => {
    console.log('App Show')
})
onHide(() => {
    console.log('App Hide')
})
</script>

<script>
import Utils from "@/common/js/utils";

export default {
    globalData: {
        Utils
    }
}
</script>
<style>
	/*每个页面公共css */
    @import './app.css';
</style>
