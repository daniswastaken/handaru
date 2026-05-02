<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

const canvasRef = ref<HTMLCanvasElement | null>(null)

// Configuration
const GRID_SIZE = 30 // More divided
const MOUSE_RADIUS = 200 // Slightly smaller radius for tighter warp
const DISTORTION_STRENGTH = 0.35 // Slightly lower to keep it elegant
const LINE_COLOR = 'rgba(255, 255, 255, 0.05)' // More subtle
const BACKGROUND_COLOR = '#050505'

let ctx: CanvasRenderingContext2D | null = null
let width = 0
let height = 0
let mouse = { x: -1000, y: -1000 }
let animationFrame: number

function handleResize() {
  if (!canvasRef.value) return
  width = window.innerWidth
  height = window.innerHeight
  
  // Set display size
  canvasRef.value.style.width = `${width}px`
  canvasRef.value.style.height = `${height}px`
  
  // Set actual resolution
  const dpr = window.devicePixelRatio || 1
  canvasRef.value.width = width * dpr
  canvasRef.value.height = height * dpr
  
  ctx = canvasRef.value.getContext('2d')
  if (ctx) {
    ctx.scale(dpr, dpr)
    draw() // Redraw on resize
  }
}

function handleMouseMove(e: MouseEvent) {
  mouse.x = e.clientX
  mouse.y = e.clientY
}

function getDistortedPoint(x: number, y: number) {
  const dx = x - mouse.x
  const dy = y - mouse.y
  const distanceSq = dx * dx + dy * dy
  const radiusSq = MOUSE_RADIUS * MOUSE_RADIUS

  if (distanceSq < radiusSq) {
    const distance = Math.sqrt(distanceSq)
    const t = distance / MOUSE_RADIUS

    // Sine bell curve: zero at center (t=0) and at edge (t=1), peaks at midpoint.
    // This prevents lines from spiking at the cursor and creates a smooth dent.
    const force = Math.sin(Math.PI * t)
    const distortion = force * DISTORTION_STRENGTH * -80 // Negative pulls toward cursor
    const angle = Math.atan2(dy, dx)

    return {
      x: x + Math.cos(angle) * distortion,
      y: y + Math.sin(angle) * distortion
    }
  }

  return { x, y }
}

function draw() {
  if (!ctx) return
  
  ctx.clearRect(0, 0, width, height)
  ctx.strokeStyle = LINE_COLOR
  ctx.lineWidth = 1

  // Draw Vertical Lines
  for (let x = 0; x <= width + GRID_SIZE; x += GRID_SIZE) {
    ctx.beginPath()
    for (let y = 0; y <= height + GRID_SIZE; y += 10) { // Step for smoothness
      const p = getDistortedPoint(x, y)
      if (y === 0) ctx.moveTo(p.x, p.y)
      else ctx.lineTo(p.x, p.y)
    }
    ctx.stroke()
  }

  // Draw Horizontal Lines
  for (let y = 0; y <= height + GRID_SIZE; y += GRID_SIZE) {
    ctx.beginPath()
    for (let x = 0; x <= width + GRID_SIZE; x += 10) {
      const p = getDistortedPoint(x, y)
      if (x === 0) ctx.moveTo(p.x, p.y)
      else ctx.lineTo(p.x, p.y)
    }
    ctx.stroke()
  }

  // Draw Mouse Glow
  const gradient = ctx.createRadialGradient(
    mouse.x, mouse.y, 0,
    mouse.x, mouse.y, MOUSE_RADIUS * 1.5
  )
  gradient.addColorStop(0, 'rgba(255, 255, 255, 0.03)')
  gradient.addColorStop(1, 'rgba(255, 255, 255, 0)')
  
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, width, height)

  animationFrame = requestAnimationFrame(draw)
}

onMounted(() => {
  handleResize()
  window.addEventListener('resize', handleResize)
  window.addEventListener('mousemove', handleMouseMove)
  draw()
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  window.removeEventListener('mousemove', handleMouseMove)
  cancelAnimationFrame(animationFrame)
})
</script>

<template>
  <canvas 
    ref="canvasRef" 
    class="fixed inset-0 pointer-events-none z-[-1]"
  />
</template>

<style scoped>
canvas {
  background-color: transparent;
}
</style>
