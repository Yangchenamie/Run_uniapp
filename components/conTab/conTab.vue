<template>
  <view class="conTab">
    <ul>
      <!-- <li @click="changeTrue">
        <view :class="flag == true ? 'active' :''">
          信息
        </view>
      </li>
      <li @click="changeFalse">
        <view :class="flag == false ? 'active' :''">
          朋友
        </view>
      </li> -->
      <li v-for = "(item,index) in arr" :key="index" @click="changeIndex(index);changeFlag()">
        <view :class="index == i ? 'active':''">
          {{item}}
        </view>
      </li>
    </ul>
    <image src="../../static/addPerson.png" mode="" v-if = "showFlag" @click="goto"></image>
  </view>
</template>

<script>
  export default {
    name: "conTab",
    props:['arr','showFlag',"goUrl"],
    data() {
      return {
        i:0,
        flag:true,
        chattingFlag:true
      };
    },
    methods: {
      changeIndex(index){
        console.log(this.i);
        this.i = index
      },
      changeFlag(){
        console.log(this.chattingFlag);
        this.chattingFlag = ! this.chattingFlag
        console.log(this.chattingFlag);
        this.$emit('chattingFlag',this.chattingFlag)
      },
      goto() {
        uni.navigateTo({
          url: this.goUrl,
          success: () => {},
          fail: () => {}
        })
      }
    },
  }
</script>

<style scoped lang="less">
  .conTab {
    display: flex;
    justify-content: space-between;
    // margin-top: 130rpx;
    padding: 0 40rpx;

    & image {
      width: 60rpx;
      height: 60rpx;
    }

    & ul {
      flex: 0.9;
      display: flex;

      & li {
        flex: 0.38;
        font-size: 28rpx;
        text-align: center;

        & .active {
          position: relative;
          font-size: 36rpx;
          font-weight: 700;

          &::before {
            content: '';
            width: 170rpx;
            height: 28rpx;
            border-radius: 14rpx;
            background-color: #B4D7FF;
            position: absolute;
            z-index: -1;
            bottom: -10rpx;
            left: 20rpx;
          }
        }
      }
    }
  }
</style>
