<!-- <template>
  <view class="content">
    <canvas canvas-id="canvas" style="width: 300px; height: 300px;"></canvas>
  </view>
</template>

<script>
  export default {
    name: "dateClock",
    data() {
      return {

      };
    },
    onReady() {
      
      
      // const clock = uni.createCanvasContext("canvas");
      const ctx = uni.createCanvasContext("canvas",this);
      console.log('111111');
      // 清除画布
      ctx.save()
      ctx.clearRect(0, 0, 300, 300)
      ctx.translate(150, 150)
      // 画圆线使用arc(中心点x,中心点y,半径,起始角度,结束角度)
      // 画大圆
      ctx.beginPath()
      ctx.arc(0, 0, 100, 0, 2 * Math.PI)
      // 划线
      ctx.stroke()
      ctx.closePath()
      // 划小圆
      ctx.beginPath()
      ctx.arc(0, 0, 5, 0, 2 * Math.PI)
      ctx.stroke()
      ctx.closePath()
      
      ctx.save()
      // 画刻度线
      ctx.lineWidth = 1;
      
      for (let i = 0; i < 60; i++) {
        // 6 = 360/60
        ctx.rotate(6 * Math.PI / 180)
        ctx.beginPath()
        ctx.moveTo(45, 0)
        ctx.lineTo(50, 0)
        ctx.stroke()
        ctx.closePath()
      }
      
      ctx.restore()
      ctx.save()
      
      // 画时针
      ctx.lineWidth = 5;
      for (let i = 0; i < 12; i++) {
        // 30 = 360/12
        ctx.rotate(30 * Math.PI / 180)
        ctx.beginPath()
        ctx.moveTo(42, 0)
        ctx.lineTo(50, 0)
        ctx.stroke()
        ctx.closePath()
      }
      
      ctx.restore()
      ctx.save()
      
      // 画数字
      ctx.font = '16px STheiti,SimHei';
      for (let i = 0; i < 12; i++) {
        // 30 = 360/12
        let numbers = ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ', 'Ⅵ', 'Ⅶ', 'Ⅷ', 'Ⅸ', 'Ⅹ', 'Ⅺ', 'Ⅻ'];
        ctx.rotate(30 * Math.PI / 180)
        ctx.fillText(numbers[i], -8, -60)
      }
      
      // 画时分秒
      // 获取当前时间
      let time = new Date();
      let hour = time.getHours() % 12;
      let min = time.getMinutes();
      let sec = time.getSeconds();
      
      // 画时针
      ctx.rotate((360 / 12 * hour - 90) * Math.PI / 180)
      ctx.beginPath()
      
      ctx.lineWidth = 10;
      ctx.moveTo(-5, 0)
      ctx.lineTo(20, 0)
      ctx.stroke()
      ctx.closePath()
      
      ctx.restore()
      ctx.save()
      
      // 画分针
      
      ctx.rotate((360 / 60 * min - 90) * Math.PI / 180)
      ctx.beginPath()
      
      ctx.lineWidth = 5;
      ctx.strokeStyle = 'blue';
      ctx.moveTo(-5, 0)
      ctx.lineTo(30, 0)
      ctx.stroke()
      ctx.closePath()
      
      ctx.restore()
      ctx.save()
      
      // 画秒针
      
      ctx.rotate((360 / 60 * sec - 90) * Math.PI / 180)
      ctx.beginPath()
      
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'red';
      ctx.moveTo(-5, 0)
      ctx.lineTo(40, 0)
      ctx.stroke()
      ctx.closePath()
      
      ctx.restore()
      ctx.restore()
    },
    methods: {
      // run() {
      //   this.timer = setInterval(() => {
      //     this.drawClock()
      //   }, 1000)
      // },

        drawClock() {
          // const ctx = uni.createCanvasContext("canvas",this);
          // console.log('111111');
          // // 清除画布
          // ctx.save()
          // ctx.clearRect(0, 0, 300, 300)
          // ctx.translate(150, 150)
          // // 画圆线使用arc(中心点x,中心点y,半径,起始角度,结束角度)
          // // 画大圆
          // ctx.beginPath()
          // ctx.arc(0, 0, 100, 0, 2 * Math.PI)
          // // 划线
          // ctx.stroke()
          // ctx.closePath()
          // // 划小圆
          // ctx.beginPath()
          // ctx.arc(0, 0, 5, 0, 2 * Math.PI)
          // ctx.stroke()
          // ctx.closePath()

          // ctx.save()
          // // 画刻度线
          // ctx.lineWidth = 1;

          // for (let i = 0; i < 60; i++) {
          //   // 6 = 360/60
          //   ctx.rotate(6 * Math.PI / 180)
          //   ctx.beginPath()
          //   ctx.moveTo(45, 0)
          //   ctx.lineTo(50, 0)
          //   ctx.stroke()
          //   ctx.closePath()
          // }

          // ctx.restore()
          // ctx.save()

          // // 画时针
          // ctx.lineWidth = 5;
          // for (let i = 0; i < 12; i++) {
          //   // 30 = 360/12
          //   ctx.rotate(30 * Math.PI / 180)
          //   ctx.beginPath()
          //   ctx.moveTo(42, 0)
          //   ctx.lineTo(50, 0)
          //   ctx.stroke()
          //   ctx.closePath()
          // }

          // ctx.restore()
          // ctx.save()

          // // 画数字
          // ctx.font = '16px STheiti,SimHei';
          // for (let i = 0; i < 12; i++) {
          //   // 30 = 360/12
          //   let numbers = ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ', 'Ⅵ', 'Ⅶ', 'Ⅷ', 'Ⅸ', 'Ⅹ', 'Ⅺ', 'Ⅻ'];
          //   ctx.rotate(30 * Math.PI / 180)
          //   ctx.fillText(numbers[i], -8, -60)
          // }

          // // 画时分秒
          // // 获取当前时间
          // let time = new Date();
          // let hour = time.getHours() % 12;
          // let min = time.getMinutes();
          // let sec = time.getSeconds();

          // // 画时针
          // ctx.rotate((360 / 12 * hour - 90) * Math.PI / 180)
          // ctx.beginPath()

          // ctx.lineWidth = 10;
          // ctx.moveTo(-5, 0)
          // ctx.lineTo(20, 0)
          // ctx.stroke()
          // ctx.closePath()

          // ctx.restore()
          // ctx.save()

          // // 画分针

          // ctx.rotate((360 / 60 * min - 90) * Math.PI / 180)
          // ctx.beginPath()

          // ctx.lineWidth = 5;
          // ctx.strokeStyle = 'blue';
          // ctx.moveTo(-5, 0)
          // ctx.lineTo(30, 0)
          // ctx.stroke()
          // ctx.closePath()

          // ctx.restore()
          // ctx.save()

          // // 画秒针

          // ctx.rotate((360 / 60 * sec - 90) * Math.PI / 180)
          // ctx.beginPath()

          // ctx.lineWidth = 1;
          // ctx.strokeStyle = 'red';
          // ctx.moveTo(-5, 0)
          // ctx.lineTo(40, 0)
          // ctx.stroke()
          // ctx.closePath()

          // ctx.restore()
          // ctx.restore()
        },
        run() {
          this.timer = setInterval(() => {
            this.drawClock()
          }, 1000)
        },
        stop() {
          clearInterval(this.timer)
        }

      //       drawClock() {
      //         const now = new Date()
      //         const sec = now.getSeconds()
      //         const min = now.getMinutes()
      //         let hr = now.getHours()
      //         hr = hr > 12 ? hr - 12 : hr
      //         const ctx = uni.createCanvasContext("canvas")
      //         console.log('1111111111');
      //         console.log(ctx);
      //         ctx.save()
      //         ctx.clearRect(0, 0, 300, 300);

      //         ctx.translate(150, 150)
      //         ctx.rotate(-Math.PI / 2)

      //         ctx.strokeStyle = "black"
      //         ctx.lineWidth = 5
      //         ctx.lineCap = "round"

      //         ctx.save()
      //         for (let i = 0; i < 12; i++) {
      //           ctx.beginPath()
      //           ctx.rotate(Math.PI / 6)
      //           ctx.moveTo(100, 0)
      //           ctx.lineTo(120, 0)
      //           ctx.stroke()
      //         }
      //         ctx.restore()
      //         ctx.save()
      //         ctx.lineWidth = 3
      //         for (let i = 0; i < 60; i++) {
      //           ctx.beginPath()
      //           ctx.rotate(Math.PI / 30)
      //           ctx.moveTo(110, 0)
      //           ctx.lineTo(120, 0)
      //           ctx.stroke()
      //         }
      //         ctx.restore()

      //         ctx.save()
      //         ctx.rotate(hr * (Math.PI / 6) + (Math.PI / 360) * min + (Math.PI / 21600) * sec)
      //         ctx.lineWidth = 14
      //         ctx.beginPath()
      //         ctx.moveTo(-20, 0)
      //         ctx.lineTo(80, 0)
      //         ctx.stroke()
      //         ctx.restore()

      // ctx.save()
      //         ctx.rotate(hr * (Math.PI / 30) + (Math.PI / 1800) * min + (Math.PI / 21600) * sec)
      //         ctx.lineWidth = 14
      //         ctx.beginPath()
      //         ctx.moveTo(-20, 0)
      //         ctx.lineTo(80, 0)
      //         ctx.stroke()
      //         ctx.restore()

      //         ctx.save()
      //         ctx.rotate(hr * (Math.PI / 6) + (Math.PI / 360) * min + (Math.PI / 21600) * sec)
      //         ctx.lineWidth = 10
      //         ctx.beginPath()
      //         ctx.moveTo(-28, 0)
      //         ctx.lineTo(105, 0)
      //         ctx.stroke()
      //         ctx.restore()

      //         ctx.restore()
      //       }
    }
  }
