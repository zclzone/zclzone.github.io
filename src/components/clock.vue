<template>
  <div class="clock-container">
    <div class="panel-container">
      <div class="box">
        <div
          class="num"
          :style="`transform: rotate(${120 + (num - 1) * 30}deg);`"
          v-for="num in 12"
          :key="num"
        >
          <span :style="`transform: rotate(-${120 + (num - 1) * 30}deg);`">{{num}}</span>
        </div>
        <div class="point">
          <span></span>
        </div>
        <div class="hand second" :style="`transform: rotate(${secondDeg}deg);`">
          <span></span>
        </div>
        <div class="hand minute" :style="`transform: rotate(${minuteDeg}deg);`">
          <span></span>
        </div>
        <div class="hand hour" :style="`transform: rotate(${hourDeg}deg);`">
          <span></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'Clock',
  setup() {
    let time = new Date()
    let hh = time.getHours()
    let mm = time.getMinutes()
    let ss = time.getSeconds()

    const hourDeg = ref(((hh % 12) + mm / 60 + ss / 3600) * 30 + 90)
    const minuteDeg = ref((mm + ss / 60) * 6 + 90)
    const secondDeg = ref(ss * 6 + 90)
    setInterval(() => {
      time = new Date()
      hh = time.getHours()
      mm = time.getMinutes()
      ss = time.getSeconds()
      hourDeg.value = ((hh % 12) + mm / 60 + ss / 3600) * 30 + 90
      minuteDeg.value = (mm + ss / 60) * 6 + 90
      secondDeg.value = ss * 6 + 90
    }, 1000)

    return {
      hourDeg,
      minuteDeg,
      secondDeg,
    }
  },
}
</script>


<style lang="scss" scoped>
.clock-container {
  width: 200px;
  height: 200px;
  background: #fff;
  border-radius: 50%;
  margin: 0 auto;
  @media screen and (max-width: 600px) {
    & {
      display: none;
    }
  }
}
.clock-container .panel-container {
  height: 100%;
  width: 100%;
  border-radius: 50%;
  border: 5px solid #fff;
  box-shadow: 0 0 10px 0 rgba(7, 7, 7, 0.459) inset;
  display: flex;
  align-items: center;
  justify-content: center;
}

.clock-container .panel-container .box {
  position: relative;
  margin: 15px;
  width: 100%;
  display: flex;
  align-items: center;
}

.clock-container .panel-container .box .num,
.point,
.hand {
  position: absolute;
  font-size: 14px;
  width: 100%;
}

.clock-container .panel-container .box .num span {
  display: inline-block;
}

.clock-container .panel-container .box .point span {
  display: block;
  margin: 0 auto;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #000;
}
.clock-container .panel-container .box .hand {
  display: flex;
  align-items: center;
}
.clock-container .panel-container .box .hand span {
  background: #000;
  display: block;
}
.clock-container .panel-container .box .hand.second span {
  width: calc(50% - 20px);
  height: 1px;
  border-radius: 5px;
  margin-left: 20px;
}

.clock-container .panel-container .box .hand.minute span {
  width: calc(50% - 30px);
  height: 2px;
  border-radius: 5px;
  margin-left: 30px;
}

.clock-container .panel-container .box .hand.hour span {
  width: calc(50% - 40px);
  height: 3px;
  border-radius: 5px;
  margin-left: 40px;
}
</style>