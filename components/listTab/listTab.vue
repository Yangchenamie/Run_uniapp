<template>
  <view class="content">
    <view class="title">
      待办
      <view class="borderBox">
        
      </view>
    </view>
    <!-- <view class="con-sear">
      <image src="../../static/search.png" mode=""></image>
      <input type="text" placeholder="搜索" @click="gotoSearch" class="bgc">
    </view> -->
  </view>
</template>

<script>
  export default {
    name: "listTab",
    data() {
      return {

      };
    },
    methods:{
      gotoSearch(){
        uni.navigateTo({
          url:'/pages/search/search'
        })
      }
    }
  }
</script>

<style scoped lang="less">
  .content {

    width: 100%;
    height: 270rpx;
    background: url('../../static/bg1.png');

    & .title {
      padding-top: 120rpx;
      font-size: 48rpx;
      font-weight: 700;
      margin-left: 70rpx;
      & .borderBox{

        width: 110rpx;
        height: 24rpx;
        background-color: #2A9D8F;
        border-radius: 8rpx;
      }
    }

    .con-sear {
      width: 100%;
      position: relative;
      height: 92rpx;
      margin-top: 40rpx;
      

      & input {
        margin: 0 50rpx;
        width: 85%;
        // border: 2rpx solid #5081FF;
        height: 82rpx;
        border-radius: 30rpx;
        padding-left: 80rpx;
        padding-right: 30rpx;
        box-sizing: border-box;
        font-size: 24rpx
        
      }
      & .bgc{
        background: #fff;
      }
      & image {
        width: 40rpx;
        height: 40rpx;
        position: absolute;
        top: 22rpx;
        left: 10rpx;
        margin-left: 64rpx;
      }
    }
  }
</style>
