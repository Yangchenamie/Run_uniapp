<template>
  <view>
    <view class="tab-box">
      <view class="item" v-for="(item,index) in List" :key="item.id" @click="SwitchTab(item)">
        <image :src="item.id === state ? item.selectedIconPath : item.iconPath" mode=""></image>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: "tabbar",
    props: ['state'],
    data() {
      return {
        List: [{
            "id": 1,
            "pagePath": "../../pages/index/index",
            "iconPath": "../../static/statis.png",
            "selectedIconPath": "../../static/statis-active.png"
          },
          {
            "id": 2,
            "pagePath": "../../pages/list/list",
            "iconPath": "../../static/list.png",
            "selectedIconPath": "../../static/list-active.png"
          },
          {
            "id": 3,
            "pagePath": "../../pages/timing/timing",
            "iconPath": "../../static/add.png",
            "selectedIconPath": "../../static/add-active.png"
          },
          {
            "id": 4,
            "pagePath": "../../pages/chatting/chatting",
            "iconPath": "../../static/chat.png",
            "selectedIconPath": "../../static/chat-active.png"
          },
          {
            "id": 5,
            "pagePath": "../../pages/mine/mine",
            "iconPath": "../../static/mine.png",
            "selectedIconPath": "../../static/mine-active.png"
          },
        ]
      };
    },
    methods: {
      SwitchTab(item) {
        console.log(item)
        // if (item.id == '3') {
        //   this.top = -210
        // }
        uni.switchTab({
          url: item.pagePath
        });
      },
    }
  }
</script>

<style scoped lang="less">
  .tab-box {
    display: flex;
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 120rpx;
    z-index: 99;
    background-color: #ffffff;
    justify-content: space-evenly;
    align-items: center;
    border-top-left-radius: 50rpx;
    border-top-right-radius: 50rpx;
    box-shadow: 10px 10px 20px 1px rgba(0, 0, 0, .3);

    & .item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      & image {
        width: 50rpx;
        height: 50rpx;
      }
    }

    & .item:nth-child(3) {
      margin-top: -120rpx;

      & image {
        width: 110rpx;
        height: 110rpx;
      }
    }

  }
</style>
