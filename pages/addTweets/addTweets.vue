<template>
  <view class="content">
    <view class="conTab">
      <view class="conTab-left" @click="selectAddress">
        <image src="../../static/地址.png" mode=""></image>
        <span>{{local}}</span>
      </view>
      <view class="conTab-right">
        <button @click="postTweets">发表</button>
      </view>
    </view>
    <view class="Con">
      <textarea placeholder="表达你的想法..." v-model="content"></textarea>
    </view>
  </view>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    data() {
      return {
        local: '',
        content:''
      }
    },
    computed:{
      ...mapState('m_user',['Uid'])
    },
    methods: {
      async postTweets() {
        const res = await this.request({
          url: `/user/postEssay`,
          method: 'POST',
          data: {
            Uid: this.Uid,
            content: this.content,
            picture: null
          }
        })
        console.log(res);
        if (res.code == 200) {
          uni.navigateTo({
            url: '/pages/tweets/tweets'
          })
        }
      },
      selectAddress() {
        let that = this;
        // 1、判断手机定位服务【GPS】 是否授权
        uni.getSystemInfo({
          success(res) {
            console.log("判断手机定位服务是否授权:", res);
            let locationEnabled = res.locationEnabled; //判断手机定位服务是否开启
            let locationAuthorized = res.locationAuthorized; //判断定位服务是否允许微信授权
            if (locationEnabled == false || locationAuthorized == false) {
              //手机定位服务（GPS）未授权
              uni.showToast({
                title: "请打开手机GPS",
                icon: "none",
              });
            } else {
              console.log('已授权');
              //手机定位服务（GPS）已授权
              // 2、判断微信小程序是否授权位置信息
              // 微信小程序已授权位置信息
              uni.authorize({
                //授权请求窗口
                scope: "scope.userLocation", //授权的类型
                success: (res) => {
                  console.log('实现fnGetlocation（）');
                  that.fnGetlocation();
                },
                fail: (err) => {
                  err = err["errMsg"];
                  uni
                    .showModal({
                      content: "需要授权位置信息",
                      confirmText: "确认授权",
                    })
                    .then((res) => {
                      console.log('是否确认授权', res);
                      if (res[1]["confirm"]) {
                        uni.openSetting({
                          success: (res) => {
                            if (res.authSetting["scope.userLocation"]) {
                              // 授权成功
                              uni.showToast({
                                title: "授权成功",
                                icon: "none",
                              });
                              that.fnGetlocation();
                            } else {
                              // 未授权
                              uni.showToast({
                                title: "授权失败,请重新授权",
                                icon: "none",
                              });
                              uni.showModal({
                                title: "授权",
                                content: "获取授权" +
                                  authouName +
                                  "失败,是否前往授权设置？",
                                success: function(result) {
                                  if (result.confirm) {
                                    uni.openSetting();
                                  }
                                },
                                fail: function() {
                                  uni.showToast({
                                    title: "系统错误！",
                                    icon: "none",
                                  });
                                },
                              });
                            }
                          },
                        });
                      }
                      if (res[1]["cancel"]) {
                        // 取消授权
                        uni.showToast({
                          title: "你拒绝了授权，无法获得周边信息",
                          icon: "none",
                        });
                      }
                    });
                },
                complete(res) {
                  // console.log('授权弹框', res);
                  if (res.errMsg == "authorize:ok") {
                    that.fnGetlocation();
                  } else {
                    uni.showModal({
                      title: "授权",
                      content: "获取授权" + authouName + "失败,是否前往授权设置？",
                      success: function(result) {
                        if (result.confirm) {
                          uni.openSetting();
                        }
                      },
                      fail: function() {
                        uni.showToast({
                          title: "系统错误！",
                          icon: "none",
                        });
                      },
                    });
                  }
                },
              });
            }
          },
        });
      },
      // 定位获取
      fnGetlocation() {
        let that = this
        console.log('开始实现fnGetlocation');
        uni.chooseLocation({
          type: 'wgs84',
          // geocode: true, //设置该参数为true可直接获取经纬度及城市信息
          success: function(res) {
            console.log(res)
            // that.addrDel = res;
            console.log('res', res);
            that.local = res.address
            console.log('that.local', that.local);
          },
          fail: function() {
            uni.showToast({
              title: '获取地址失败，将导致部分功能不可用',
              icon: 'none'
            });
          }
        });
      },
    }
  }
</script>

<style scoped lang="less">
  .content {
    & .conTab {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 30rpx;
      box-sizing: border-box;
      margin-top: 20rpx;

      & .conTab-left {
        & image {
          width: 60rpx;
          height: 60rpx;
        }
      }

      & .conTab-right {
        & button {
          width: 200rpx;
          height: 80rpx;
          background-color: #1B5ED0;
          border-radius: 18rpx;
          color: #fff;
          line-height: 80rpx;
        }
      }
    }

    & .Con {
      margin-top: 50rpx;
      padding: 0 20rpx;

      & textarea {
        width: 100%;
      }
    }
  }
</style>