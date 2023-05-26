<template>
  <view class="container">
    <view class="calendar">
      <view class="calendar-header">
        <view class="prev-month" @click="prevMonth"><uni-icons type="back" size="20"></uni-icons> </view>

        <view class="month">{{ currentYear }}年{{ currentMonth }}月</view>
        <view class="next-month" @click="nextMonth"><uni-icons type="forward" size="20"></uni-icons>
        </view>
      </view>
      <view class="calendar-body">
        <view class="calendar-week">
          <view class="calendar-day">日</view>
          <view class="calendar-day">一</view>
          <view class="calendar-day">二</view>
          <view class="calendar-day">三</view>
          <view class="calendar-day">四</view>
          <view class="calendar-day">五</view>
          <view class="calendar-day">六</view>
        </view>
        <view class="calendar-days">
          <view v-for="(day, index) in days" :key="index"
            :class="['calendar-day ' + day.class,day.date == dataDay ? 'active' : '',day.date == indexClick ? 'activeClick' :'' ]" @click="getEvents(day.date);changeIndexClick(day.date)" ref="a">
            <view class="calendar-day-number" :class="day.date < dateDay ? 'textColor':''">{{ day.date }}</view>
            <view class="calendar-day-event" v-if="day.events && day.events.length > 0">{{ day.events.length }}</view>
          </view>
        </view>
      </view>
    </view>
    <view class="event-list">
      <view class="event-list-header">事件列表</view>
      <view class="event-list-body">
        <view class="event" v-for="(event, index) in events" :key="index">
          <view class="event-date">{{ event.event_startTime }}</view>
          <view class="event-title">{{ event.event_name }}</view>
          <view class="event-description">{{ event.event_classify }}</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    data() {
      return {
        currentYear: this.getCurrentYear(),
        currentMonth: this.getCurrentMonth(),
        dataDay: this.getCurrentDay(),
        days: [],
        events: [],
        currentIndex: 0,
        indexClick:null
      }
    },
    mounted() {
      this.updateCalendar()
      console.log(this.dataDay);
    },
    computed:{
      ...mapState('m_user',['Uid'])
    },
    methods: {
      getCurrentMonth() {
        const date = new Date()
        let month = date.getMonth() + 1
        month = month > 9 ? month : '0' + month
        return month
      },

      getCurrentYear() {
        const date = new Date()
        return date.getFullYear()
      },
      getCurrentDay() {
        const date = new Date()
        console.log(date);
        return date.getDate()
      },
      updateCalendar() {
        const days = []
        const firstDay = new Date(this.currentYear, this.currentMonth - 1, 1).getDay()
        const lastDate = new Date(this.currentYear, this.currentMonth, 0).getDate()
        for (let i = 0; i < firstDay; i++) {
          days.push({
            date: '',
            class: 'empty'
          })
        }
        for (let i = 1; i <= lastDate; i++) {
          const date = new Date(this.currentYear, this.currentMonth - 1, i)

          days.push({
            date: i,
            class: '',
          })
        }
        this.days = days
        console.log(days);
      },
      prevMonth() {
        if (this.currentMonth === 1) {
          this.currentYear--
          this.currentMonth = 12
        } else {
          this.currentMonth--
        }
        this.updateCalendar()
      },
      nextMonth() {
        if (this.currentMonth === 12) {
          this.currentYear++
          this.currentMonth = 1
        } else {
          this.currentMonth++
        }
        this.updateCalendar()
      },
      changeIndexClick(day) {
        this.indexClick = day
        // console.log(day);
        // if (!day.date) {
        //   return
        // }
        // this.events = []
        // console.log(this.events);
      },
      async getEvents(day) {
        this.events = []
        // for (let i = 0; i < this.events.length; i++) {
        //   const event = this.events[i]
        //   if (event.date === this.formatDate(date)) {
        //     events.push(event)
        //   }
        // }
        // return events
        console.log('date',day);
        const date = `${this.currentYear}-${this.currentMonth}-${day}`
        console.log(date);
        const res = await this.request({
          url:`/user/eventList/${this.Uid}`
        })
        if(res.code == 200){
          console.log('res',res);
          this.events = res.data[0].items
           console.log('this.events',this.events);
        }
        
      },
      formatDate(date) {
        const year = date.getFullYear()
        const month = date.getMonth() + 1
        const day = date.getDate()
        return year + '-' + (month < 10 ? '0' + month : month) + '-' + (day < 10 ? '0' + day : day)
      }
    }
  }
