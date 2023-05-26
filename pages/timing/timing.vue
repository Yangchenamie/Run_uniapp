<template>
  <view class="content">
    <view class="Con">
      <view class="conTitle">
        <view class="titleFl">
          25
        </view>
        <view class="titleFr">
          <view class="">
            周日
          </view>
          <view class="">
            2023/03
          </view>
        </view>
      </view>
      <view class="conTab">
        <span class="tabItem" v-for="(item,index) in classify" :key="index"
          :class="index == classifyIndex ? 'active' : ''" @click="changeIndex(index)">
          {{item}}
        </span>
        <span v-if="isEditing">
          <input type="text" v-model="newClassify" @blur="addNewClassify" />
        </span>
        <span class="tabItem" @click="isEditing = true">添加</span>
        <!-- <view class="addClassify" v-if="isShowFlag">
          <input type="text">
          <button>确定</button>
        </view> -->
        <!-- <span class="tabItem">
          做数学试卷
        </span>
        <span class="tabItem">
          打游戏
        </span>
        <span class="tabItem">
          刷题
        </span>
        <span class="tabItem" @click="addItem">
          <label for="">添加</label>
        </span> -->
      </view>
      <view class="setTime">
        <view class="scroll_box">
          <view class="setTimeTitle">
            Set a time
          </view>
          <text class="cursor"></text>
          <scroll-view scroll-x="true" throttle="false" :scroll-left="salNum" scroll-with-animation='true'
            @scroll="bindscroll">
            <view class="scroller" :style="{width:scaleWidth}">
              <text v-for="(item,index) in count" :key="index"
                :class="((item+min)*step)% bigStep == 0?'big':((item+min)*step) % middleStep == 0?'middle':''">
                <text v-if="(item+min)%10==0" class="scale_txt">{{item + min}}</text>
              </text>
            </view>
          </scroll-view>
          <view class="cursorText">
            <view class="currentVal">
              {{curVal}}
            </view>
            <view class="">
              minutes
            </view>
          </view>
          <view class="start" @click="startTime">
            <image src="../../static/start.png" mode=""></image>
            <view class="">
              start
            </view>
          </view>
        </view>
      </view>
    </view>
    <tabbar :state="state"></tabbar>
  </view>
</template>

<script>
  import {
    mapState
  } from 'vuex'
  import tabbar from '../../components/tabbar/tabbar.vue'
  export default {
    data() {
      return {
        state: 3,
        curVal: 30, //当前值
        step: 1, //步长 每格代表的值
        middleStep: 5,
        bigStep: 10,
        cellW: 10,
        scaleWidth: '0px',
        salNum: 0, //scroll-left 
        count: 0, //一共多少格
        max: 240,
        min: 0,
        def: 30,
        classify: ['跑步', '做数学试卷', '打游戏', '刷题'],
        // classifyIndex: 0,
        // isShowFlag: false,
        // isEditing: false,
        // newClassify: '',
        
        classifyIndex: 0,
        isEditing: false,
        newClassify: '',
      }
    },
    computed: {
      ...mapState('m_user', ['Uid'])
    },
    mounted() {
      console.log('mounted-ready-slice');
      //初始化 页面加载完成之后 onReady
      let _this = this;
      //一共有多少格
      console.log(this);
      let count = Math.ceil((_this.max - _this.min) / _this.step) + 1;

      this.count = count;
      console.log(count);
      this.scaleWidth = (count * _this.cellW) + 'px'; //尺子总长度
      this.salNum = (_this.def - _this.min) / _this.step * _this.cellW;
      //初始值
      if (_this.slideId)
        _this.setVal(_this.salNum);
      console.log(count, this.scaleWidth, this.salNum);
    },
    onLoad() {

    },
    beforeCreate() {
      uni.hideTabBar()
    },
    methods: {
      addNewClassify() {
        if (this.newClassify.trim()) {
          this.classify.splice(-1, 0, this.newClassify.trim());
        }
        this.isEditing = false;
        this.newClassify = ''
        this.classifyIndex = this.classify.length-2
      },
      changeIndex(index) {
        // if(index == this.classify.length-1){
        //   this.isShowFlag = true
        // }
        console.log(this.classifyIndex);
        this.classifyIndex = index
        console.log(this.classifyIndex);
      },
      async startTime() {
        const res = await this.request({
          url: `/user/timing/${this.Uid}`,
          data: {
            name: this.classify[this.classifyIndex],
          },
          method: 'POST'
        })
        console.log(res);
        uni.navigateTo({
          url: `/pages/chronograph/chronograph?id=${res.data.id}`
        })
      },
      bindscroll: function(e) {
        // 移动距离
        let left = e.detail.scrollLeft;
        this.setVal(left);
      },
      setVal: function(left) {
        let curVal = Math.round(left / this.cellW / this.step) + this.min;
        // let curVal = left / this.cellW / this.step  + this.min;
        this.curVal = curVal > this.max ? this.max : (curVal < this.min ? this.min : curVal)
        this.$emit('slide', this.curVal)
      },
      setDefVal: function() {
        //初始值
        var _this = this;
        this.salNum = (_this.curVal - this.min) * this.cellW * this.step
      },
      handleCut() {
        if (this.curVal == this.min) return
        let curVal = Number(this.curVal) - 0.1;
        this.curVal = curVal.toFixed(1)
        this.$emit('slide', this.curVal)
      },
      handleAdd() {
        if (this.curVal == this.max) return
        let curVal = Number(this.curVal) + 0.1;
        this.curVal = curVal.toFixed(1)
        this.$emit('slide', this.curVal)
      }

    },
    components: {
      tabbar
    }
  }
