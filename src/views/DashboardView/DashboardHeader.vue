<template>
  <div class="dashboard-header">
    <div>
      <section class="page-title" data-text="数智管控平台">数智管控平台</section>
      <section class="current-day">当前日期：{{ currentDay }}</section>
    </div>
  </div>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs'
const currentDay = dayjs().format('YYYY-MM-DD')
</script>

<style lang="less" scoped>
@pageTitleSize: 70px;
.dashboard-header {
  padding: 0 20px;
  & > div {
    border: 1px #0297db solid;
    position: relative;
    text-align: center;
    padding: 100px;

    & > section {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      width: 100%;
    }
  }

  .page-title {
    background: linear-gradient(to bottom, #f6fcfe, #0cbaec);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    font-weight: bold;
    font-size: @pageTitleSize;
    top: 0;
    transform: translate(-50%, -50%);
  }

  .current-day {
    bottom: 0;
    transform: translate(-50%, 70%);
    width: 563px;
    height: 66px;
    background: linear-gradient(to bottom, #01b1e8 0%, #0578cc 100%);
    clip-path: polygon(52.5px 0, 510.5px 0, 563px 66px, 0% 66px);
    font-weight: bold;
    color: #fff;
    padding: 17px 0;
  }
}
</style>
