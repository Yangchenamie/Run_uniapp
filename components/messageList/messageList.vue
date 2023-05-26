<template>
  <view class="content">
    <view class="item">
      <view class="itemFl">
        <view class="itemPic">
          <image src="../../static/1.jpg" mode=""></image>
        </view>
        <view class="text">
          <view class="name">
            阿咩_
          </view>
          <view class="message">
            别卷了
          </view>
        </view>
      </view>
      <view class="itemFr">
        2
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name:"messageList",
    data() {
      return {
        
      };
    }
  }
</script>

<style scoped lang="less">
.content{
   // margin-top: 50rpx;
  & .item{
    display: flex;
    justify-content: space-between;
    padding: 30rpx 40rpx 20rpx;
    box-sizing: border-box;
    border-bottom: 2rpx solid #f0f0f0;
    align-items: center;
    & .itemFl{
      display: flex;
      & .itemPic{
        margin-right: 30rpx;
        & image{
          width: 110rpx;
          height: 110rpx;
          border-radius: 50%;
        }
      }
      & .text{
        display: flex;
        flex-flow: column;
        justify-content: space-evenly;
        & .name{
          
        }
        & .message{
          font-size: 24rpx;
          color: #adadad;
        }
      }
    }
    & .itemFr{
      width: 40rpx;
      height: 40rpx;
      background-color: #d04f46;
      border-radius: 50%;
      color: #fff;
      text-align: center;
      line-height: 40rpx;
      font-size: 20rpx;
    }
  }
}
</style>