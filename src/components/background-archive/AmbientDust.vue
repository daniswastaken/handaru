<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

const canvasRef = ref<HTMLCanvasElement | null>(null)

interface Particle {
  x: number
  y: number
  size: number
  alpha: number
  speedX: number
  speedY: number
  alphaChange: number
}

let ctx: CanvasRenderingContext2D | null = null
let width = 0
let height = 0
let particles: Particle[] = []
let animationFrame: number

const PARTICLE_COUNT = 80 // Sparse to keep it ambient
const PARTICLE_BASE_SIZE = 1.2 // Small dots

function initParticles() {
  particles = []
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push(createParticle(true))
  }
}

function createParticle(randomizePosition = false): Particle {
  return {
    x: randomizePosition ? Math.random() * width : Math.random() * width,
    y: randomizePosition ? Math.random() * height : height + 10,
    size: Math.random() * PARTICLE_BASE_SIZE + 0.3,
    alpha: Math.random() * 0.4 + 0.1, // Max opacity ~0.5
    speedX: (Math.random() - 0.5) * 0.15, // Very slow horizontal
    speedY: (Math.random() - 0.5) * 0.1 - 0.1, // Mostly drifting upwards slowly
    alphaChange: (Math.random() - 0.5) * 0.003 // Slowly fade in/out
  }
}

function handleResize() {
  if (!canvasRef.value) return
  width = window.innerWidth
  height = window.innerHeight
  
  canvasRef.value.style.width = `${width}px`
  canvasRef.value.style.height = `${height}px`
  
  const dpr = window.devicePixelRatio || 1
  canvasRef.value.width = width * dpr
  canvasRef.value.height = height * dpr
  
  ctx = canvasRef.value.getContext('2d')
  if (ctx) {
    ctx.scale(dpr, dpr)
  }
  
  initParticles()
}

function draw() {
  if (!ctx) return
  
  ctx.clearRect(0, 0, width, height)
  
  for (let i = 0; i < particles.length; i++) {
    const p = particles[i]
    p.x += p.speedX
    p.y += p.speedY
    p.alpha += p.alphaChange
    
    // Wrap around horizontally
    if (p.x < 0) p.x = width
    if (p.x > width) p.x = 0
    
    // If drifts off top, reset to bottom
    if (p.y < -10) {
      particles[i] = createParticle(false)
      particles[i].y = height + 10
    }
    // If drifts off bottom, wrap to top
    if (p.y > height + 10) {
        p.y = -10
    }
    
    // Alpha bounce
    if (p.alpha > 0.5) {
        p.alpha = 0.5
        p.alphaChange *= -1
    }
    if (p.alpha < 0.05) {
        p.alpha = 0.05
        p.alphaChange *= -1
    }
    
    ctx.beginPath()
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`
    ctx.fill()
  }

  animationFrame = requestAnimationFrame(draw)
}

onMounted(() => {
  handleResize()
  window.addEventListener('resize', handleResize)
  draw()
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
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
