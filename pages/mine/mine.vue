<template>
  <view>
    <mineHeader></mineHeader>
    <view class="middle">
      <view class="mineCon">
        <mineCon></mineCon>
      </view>
    </view>
    <tabbar :state="state"></tabbar>
  </view>
</template>

<script>
  import tabbar from '../../components/tabbar/tabbar.vue'
  import mineHeader from '@/components/mineHeader/mineHeader.vue'
  import mineCon from '@/components/mineCon/mineCon.vue'
  export default {
    data() {
      return {
        state: 5
      }
    },
    beforeCreate() {
      uni.hideTabBar()
    },
    methods: {
      
    },
    
    components:{tabbar,mineHeader,mineCon}
  }
</script>

<style scoped lang="less">
.middle{
  width: 100%;
  border-top-left-radius: 100rpx;
  border-top-right-radius: 100rpx;
  background-color: #fbfbfb;
  // height: 500rpx;
      padding-bottom: 200rpx;
}
</style>