</script>

<style scoped>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;

    /* height: 100vh; */
    background-color: #f0f0f0;
  }

  .calendar {
    background-color: #fff;
    box-shadow: 0 0 5px #ccc;
    border-radius: 5px;
    overflow: hidden;
    margin-bottom: 20px;
  }

  .calendar-header {
    display: flex;
    align-items: center;
    /* justify-content: center; */
    justify-content: space-evenly;
    height: 40px;
    font-size: 18px;
    font-weight: bold;
    color: #333;
  }

  .prev-month,
  .next-month {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    cursor: pointer;
  }

  .month {
    flex: 1;
    text-align: center;
  }

  .calendar-body {
    display: flex;
    flex-direction: column;
    align-items: stretch;
  }

  .calendar-week {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 30px;
    background-color: #f0f0f0;
  }

  .calendar-day {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: calc(100% / 7);
    height: 60px;
    font-size: 14px;
    color: #333;
    cursor: pointer;
  }

  .calendar-day-number {
    font-size: 20px;
    font-weight: bold;
        z-index: 999;
  }
  .active{
    position: relative;
  }
  .active::after {
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    border-radius: 50%;
    background-color: pink;
  }

  .textColor {
    color: #c0c0c0 !important;
  }

  .calendar-day-event {
    margin-top: 5px;
    font-size: 12px;
    color: #999;
  }

  .calendar-day.empty {
    background-color: #f0f0f0;
  }

  .calendar-days {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    background-color: #f0f0f0;
  }

  .event-list {
    background-color: #fff;
    box-shadow: 0 0 5px #ccc;
    border-radius: 5px;
    overflow: hidden;
  }

  .event-list-header {
    height: 40px;
    font-size: 18px;
    font-weight: bold;
    color: #333;
    padding: 0 10px;
    border-bottom: 1px solid #ccc;
  }

  .event-list-body {
    padding: 10px;
  }

  .event {
    margin-bottom: 10px;
  }

  .event-date {
    font-size: 14px;
    color: #999;
    margin-bottom: 5px;
  }

  .event-title {
    font-size: 16px;
    font-weight: bold;
    color: #333;
    margin-bottom: 5px;
  }

  .event-description {
    font-size: 14px;
    color: #666;
    line-height: 1.5;
  }
  
  .activeClick{
     background-color: #6792f8;
  }
</style>


<!-- <template>
  <view class="calendar">
    <swiper :current="currentIndex" @change="onSwiperChange">
      <swiper-item v-for="(month, index) in months" :key="index">
        <view class="month">{{ month.title }}</view>
        <view class="days">
          <view class="day" v-for="(day, dayIndex) in month.days" :key="dayIndex">
            {{ day }}
          </view>
        </view>
      </swiper-item>
    </swiper>
  </view>
</template>

<script>
export default {
  data() {
    return {
      currentIndex: 0,
      months: []
    }
  },
  mounted() {
    this.generateMonths(new Date().getFullYear(), new Date().getMonth() + 1)
  },
  methods: {
    generateMonths(year, month) {
      const months = []
      for (let i = -1; i <= 1; i++) {
        const date = new Date(year, month + i, 1)
        const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
        const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)
        months.push({
          title: date.toLocaleString('default', { month: 'long', year: 'numeric' }),
          days
        })
      }
      this.months = months
    },
    onSwiperChange(e) {
      this.currentIndex = e.detail.current
    }
  }
}
</script>

<style>
.calendar {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.month {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}

.days {
  display: flex;
  flex-wrap: wrap;
}

.day {
  width: calc(100% / 7);
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #ddd;
}
</style>
 -->