<template>
  <view class="content">
    <view class="Con">
      <view class="item" v-for="(item,index) in listData" :key="index">
        <view class="itemTitle">
          <view class="time">
            {{item.date}}
          </view>
          <image src="../../static/down.png" mode="" @click="isShow(index)"></image>
        </view>
        <view class="itemCon" v-if="isShowArr[index]">
          <view class="itemList" v-for="(item2,index2) in item.items" :key="index2" @click="gotoTiming(item2)">
            <view class="listFl list">
              <view class="listTime">
                {{item2.event_startTime}}
              </view>
              <view class="timeText" v-if="parseInt(item2.event_startTime.substring(0,2)) < 12? true :false">
                AM
              </view>
              <view class="" v-else>
                PM
              </view>
            </view>
            <view class="listFr list" :class="item2.event_status ? 'active' :''">
              <view class="listName">
                {{item2.event_name}}
              </view>
              <view class="remark">
                {{item2.event_classify}}
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
    <view class="addList" @click="gotoAdd">
      <image src="../../static/addList.png" mode=""></image>
    </view>
  </view>
</template>

<script>
  import {
    mapState
  } from 'vuex'
  export default {
    name: "listItem",
    // props: ['listData','isShowArr','updateIsShowArr'],
    props: {
        listData: {
          type: Array,
          required: true
        },
        isShowArr: {
          type: Array,
          required: true
        },
      },
    data() {
      return {
        isShowFlag: true,
        showIndex: null,
      };
    },
    computed: {
      ...mapState('m_user', ['Uid'])
    },
    onReady() {
      console.log(this.listData);
      
    },
    
    methods: {
     isShow(index){
       // this.isShowArr[index] = !this.isShowArr[index]
       // const newData = this.isShowArr
       // this.$emit('updateIsShowArr',newData)
       this.$set(this.isShowArr, index, !this.isShowArr[index]);
             this.$emit('updateIsShowArr', this.isShowArr);
     },
      // isShow(index) {
      //   this.isShowArr[index] = !this.isShowArr[index]
      //   console.log(this.isShowArr);
      // },
      gotoAdd() {
        uni.navigateTo({
          url: '/pages/createForm/createForm'
        })
      },
      gotoTiming(item) {
        console.log(item);
        this.request({
          url: `/user/timing/${this.Uid}`,
          data: {
            name: item.event_name
          },
          method: 'POST'
        }).then(res => {
          console.log(res);
          if (res.code == 200) {
            uni.navigateTo({
              url: `/pages/chronograph/chronograph?id=${res.data.id}`
            })
          }
        })
      }
    }
  }
</script>

<style scoped lang="less">
  .content {

    // width: 100%;
    & .Con {
      margin: 40rpx;
      box-sizing: border-box;

      & .item {
        color: #333;
        margin-bottom: 60rpx;

        & .itemTitle {
          display: flex;
          margin-bottom: 40rpx;

          & .time {}

          & image {
            margin-left: 20rpx;
            width: 40rpx;
            height: 40rpx;
          }
        }

        & .itemCon {
          // background-color: pink;
          border: 2rpx solid #DFDCDC;
          border-radius: 20rpx;

          & .itemList {
            display: flex;
            height: 250rpx;
            font-size: 28rpx;
            // background-color: blue;
            align-items: center;
            margin: 0 50rpx;
            box-sizing: border-box;
            line-height: 70rpx;
            border-bottom: 2rpx solid #f0f0f0;

            &:last-child {
              border-bottom: 2rpx solid transparent;
            }

            & .list {
              display: flex;
              flex-flow: column;
            }

            & .listFl {
              flex: 0.4;

              & .listTime {
                font-size: 52rpx;
                font-weight: 700;
              }

              & .timeText {
                color: #adadad;
              }
            }

            & .listFr {
              position: relative;
              flex: 0.6;

              ::before {
                content: '';
                width: 14rpx;
                height: 14rpx;
                border-radius: 50%;
                background-color: #69D0CA;
                position: absolute;
                left: -28rpx;
                top: 26rpx;
              }

              & .listName {
                font-size: 32rpx;
              }

              & .remark {
                color: #69D0CA;
              }
            }
          }
        }
      }
    }

    & .addList {
      position: fixed;
      right: 15rpx;
      bottom: 180rpx;
      width: 112rpx;
      height: 112rpx;
      background-color: #2A9D8F;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: space-evenly;

      & image {
        width: 60rpx;
        height: 60rpx;
      }
    }
  }

  .active {
    position: relative;
    flex: 0.6;

    ::before {
      content: '';
      width: 14rpx;
      height: 14rpx;
      border-radius: 50%;
      background-color: #1B9AEE !important;
      position: absolute;
      left: -28rpx;
      top: 26rpx;
    }

    & .remark {
      color: #1B9AEE !important;
    }
  }
</style>