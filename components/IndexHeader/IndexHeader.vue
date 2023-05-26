<template>
  <view class="content">
    <view class="conTab">
      <!-- <image src="../../static/1.jpg" mode="" class="pic"></image>
      <view class="con-sear">
        <image src="../../static/search.png" mode=""></image>
        <input type="text" placeholder="搜索" @click="gotoSearch" class="bgc">
      </view> -->
      <dateClock></dateClock>
      <image src="../../static/5.png" mode="" class="icon" @click="gotoTweets"></image>
    </view>
  </view>
</template>

<script>
  import search from '@/components/search/search.vue'
  import dateClock from '@/components/dateClock/dateClock.vue'
  export default {
    name: "IndexHeader",
    data() {
      return {

      };
    },
    methods:{
      gotoSearch(){
        uni.navigateTo({
          url:'/pages/search/search'
        })
      },
      gotoTweets(){
        uni.navigateTo({
          url:'/pages/tweets/tweets'
        })
      }
    },
    components:{search,dateClock}
  }
</script>

<style scoped lang="less">
  .content {
    position: relative;
    background-color: #3b7cff;
    height: 300rpx;
    width: 100%;
    border-bottom-right-radius: 80rpx;

    &::before {
      width: 80rpx;
      height: 80rpx;
      background-color: #3b7cff;
      content: '';
      position: absolute;
      left: 0;
      bottom: -80rpx;
      z-index: -1;
    }
    & .conTab{
      padding: 110rpx 40rpx 0;
      display: flex;
      align-items: center;
      width: 100%;
      box-sizing: border-box;
      justify-content: space-between;
      & .pic{
        width: 100rpx;
        height: 100rpx;
        border-radius: 50%;
      }
      & .icon{
        width: 60rpx;
        height: 60rpx;
      }
    }
  }
  .con-sear {
        position: relative;
        // height: 92rpx;
        
  
        & input {
          margin: 0 30rpx;
          // border: 2rpx solid #5081FF;
          height: 60rpx;
          border-radius: 30rpx;
          padding-left: 80rpx;
          padding-right: 30rpx;
          // padding: 20rpx 30rpx 20rpx 80rpx;
          box-sizing: border-box;
          font-size: 24rpx;
          color:#fff;
          width: 450rpx;
        }
        & .bgc{
          background: #668ff7;
        }
        & image {
          width: 40rpx;
          height: 40rpx;
          position: absolute;
          top: 11rpx;
          left: 4rpx;
          margin-left: 64rpx;
        }
      }
</style>
