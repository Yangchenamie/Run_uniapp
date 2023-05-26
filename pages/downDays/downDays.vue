<template>
  <view class="content">
    <view class="conTab">
<image src="../../static/组 116 - 副本 3.png" mode="" class="left" @click="goBack"></image>
      <view class="">
        
         Countdown Days
      </view>
      <image src="../../static/add1.png" mode="" @click="addDays"></image>
    </view>
    <view class="con" v-for="(item,index) in downList" :key="index">
      <countdownList :list ="item"></countdownList>
    </view>
  </view>
</template>

<script>
  import countdownList from '@/components/countdownList/countdownList.vue'
import { mapState } from 'vuex'
  export default {
    data() {
      return {
        downList:[]
      }
    },
    computed:{
      ...mapState('m_user',['Uid'])
    },
    onLoad() {
      this.getDownDaysList()
    },
    methods: {
      goBack(){
        uni.navigateBack({
          url:'/pages/mine/mine.vue'
        })
      },
      addDays(){
        uni.navigateTo({
          url:'/pages/addDownDays/addDownDays'
        })
      },
      async getDownDaysList(){
        const res = await this.request({
          url:`/user/getCountDay/${this.Uid}`
        })
        console.log(res);
        this.downList = res
      }
    },
    components:{
      countdownList
    }
  }
</script>

<style scoped lang="less">
.content{
  width: 100%;
  box-sizing: border-box;
  background-color: #f0f0f0;
  min-height: 100vh;
  & .conTab{
    height: 270rpx;
    background-color: #4b7af6;
    display: flex;
    justify-content: space-between;
    font-size:  52rpx;
    color: #fff;
    align-items: center;
    padding: 40rpx 40rpx 0;
    box-sizing: border-box;
    
    & .left{
      // margin-right: 30rpx;
      width: 60rpx;
      height: 60rpx;
      // vertical-align: bottom;
      margin-top: 4rpx;
    }
    
    & image{
      width: 50rpx;
      height: 50rpx;
    }
  }
  & .con{
    padding: 50rpx 0;
  }
  
}
</style>
