<template>
  <view class="content">
    <view class="title">
      <view class="">
        个人
      </view>
      <view class="" @click="gotoSetting">
        <image src="../../static/setting.png" mode=""></image>
      </view>
    </view>
    <view class="person">
      <view class="person-left">
        <view class="pic"  @click.stop="preview">
          <image :src="avatarurl" mode=""></image>
        </view>
        <view class="nickName">
          银渐层_
        </view>
      </view>
      <view class="person-right" @click="gotopyq">
        <image src="../../static/pyq.png" mode=""></image>
      </view>
    </view>
  </view>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    name: "mineHeader",
    data() {
      return {

      };
    },
    computed:{
      ...mapState('m_user',['avatarurl'])
    },
    methods:{
      gotoSetting(){
        uni.navigateTo({
          url:'/pages/settings/settings'
        })
      },
      preview(){
        const imgUrl = uni.getStorageSync('avatarurl')
        let imgList=[];
        imgList.push(imgUrl)
        console.log(imgList);
        uni.previewImage({
          current:0,
          urls:imgList,
        })
        console.log(2222222);
      },
      gotopyq(){
        uni.navigateTo({
          url:'/pages/tweets/tweets'
        })
      }
    }
  }
</script>

<style scoped lang="less">
  .content {
    position: relative;
    background-color: #3b7cff;
    // background: url('../../static/bg.png');
    height: 300rpx;
    width: 100%;
    border-bottom-left-radius: 80rpx;
    &::before{
      width: 80rpx;
      height: 80rpx;
      background-color: #3b7cff;
      content: '';
      position: absolute;
      right: 0;
      bottom:-80rpx;
      z-index: -1;
    }
    .title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      padding: 112rpx 54rpx 0;
      box-sizing: border-box;
      color: #fff;
      font-size: 44rpx;

      & image {
        width: 50rpx;
        height: 50rpx;
        margin-top: 10rpx;
      }
    }

    & .person {
      margin-top: 35rpx;
      padding: 0 42rpx;

      & .person-left {
        float: left;
        display: flex;

        & .pic {
          margin-right: 20rpx;
          
          & image {
            width: 160rpx;
            height: 160rpx;
            border-radius: 50%;
          }
        }

        & .nickName {
          font-size: 36rpx;
          color: #fff;
          margin-top: 20rpx;
        }
      }
      & .person-right{
        float: right;
        width: 100rpx;
        height: 100rpx;
        background-color: #fff;
        border-radius: 50%;
        box-shadow: 10px 10px 20px 1px rgba(0, 0, 0, .3);
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        margin-top: 20rpx;
        & image{
          width: 80rpx;
          height: 80rpx;
        }
      }
    }
  }
</style>