</script>

<style>

</style>
 -->
<template>
  <view class="content">
    <view class="flip-container">
      <view class="flip-items" v-for="(unit,unitIndex) of timeArr" :key="unitIndex">
        <view class="item" v-for="(item,index) of unit.max + 1" :key="index"
          :class="{current: unit.current == index, past: unit.current - 1 == index || index==unit.max && unit.current==0,}">
          <view class="up">
            <view class="inner">{{index }}</view>
            <view class="shadow"></view>
          </view>
          <view class="down">
            <view class="inner">{{index}}</view>
            <view class="shadow"></view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  function getTimeStr() {
    let time = new Date();
    let hour = ('00' + time.getHours()).slice(-2)
    let minute = ('00' + time.getMinutes()).slice(-2)
    let second = ('00' + time.getSeconds()).slice(-2)
    let timeStr = hour + minute + second
    return timeStr
  }
  export default {
    data() {
      return {
        timeStr: getTimeStr(),
        timeRunner: ''
      }
    },
    computed: {
      timeArr() {
        return [...this.timeStr].map((unit, index) => {
          let max;
          if (index & 1 == 1) { //时分秒的个位
            max = 9
          } else if (index == 0) { //时十位
            max = 2
          } else if (index == 2) { //分十位
            max = 5
          } else if (index == 4) { //秒十位
            max = 5
          }
          return {
            max,
            current: Number(unit),
          }
        })
      }
    },
    methods: {
      setTimeRunner() {
        this.timeRunner = setInterval(() => {
          this.timeStr = getTimeStr()
        }, 1000)
      }
    },
    created() {
      this.setTimeRunner()
    },
    beforeDestroy() {
      clearInterval(this.timeRunner)
    },
  }
