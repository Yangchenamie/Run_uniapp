<template>
  <view class="item">
    <view class="item-fl">
      <view class="">
        2
      </view>
      <view class="person">
        <image :src="data.avatarUrl" mode=""></image>
        <view class="">
          {{data.name}}
        </view>
      </view>
    </view>
    <view class="item-fr">
      <view class="">
        {{data.duration}}min
      </view>
    </view>
    <view class="">
      <image src="../../static/love.png" mode="" class="love" v-if="flag" @click="flag = !flag" ></image>
      <image src="../../static/love-active.png" mode="" @click="flag = !flag" class="love" v-else></image>
    </view>
  </view>
</template>

<script>
  export default {
    name:"rankCon",
    props:['data'],
    data() {
      return {
        flag:true
      };
    }
  }
</script>

<style scoped lang="less">
.item{
  padding:0 60rpx 0 70rpx;
  box-sizing: border-box;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 110rpx;
  background-color: #fff;
  border-radius: 40rpx;
  box-shadow: 10px 10px 20px 1px rgba(0, 0, 0, .1);
  margin-bottom: 20rpx;
  & image{
    width: 60rpx;
    height: 60rpx;
  }
  & .item-fl{
    display: flex;
    align-items: center;
    & image{
       border-radius: 50%;
       margin: 0 20rpx;
    }
    & .person{
      display: flex;
      align-items: center;
    }
  }
  & .item-fr{
    display: flex;
    align-items: center;
    & .love{
      margin-left: 20rpx;
    }
  }
}
</style>