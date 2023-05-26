<template>
  <view class="content">
    <IndexHeader></IndexHeader>
    <view class="middle">
      <staticCon></staticCon>
    </view>
    <tabbar :state="state"></tabbar>
  </view>
</template>

<script>
  import tabbar from '../../components/tabbar/tabbar.vue'
  import IndexHeader from '@/components/IndexHeader/IndexHeader.vue'
  import staticCon from '@/components/staticCon/staticCon.vue'
  import dateClock from '@/components/dateClock/dateClock.vue'
  export default {
    data() {
      return {
        state: 1
      }
    },
    beforeCreate() {
      uni.hideTabBar()
    },
    onLoad() {

    },
    methods: {

    },
    components:{tabbar,IndexHeader,staticCon,dateClock}
  }
</script>

<style scoped lang="less">
.middle{
  position: relative;
  width: 100%;
  border-top-left-radius: 80rpx;
  border-top-right-radius: 100rpx;
  background-color: #fff;
  // margin-top: -30rpx;
  padding-bottom: 150rpx
  
}

</style>
