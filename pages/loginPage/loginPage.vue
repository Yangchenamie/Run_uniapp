<template>
  <view class="content">
      <view class="triangle">
        
      </view>
      <image src="../../static/run.png" mode="" class="run"></image>
      <view class="square">
        
      </view>
    <view class="buttonBox">
      <view class="btn" @click="login">
        一键登录
      </view>
    </view>
  </view>
</template>

<script>
import {mapMutations} from 'vuex'
  export default {
    data() {
      return {
        
      }
    },
    methods: {
      ...mapMutations('m_user',['updateUid','updateToken']),
       login(){
        uni.login({
          success:async(res)=>{
            console.log(res);
            // const code = res.code
            const loginRes = await this.request({
              url:'/user/login',
              method:'POST',
              header:{
                 'Content-Type':'application/x-www-form-urlencoded',
              },
              data:{
                "code":res.code
              }
            })
            if(loginRes.code ==200){
              this.updateUid(loginRes.data.Uid)
              this.updateToken(loginRes.data.token)
              uni.navigateTo({
                url:'/pages/register/register'
              })
            }else {
              uni.showModal({
                content:'登录失败！'
              })
            }
          }
        })
      }
    }
  }
</script>

<style scoped lang="less">
.content{
  position: relative;
  height: 100vh;
  width: 100%;
  background-color: #fff;
  & .triangle{
    position: absolute;
    width: 0;
    height: 0;
    top:-80rpx;
    left:80rpx;
    border-top: 150rpx solid transparent;
    border-bottom: 150rpx solid #EFDD7D;
    border-right: 150rpx solid transparent;
    border-left: 150rpx solid transparent;
    transform: rotate(60deg);
  }
    & .run{
      position: absolute;
      width: 370rpx;
      height: 250rpx;
      top:240rpx;
      left: 185rpx;
    }
    & .square{
      position: absolute;
      right: 30rpx;
      width: 160rpx;
      height: 160rpx;
      background-color: #E1B6D9;
      border:12rpx solid #D399C9;
      transform: rotate(45deg);
      margin-top:30rpx;
      top: 380rpx;
    }
  & .buttonBox{
    position: fixed;
    left: 0;
    bottom: 0;
    height: 58%;
    width: 100%;
    background-color: #1B5ED0;
    border-top-left-radius: 50%;
    border-top-right-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    & .btn{
      width: 60%;
      background-color: #F9C53A;
      height: 124rpx;
      border-radius: 48rpx;
      border: 4rpx solid #EFDD7D;
      text-align: center;
      line-height: 124rpx;
      font-size: 40rpx;
    }
  }
}
</style>