</script>


<style lang="less">
  .content{
    width: 100%;
    text-align: center;
    display: flex;
    justify-content: space-evenly;
  }
  .flip-container {
    display: flex;
    justify-content: center;
    padding: 20rpx 40rpx;
    // position: relative;
    background-color: #fff;
    border-radius: 30rpx;
    box-shadow: 10px 10px 20px 1px rgba(0, 0, 0, .3);
    & .flip-items {
      position: relative;
      width: 60rpx;
      height: 90rpx;
      font-size: 78rpx;
      font-weight: bold;
      border-radius: 6rpx;
      box-shadow: 0 2rpx 18rpx rgba(0, 0, 0, 0.7);

      &:nth-of-type(2n+1) {
        margin-right: 12rpx;
      }
    }
  }

  .flip-container .flip-items:nth-of-type(2),
  .flip-container .flip-items:nth-of-type(4) {
    margin-right: 36rpx;
  }

  .flip-container .flip-items:nth-of-type(2)::after,
  .flip-container .flip-items:nth-of-type(4)::after,
  .flip-container .flip-items:nth-of-type(2)::before,
  .flip-container .flip-items:nth-of-type(4)::before {
    position: absolute;
    right: -18rpx;
    content: '';
    -webkit-transform: translateX(50%);
    transform: translateX(50%);
    width: 8rpx;
    height: 8rpx;
    border-radius: 50%;
    background-color: #333;
  }

  .flip-container .flip-items:nth-of-type(2)::before,
  .flip-container .flip-items:nth-of-type(4)::before {
    top: 25%;
  }

  .flip-container .flip-items:nth-of-type(2)::after,
  .flip-container .flip-items:nth-of-type(4)::after {
    bottom: 25%;
  }

  .flip-container .flip-items .item {
    z-index: 1;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    -webkit-perspective: 300rpx;
    perspective: 300rpx;
  }

  .flip-container .flip-items .item:before {
    content: '';
    position: absolute;
    top: 44.5rpx;
    left: 0;
    z-index: 9;
    width: 100%;
    height: 1rpx;
    min-height: 2px;
    background-color: rgba(0, 0, 0, 0.6);
  }

  .flip-container .flip-items .item .up,
  .flip-container .flip-items .item .down {
    position: absolute;
    left: 0;
    right: 0;
    height: 50%;
    overflow: hidden;
  }

  .flip-container .flip-items .item .up {
    -webkit-transform-origin: 50% 100%;
    transform-origin: 50% 100%;
    top: 0;
  }

  .flip-container .flip-items .item .down {
    -webkit-transform-origin: 50% 0%;
    transform-origin: 50% 0%;
    bottom: 0;
  }

  .flip-container .flip-items .item .inner {
    position: absolute;
    left: 0;
    width: 100%;
    height: 90rpx;
    line-height: 90rpx;
    color: #ccc;
    text-shadow: 0 2rpx 4rpx #000;
    text-align: center;
    background-color: #333;
    border-radius: 6rpx;
  }

  .flip-container .flip-items .item .up .inner {
    top: 0;
  }

  .flip-container .flip-items .item .down .inner {
    bottom: 0;
  }

  .flip-container .flip-items .item .up .shadow {
    border-top-left-radius: 6rpx;
    border-top-right-radius: 6rpx;
  }

  .flip-container .flip-items .item .down .shadow {
    border-bottom-left-radius: 6rpx;
    border-bottom-right-radius: 6rpx;
  }

  .flip-container .flip-items .item.past {
    z-index: 3;
  }

  .flip-container .flip-items .item.current {
    -webkit-animation: highter-level 0.5s 0.5s linear forwards;
    animation: highter-level 0.5s 0.5s linear forwards;
    z-index: 2;
  }

  .flip-container .flip-items .item.past .up {
    -webkit-animation: flip-past-up 0.5s linear both;
    animation: flip-past-up 0.5s linear both;
  }

  .flip-container .flip-items .item.current .down {
    -webkit-animation: flip-current-down 0.5s 0.5s linear both;
    animation: flip-current-down 0.5s 0.5s linear both;
  }

  @-webkit-keyframes flip-current-down {
    from {
      -webkit-transform: rotateX(90deg);
      transform: rotateX(90deg);
    }

    to {
      -webkit-transform: rotateX(0deg);
      transform: rotateX(0deg);
    }
  }

  @keyframes flip-current-down {
    from {
      -webkit-transform: rotateX(90deg);
      transform: rotateX(90deg);
    }

    to {
      -webkit-transform: rotateX(0deg);
      transform: rotateX(0deg);
    }
  }

  @-webkit-keyframes flip-past-up {
    from {
      -webkit-transform: rotateX(0deg);
      transform: rotateX(0deg);
    }

    to {
      -webkit-transform: rotateX(-90deg);
      transform: rotateX(-90deg);
    }
  }

  @keyframes flip-past-up {
    from {
      -webkit-transform: rotateX(0deg);
      transform: rotateX(0deg);
    }

    to {
      -webkit-transform: rotateX(-90deg);
      transform: rotateX(-90deg);
    }
  }

  @-webkit-keyframes highter-level {
    from {
      z-index: 4;
    }

    to {
      z-index: 4;
    }
  }

  @keyframes highter-level {
    from {
      z-index: 4;
    }

    to {
      z-index: 4;
    }
  }

  .flip-container .flip-items .item .shadow {
    position: absolute;
    width: 100%;
    height: 100%;
  }

  .flip-container .flip-items .item.past .up .shadow {
    background: linear-gradient(rgba(0, 0, 0, 0.1) 0%, #000 100%);
    -webkit-animation: show 0.5s linear both;
    animation: show 0.5s linear both;
  }

  .flip-container .flip-items .item.past .down .shadow {
    background: linear-gradient(#000 0%, rgba(0, 0, 0, 0.1) 100%);
    -webkit-animation: show 0.5s linear both;
    animation: show 0.5s linear both;
  }

  .flip-container .flip-items .item.current .up .shadow {
    background: linear-gradient(rgba(0, 0, 0, 0.1) 0%, #000 100%);
    -webkit-animation: hide 0.5s 0.3s linear both;
    animation: hide 0.5s 0.3s linear both;
  }

  .flip-container .flip-items .item.current .down .shadow {
    background: linear-gradient(#000 0%, rgba(0, 0, 0, 0.1) 100%);
    -webkit-animation: hide 0.5s 0.3s linear both;
    animation: hide 0.5s 0.3s linear both;
  }

  @-webkit-keyframes show {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }

  @keyframes show {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }

  @-webkit-keyframes hide {
    from {
      opacity: 1;
    }

    to {
      opacity: 0;
    }
  }

  @keyframes hide {
    from {
      opacity: 1;
    }

    to {
      opacity: 0;
    }
  }

  .other {
    position: absolute;
    font-size: 26px;
    left: 50%;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
    bottom: 50rpx;
  }
</style>
