<template>
  <view>
    <view class="con">
      <view class="con-item" @click="changePic">
        <view class="item-fl photo" >
          头像
        </view>
        <view class="item-fr" @click.stop="preview">
          <image :src="avatarurl" mode=""></image>
        </view>
      </view>
      <view class="con-item" @click="gotoSetName">
        <view class="item-fl">
          昵称
        </view>
        <view class="item-fr">
          {{nickname}}
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  import {mapState,mapMutations} from 'vuex'
  export default {
    data() {
      return {
        
      }
    },
    computed:{
      ...mapState('m_user',['avatarurl','nickname','Uid','phone'])
    },
    methods: {
      ...mapMutations('m_user',['updateavatarurl']),
      gotoPage(){
        uni.navigateTo({
          url:'../../pages/person/person'
        })
      },
      gotoSetName(){
        uni.navigateTo({
          url:'../changeNickName/changeNickName'
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
      async changePic(){
         let that = this
         let avatarUrl 
        uni.chooseMedia({
          count:1,
          mediaType: ['image','video'], //可以指定是原图还是压缩图，默认二者都有
          sourceType: ['camera','album'], //从相册选择
          success: function(res) {
            console.log(res);
            
            // console.log(this);
            // str = JSON.stringify(res.tempFilePaths[0])
            // that.detail.file = res.tempFilePaths;
             that.updateavatarurl(res.tempFiles[0].tempFilePath)
            console.log('res.tempFiles[0]',res.tempFiles[0].tempFilePath);
             avatarUrl = res.tempFiles[0].tempFilePath
             // const result = that.request({
             //   url:`/user/info/avatarUrl/${that.Uid}`,
             //   method:'POST',
             //   data:{
             //     avatarUrl
             //   },
             // })
             // if(result.code == 200){
             //   console.log(111);
             //   that.updateavatarurl(avatarUrl)
             // }
          },
          
        })
        
        
      }
    }
  }
</script>

<style lang="less">
  .tabNav {
    position: relative;
    width: 100%;
    // height: 92rpx;
    line-height: 92rpx;
    text-align: center;
    padding: 0 40rpx;
    box-sizing: border-box;
    color: #000;
    font-size: 40rpx;
    border-bottom: 20rpx solid #F1F1F1;
  
    .tabImg {
      position: absolute;
      left: 20px;
      width: 40rpx;
      height: 40rpx;
      // margin-top: 20rpx;
       
       & image{
         width: 100%;
         height: 100%;
       }
    }
  }
  .con{
    width: 100%;
    .con-item{
      display: flex;
      justify-content: space-between;
      padding: 50rpx 66rpx 20rpx;
      border-bottom:2rpx solid #f1f1f1;
      // padding: 0 66rpx;
      box-sizing: border-box;
      vertical-align: bottom;
      & image{
        width: 100rpx;
        height: 100rpx;
      }
      .item-fl{
        color: #000;
        font-size: 40rpx;
      }
      .item-fr{
        color: #595959;
      }
      .photo{
        margin-top: 50rpx;
      }
    }
  }
  .privacy{
    text-align: center;
    color: #6792FF;
    margin-top: 100rpx;
  }
</style>
