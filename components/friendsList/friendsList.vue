<template>
  <view class="content">
    <view class="conTab">
      <view class="tabItem">
        <image src="../../static/4 (1).png" mode=""></image>
        <view class="">
          新朋友
        </view>
      </view>
      <view class="tabItem">
        <image src="../../static/4 (2).png" mode=""></image>
        <view class="">
          自习室
        </view>
      </view>
      <view class="tabItem" @click="gotoRank">
        <image src="../../static/4 (4).png" mode=""></image>
        <view class="">
          排行榜
        </view>
      </view>
    </view>
    <view class="Con">
      <view class="item">
        <image src="../../static/1.jpg" mode=""></image>
        <view class="">
          阿咩_
        </view>
      </view>
      <view class="item">
        <image src="../../static/1.jpg" mode=""></image>
        <view class="">
          阿咩_
        </view>
      </view>
      <view class="item">
        <image src="../../static/1.jpg" mode=""></image>
        <view class="">
          阿咩_
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: "friendsList",
    data() {
      return {

      };
    },
    methods:{
      gotoRank(){
        uni.navigateTo({
          url:'/pages/ranking/ranking'
        })
      }
    }
  }
</script>

<style scoped lang="less">
  .content {

    & .conTab {
      margin-top: 50rpx;
      display: flex;
      justify-content: space-evenly;

      & .tabItem {
        display: flex;
        flex-flow: column;
        text-align: center;
        font-size: 24rpx;
        color: #777777;

        & image {
          width: 122rpx;
          height: 121rpx;
          border-radius: 40rpx;
          margin-bottom: 10rpx;
        }
      }

    }

    & .Con {
      margin-top: 30rpx;
      & .item {
        display: flex;
        align-items: center;
        padding: 30rpx 80rpx;
        border-bottom: 2rpx solid #f0f0f0;

        & image {
          width: 110rpx;
          height: 110rpx;
          border-radius: 50%;
          margin-right: 20rpx;
        }
      }
    }
  }
</style>
