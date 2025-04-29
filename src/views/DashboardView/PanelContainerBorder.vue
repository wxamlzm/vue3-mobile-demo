<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="ORIGINAL_WIDTH"
    :height="props.height"
    :viewBox="viewBox"
    preserveAspectRatio="xMidYMid meet"
  >
    <defs>
      <linearGradient
        id="linear-gradient"
        :x1="gradientX1"
        :y1="gradientY"
        :x2="gradientX2"
        :y2="gradientY"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stop-color="#0cf" />
        <stop offset="0.195" stop-color="#0cf" stop-opacity="0" />
        <stop offset="0.797" stop-color="#0cf" stop-opacity="0" />
        <stop offset="1" stop-color="#0cf" />
      </linearGradient>

      <filter
        id="filter"
        :x="filterX"
        :y="filterY"
        :width="filterWidth"
        :height="filterHeight"
        filterUnits="userSpaceOnUse"
      >
        <!-- 你的滤镜内容 -->
      </filter>
    </defs>

    <path
      :d="pathData"
      transform="translate(-13, -1430.69)"
      stroke="url(#linear-gradient)"
      fill-rule="evenodd"
      fill-opacity="0.1"
    />
  </svg>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

// 常量定义
const ORIGINAL_WIDTH = 713
const PATH_START_X = 34
const PATH_START_Y = 1431.7
const CORNER_SIZE = 20
const TRANSLATE_X = -13
const TRANSLATE_Y = -1430.69

const props = defineProps({
  height: {
    type: Number,
    default: 1261.31
  }
})

// 动态计算
const verticalHeight = computed(() => props.height - CORNER_SIZE * 2)

const pathData = computed(() =>
  `
  M${PATH_START_X},${PATH_START_Y}
  H${PATH_START_X + 671}
  l${CORNER_SIZE},${CORNER_SIZE}
  v${verticalHeight.value}
  l-${CORNER_SIZE},${CORNER_SIZE}
  H${PATH_START_X}
  l-${CORNER_SIZE},-${CORNER_SIZE}
  V${PATH_START_Y + CORNER_SIZE}
  Z`.replace(/\n\s+/g, ' ')
)

const gradientY = computed(
  () => PATH_START_Y + CORNER_SIZE + verticalHeight.value / 2 + TRANSLATE_Y
)

const gradientX1 = computed(() => PATH_START_X - 20 + TRANSLATE_X)
const gradientX2 = computed(() => PATH_START_X + 671 + CORNER_SIZE + TRANSLATE_X)

const filterX = computed(() => PATH_START_X - CORNER_SIZE + TRANSLATE_X)
const filterY = computed(() => PATH_START_Y + TRANSLATE_Y)
const filterWidth = 705 - PATH_START_X + CORNER_SIZE * 2
const filterHeight = computed(() => verticalHeight.value + CORNER_SIZE * 2 + Math.abs(TRANSLATE_Y))

const viewBox = computed(
  () => `0 0 ${ORIGINAL_WIDTH} ${verticalHeight.value + CORNER_SIZE * 2 + Math.abs(TRANSLATE_Y)}`
)
</script>
