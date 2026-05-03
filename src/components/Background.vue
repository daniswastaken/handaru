<script setup lang="ts">
import { onMounted, onUnmounted, ref, effectScope } from 'vue'
import { Application, Graphics, Sprite, Container } from 'pixi.js'
import { createNoise3D } from 'simplex-noise'
import { useEventListener, useMouse, useWindowSize } from '@vueuse/core'

const el = ref<HTMLDivElement | null>(null)
const { x: mouseX, y: mouseY } = useMouse()
const { width: windowWidth, height: windowHeight } = useWindowSize()
const isMouseInWindow = ref(true)

const SPACING = 35
const SCALE_BASE = 0.5
const NOISE_SCALE = 300
const INTERACTION_RADIUS = 150

const noise3d = createNoise3D()
const mountedScope = effectScope()

interface CrossPoint {
  sprite: Sprite
  baseX: number
  baseY: number
  phase: number
}

let app: Application | null = null
const points: CrossPoint[] = []
let dprFix = 1

async function init() {
  if (!el.value) return

  app = new Application()
  await app.init({
    backgroundAlpha: 0,
    antialias: true,
    resolution: window.devicePixelRatio || 1,
    resizeTo: el.value,
    eventMode: 'none',
  })

  el.value.appendChild(app.canvas)

  // Create Cross Texture
  const g = new Graphics()
    .setStrokeStyle({ width: 1.5, color: 0x666666 })
    .moveTo(-5, 0).lineTo(5, 0)
    .moveTo(0, -5).lineTo(0, 5)
    .stroke()
  
  const texture = app.renderer.generateTexture(g)

  const container = new Container()
  app.stage.addChild(container)

  function createGrid() {
    container.removeChildren()
    points.length = 0
    
    const w = window.innerWidth
    const h = window.innerHeight
    const isMobile = w < 768
    dprFix = isMobile ? (window.devicePixelRatio || 1) : 1
    const currentSpacing = SPACING / dprFix
    
    for (let x = currentSpacing / 2; x < w; x += currentSpacing) {
      for (let y = currentSpacing / 2; y < h; y += currentSpacing) {
        const sprite = new Sprite(texture)
        sprite.anchor.set(0.5)
        sprite.position.set(x, y)
        sprite.alpha = 0.25
        sprite.scale.set(SCALE_BASE / dprFix)
        container.addChild(sprite)
        
        points.push({
          sprite,
          baseX: x,
          baseY: y,
          phase: Math.random() * Math.PI * 2
        })
      }
    }
  }

  createGrid()

  app.ticker.add((time) => {
    const t = Date.now() / 5000
    
    for (const p of points) {
      const { sprite, baseX, baseY, phase } = p
      
      // Noise-based rotation
      const n = noise3d(baseX / NOISE_SCALE, baseY / NOISE_SCALE, t)
      const targetRotation = n * Math.PI
      
      // Mouse interaction
      let distSq = Infinity
      if (isMouseInWindow.value) {
        const dx = mouseX.value - baseX
        const dy = mouseY.value - baseY
        distSq = dx * dx + dy * dy
      }
      
      const radiusSq = INTERACTION_RADIUS * INTERACTION_RADIUS
      
      if (distSq < radiusSq) {
        const dist = Math.sqrt(distSq)
        const force = (1 - dist / INTERACTION_RADIUS)
        sprite.rotation += (targetRotation + force * Math.PI - sprite.rotation) * 0.1
        sprite.alpha = 0.25 + force * 0.4
        sprite.scale.set((SCALE_BASE + force * 0.3) / dprFix)
      } else {
        sprite.rotation += (targetRotation - sprite.rotation) * 0.05
        sprite.alpha += (0.25 - sprite.alpha) * 0.05
        const targetScale = SCALE_BASE / dprFix
        sprite.scale.set(sprite.scale.x + (targetScale - sprite.scale.x) * 0.05)
      }
    }
  })

  mountedScope.run(() => {
    useEventListener('resize', () => {
      if (app) {
        app.renderer.resize(window.innerWidth, window.innerHeight)
        createGrid()
      }
    })
    
    useEventListener(document, 'mouseout', (e: MouseEvent) => {
      if (!e.relatedTarget) {
        isMouseInWindow.value = false
      }
    })
    
    useEventListener(document, 'mouseover', () => {
      isMouseInWindow.value = true
    })
  })
}

onMounted(() => {
  init()
})

onUnmounted(() => {
  mountedScope.stop()
  if (app) {
    app.destroy(true, { children: true, texture: true })
  }
})
</script>

<template>
  <div ref="el" class="fixed inset-0 pointer-events-none z-[-1] opacity-60" />
</template>

<style scoped>
div {
  filter: blur(0.4px);
}
</style>
