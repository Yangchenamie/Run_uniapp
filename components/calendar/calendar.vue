<template>
  <view>
    <view class="weekdays">
      <text v-for="day in weekdays" :key="day">{{day}}</text>
    </view>
    <view class="days">
      <view v-for="(week, weekIndex) in weeks" :key="weekIndex" class="week">
        <text v-for="(day, dayIndex) in week" :key="dayIndex"
          :class="{'disabled': !day.isCurrentMonth, 'today': day.isToday, 'selected': day.isSelected}"
          @tap="onSelect(day.date)">{{day.day}}</text>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    props: {
      events: {
        type: Array,
        default: () => []
      }
    },
    data() {
      return {
        weekdays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        weeks: [],
        today: new Date(),
        selectedDate: ''
      }
    },
    created() {
      this.generateCalendar()
    },
    methods: {
      generateCalendar() {
        const year = this.today.getFullYear()
        const month = this.today.getMonth()
        const firstDayOfMonth = new Date(year, month, 1).getDay()
        const lastDayOfMonth = new Date(year, month + 1, 0).getDate()
        const lastDayOfPrevMonth = new Date(year, month, 0).getDate()
        const weeks = []
        let days = []

        for (let i = firstDayOfMonth - 1; i >= 0; i--) {
          const date = new Date(year, month - 1, lastDayOfPrevMonth - i)
          days.push({
            day: date.getDate(),
            date: date,
            isCurrentMonth: false,
            isToday: this.isToday(date),
            isSelected: false,
            events: this.getEvents(date)
          })
        }

        for (let i = 1; i <= lastDayOfMonth; i++) {
          const date = new Date(year, month, i)
          days.push({
            day: i,
            date: date,
            isCurrentMonth: true,
            isToday: this.isToday(date),
            isSelected: false,
            events: this.getEvents(date)
          })
        }

        const lastDayOfCurrentMonth = new Date(year, month, lastDayOfMonth).getDay()
        for (let i = 1; i <= 6 - lastDayOfCurrentMonth; i++) {
          const date = new Date(year, month + 1, i)
          days.push({
            day: date.getDate(),
            date: date,
            isCurrentMonth: false,
            isToday: this.isToday(date),
            isSelected: false,
            events: this.getEvents(date)
          })
        }

        while (days.length) {
          weeks.push(days.splice(0, 7))
        }

        this.weeks = weeks
      },
      isToday(date) {
        const today = new Date()
        return date.getFullYear() === today.getFullYear() && date.getMonth() === today.getMonth() && date.getDate() ===
          today.getDate()
      },
      getEvents(date) {
        return this.events.filter(event => {
          const eventDate = new Date(event.date)
          return eventDate.getFullYear() === date.getFullYear() && eventDate.getMonth() === date.getMonth() &&
            eventDate.getDate() === date.getDate()
        })
      },
      onSelect(date) {
        if (!date) return
        const selectedDate = new Date(date)
        this.weeks.forEach(week => {
          week.forEach(day => {
            day.isSelected = false
          })
        })
        this.weeks[selectedDate.getWeekOfMonth() - 1][selectedDate.getDay()].isSelected = true
        this.$emit('select', selectedDate)
      }
    }
  }
</script>
