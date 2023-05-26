<template>
  <view class="content">
    <view class="Con">
      <text>{{time}}</text>
    </view>
    <view class="exitBtn" @click="timeOver">
      Slide out
    </view>
  </view>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    data() {
      return {
        time: '00:00',
        seconds: 0,
        intervalId: null,
        timeId:null
      }
    },
    computed:{
      ...mapState('m_user',['Uid'])
    },
    onLoad(option) {
      console.log(option);
      this.timeId = option.id
      this.intervalId = setInterval(() => {
        const minutes = Math.floor(this.seconds / 60);
        const seconds = this.seconds % 60;
        this.time = `${this.pad(minutes)}:${this.pad(seconds)}`;
        this.seconds++;
      }, 1000);
    },
    methods: {
      pad(number) {
        return number < 10 ? `0${number}` : String(number);
      },
      async timeOver(){
        const that = this
         clearInterval(this.intervalId);
        const minutes = Number(this.time.substring(0,2))
       
        console.log(this.time);
        if(minutes < 15){
          return uni.showModal({
            content:"时长小于5分钟，是否退出，退出,则该时长将不计入",
            success:function (res){
              if(res.confirm){
                uni.navigateBack()
              }else if(res.cancel) {
                that.intervalId = setInterval(() => {
                  const minutes = Math.floor(that.seconds / 60);
                  const seconds = that.seconds % 60;
                  that.time = `${that.pad(minutes)}:${that.pad(seconds)}`;
                  that.seconds++;
                }, 1000);
              }
            }
          })
        }
        if(minutes >= 15){
          uni.showModal({
            content:'是否结束计时',
            success:function (){
              if(res.confirm){
                const data = that.request({
                  url:`/user/timing/${this.Uid}`,
                  data:{
                    id:this.timeId,
                    status:true
                  },
                  method:'POST'
                })
                if(data.code == 200){
                  uni.navigateTo({
                    url:'/pages/index/index'
                  })
                }else {
                  uni.showLoading({
                    content:"结束计时失败！"
                  })
                }
              }
            }
          })
        }
      }
    },
    onUnload() {
      clearInterval(this.intervalId);
    },
    
  }
</script>

<style scoped lang="less">
  .content {
    position: relative;
    background-color: #354063;
    & .Con{
      width: 100vw;
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      transform: rotate(-90deg);
      transform-origin: 50% 50%;
      & text {
        color: #7C8DC6;
        font-size: 300rpx
      }
    }
    & .exitBtn{
      position: absolute;
      background-color: #2f364a;
      right: -42vw;
      top: 45vh;
      width: 100vw;
      height: 100px;
      display: flex;
      justify-content: center;
      align-items: center;
      transform: rotate(-90deg);
      transform-origin: 50% 50%;
      color: #A6A1A1;
      font-size: 36rpx;
       border-top-right-radius: 1000rpx;
        border-top-left-radius: 1000rpx;
      }
  }
</style>