</script>

<style scoped lang="less">
  .content {
    min-height: 100vh;
    background: linear-gradient(#6e92eb, 20%, #fff);

    & .Con {
      & .conTitle {
        display: flex;
        padding-top: 120rpx;
        padding-left: 70rpx;
        color: #fff;
        font-size: 26rpx;
        align-items: center;

        & .titleFl {
          font-size: 60rpx;
          margin-right: 10rpx;
          font-weight: 700;
        }

        & .titleFr {
          display: flex;
          flex-flow: column;
        }
      }

      & .conTab {
        margin-top: 50rpx;
        padding-left: 50rpx;
        display: flex;
        flex-wrap: wrap;
        z-index: 2;
        height: 360rpx;
        overflow: auto;

        & .tabItem {
          margin: 15rpx 30rpx;
          padding: 20rpx 40rpx;
          color: #678ff6;
          border-radius: 30rpx;
          background-color: #fff;
          height: 42rpx;
          // z-index: -1;
        }

        & .active {
          color: #fff;
          background-color: #678ff6;
        }
      }

      & .setTime {
        width: 100%;
        position: fixed;
        left: 0;
        bottom: 80rpx;
        background-color: #f7f9fe;
        border-top-left-radius: 100rpx;
        border-top-right-radius: 100rpx;
        height: 650rpx;

        & .setTimeTitle {
          text-align: center;
          font-size: 40rpx;
          margin-bottom: 50rpx;
          font-weight: 700;
        }

        & .cursorText {
          text-align: center;
          color: #678ff6;
          margin-top: 30rpx;

          & .currentVal {
            color: #4c7af6;
            font-size: 50rpx;
          }

        }

        & .start {
          margin: 20rpx auto;
          // transform: translateX(50%);
          display: flex;
          width: 175rpx;
          height: 175rpx;
          background-color: #fff;
          border-radius: 50%;
          flex-flow: column;
          align-items: center;
          box-shadow: 2px 2px 5px 1px #a6befa;
          color: #7198f8;

          & image {
            margin-top: 20rpx;
            width: 80rpx;
            height: 80rpx;
          }
        }
      }
    }
  }

  .scroll_box {
    width: 90%;
    margin: 48rpx auto 20rpx auto;
    overflow: hidden;
    position: relative;
    padding: 0 50rpx;
    box-sizing: border-box;
  }

  .cursor {
    position: absolute;
    top: 90rpx;
    left: 50%;
    width: 6rpx;
    height: 100rpx;
    background: #4c7af6;
    transform: translate(-50%, 0);
    z-index: 9;
    border-radius: 20rpx;
  }

  .wrapper {
    width: 100%;
    margin-top: 0rpx;
  }

  .scroller {
    display: flex;
    align-items: center;
    /*width: 1500rpx;*/
    // padding: 40rpx 47% 40rpx 50%;
    padding: 0 47.5% 0 50%;
    /*transition: all 1s;*/
  }

  .scroller text {
    display: flex;
    align-items: center;
    font-size: 24rpx;
    color: red;
    display: inline-block;
    width: 20px;
    height: 48rpx;
    border-left: 1px solid #7198f8;
    // border-top: 1px solid #A2B7E0;
    vertical-align: top;
    position: relative;
  }

  .scroller text:last-of-type {
    border-top: 0rpx;
  }

  .scroller .scale_txt {
    font-size: 32rpx;
    font-style: normal;
    position: absolute;
    left: -16px;
    bottom: -64px;
  }

  .scroller .middle {
    height: 70rpx;
  }
</style>