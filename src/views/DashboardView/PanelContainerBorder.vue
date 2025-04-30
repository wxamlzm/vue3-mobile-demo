<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="computedWidth"
    :height="computedHeight"
    :viewBox="viewBox"
    preserveAspectRatio="xMidYMid meet"
    shape-rendering="crispEdges"
  >
    <defs>
      <!-- 增强型渐变配置 -->
      <linearGradient
        id="linear-border"
        :x1="gradientX1"
        :y1="gradientY"
        :x2="gradientX2"
        :y2="gradientY"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stop-color="#00a3ff" />
        <!-- 颜色加深 -->
        <stop offset="0.1" stop-color="#00a3ff" stop-opacity="1" />
        <stop offset="0.15" stop-color="#00a3ff" stop-opacity="0.2" />
        <!-- 缩短透明区间 -->
        <stop offset="0.85" stop-color="#00a3ff" stop-opacity="0.2" />
        <stop offset="0.9" stop-color="#00a3ff" stop-opacity="1" />
        <stop offset="1" stop-color="#008cff" />
      </linearGradient>

      <!-- 锐化滤镜 -->
      <filter
        id="border-filter"
        :x="filterX"
        :y="filterY"
        :width="filterWidth"
        :height="filterHeight"
        color-interpolation-filters="sRGB"
      >
        <feComponentTransfer>
          <feFuncA type="discrete" tableValues="0 1 1 1" />
          <!-- Alpha通道锐化 -->
        </feComponentTransfer>
      </filter>
    </defs>

    <!-- 优化路径绘制 -->
    <path
      :d="pathData"
      stroke="url(#linear-border)"
      fill="none"
      :stroke-width="border"
      stroke-linecap="square"
      stroke-linejoin="miter"
      stroke-miterlimit="4"
      filter="url(#border-filter)"
      vector-effect="non-scaling-stroke"
    />
  </svg>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps({
  width: {
    // 控制上下边横向长度
    type: Number,
    default: 600
  },
  height: {
    // 控制左右边纵向高度
    type: Number,
    default: 800
  },
  border: {
    // 边框粗细
    type: Number,
    default: 2
  },
  corner: {
    // 拐角长度
    type: Number,
    default: 20
  }
})

// 动态路径生成（对称修复版）
const pathData = computed(() => {
  const w = props.width
  const h = props.height
  const c = props.corner

  return `
    M${c},0
    H${w - c}
    L${w},${c}
    V${h - c}
    L${w - c},${h}
    H${c}
    L0,${h - c}
    V${c}
    L${c},0
    Z
  `
    .replace(/\n\s+/g, ' ')
    .trim()
})

// 渐变定位系统
const gradientX1 = computed(() => props.corner)
const gradientX2 = computed(() => props.width - props.corner)
const gradientY = computed(() => props.height / 2)

// 滤镜定位系统
const filterX = computed(() => -props.border * 2)
const filterY = computed(() => -props.border * 2)
const filterWidth = computed(() => props.width + props.border * 4)
const filterHeight = computed(() => props.height + props.border * 4)

// 尺寸计算
const computedWidth = computed(() => props.width + props.border * 2)
const computedHeight = computed(() => props.height + props.border * 2)

// viewBox动态计算
// 其他计算属性保持不变，仅新增以下优化：
const viewBox = computed(() => {
  // 添加0.5像素偏移解决亚像素渲染问题
  return `${-props.border - 0.5} ${-props.border - 0.5} 
          ${props.width + props.border * 2 + 1} 
          ${props.height + props.border * 2 + 1}`
})
</script>
