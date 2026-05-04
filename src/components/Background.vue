<script setup lang="ts">
import { onMounted, onUnmounted, ref, effectScope, nextTick } from 'vue'
import { Application, Graphics, Sprite, Container } from 'pixi.js'
import { createNoise3D } from 'simplex-noise'
import { useEventListener } from '@vueuse/core'

const el = ref<HTMLDivElement | null>(null)

// Raw JS vars for zero-latency cursor reads inside the Pixi ticker.
// Bypasses Vue's reactive scheduler, which can be 1+ frames stale
// on fast mouse movements, causing the "buggy" cursor tracking.
let rawMouseX = -9999
let rawMouseY = -9999
let isMouseInWindow = false
let isInteractionEnabled = true
let isMobile = false

const SPACING = 35
const SCALE_BASE = 0.5
const NOISE_SCALE = 200
const INTERACTION_RADIUS = 135

const noise3d = createNoise3D()
const mountedScope = effectScope()

interface CrossPoint {
  sprite: Sprite
  baseX: number
  baseY: number
  baseOpacity: number
}

let app: Application | null = null
const points: CrossPoint[] = []
const existingPoints = new Set<string>()
let lastSpacing = -1
let dprFix = 1

async function init() {
  if (!el.value) return

  app = new Application()
  await app.init({
    backgroundAlpha: 0,
    antialias: true,
    resolution: window.devicePixelRatio || 1,
    eventMode: 'none',
    autoDensity: true,
  })

  const canvas = app.canvas
  canvas.style.position = 'absolute'
  canvas.style.top = '0'
  canvas.style.left = '0'
  canvas.style.width = '100%'
  canvas.style.height = '100%'
  el.value.appendChild(canvas)

  await nextTick()
  app.renderer.resize(window.innerWidth, window.innerHeight)

  // Create Cross Texture
  const g = new Graphics()
    .setStrokeStyle({ width: 1.5, color: 0xCCCCCC })
    .moveTo(-5, 0).lineTo(5, 0)
    .moveTo(0, -5).lineTo(0, 5)
    .stroke()
  
  const texture = app.renderer.generateTexture(g)

  const container = new Container()
  app.stage.addChild(container)

  function createGrid() {
    const w = window.innerWidth
    const h = window.innerHeight
    isMobile = w < 768
    isInteractionEnabled = !isMobile
    dprFix = isMobile ? (window.devicePixelRatio || 1) : 1
    const mobileSpacingBoost = isMobile ? 1.2 : 1
    const currentSpacing = (SPACING * mobileSpacingBoost) / dprFix

    // If spacing changes (e.g. orientation change), clear and rebuild
    if (currentSpacing !== lastSpacing) {
      container.removeChildren()
      points.length = 0
      existingPoints.clear()
      lastSpacing = currentSpacing
    }
    
    for (let x = currentSpacing / 2; x < w + currentSpacing; x += currentSpacing) {
      for (let y = currentSpacing / 2; y < h + currentSpacing; y += currentSpacing) {
        const id = `${Math.round(x)}-${Math.round(y)}`
        if (existingPoints.has(id)) continue
        existingPoints.add(id)

        const sprite = new Sprite(texture)
        sprite.anchor.set(0.5)
        sprite.position.set(x, y)
        sprite.alpha = 0
        const mobileScaleBoost = isMobile ? 1.5 : 1
        sprite.scale.set((SCALE_BASE * mobileScaleBoost) / dprFix)
        container.addChild(sprite)
        
        points.push({
          sprite,
          baseX: x,
          baseY: y,
          baseOpacity: Math.random() * 0.5 + 0.5
        })
      }
    }
  }

  createGrid()

  app.ticker.add((time) => {
    const t = Date.now() / 10000
    
    for (const p of points) {
      const { sprite, baseX, baseY, baseOpacity } = p
      
      // Exact Antfu-style Flow/Drift direction
      const rad = (noise3d(baseX / NOISE_SCALE, baseY / NOISE_SCALE, t) - 0.5) * 2 * Math.PI
      const len = (noise3d(baseX / NOISE_SCALE, baseY / NOISE_SCALE, t * 1.5) + 0.5) * 6
      const driftX = Math.cos(rad) * len
      const driftY = Math.sin(rad) * len
      
      // Noise-based rotation
      const n = noise3d(baseX / NOISE_SCALE, baseY / NOISE_SCALE, t)
      const targetRotation = n * Math.PI
      
      // Mouse interaction — read raw vars, not reactive refs
      let distSq = Infinity
      if (isMouseInWindow && isInteractionEnabled) {
        const dx = rawMouseX - baseX
        const dy = rawMouseY - baseY
        distSq = dx * dx + dy * dy
      }
      
      const radiusSq = INTERACTION_RADIUS * INTERACTION_RADIUS
      
      // Exact Antfu Shimmer Formula: (Math.abs(Math.cos(rad)) * 0.8 + 0.2) * opacity
      const shimmerAlpha = (Math.abs(Math.cos(rad)) * 0.8 + 0.2) * baseOpacity

      if (distSq < radiusSq) {
        const dist = Math.sqrt(distSq)
        const force = (1 - dist / INTERACTION_RADIUS)
        
        sprite.x += (baseX + driftX - sprite.x) * 0.1
        sprite.y += (baseY + driftY - sprite.y) * 0.1
        
        sprite.rotation += (targetRotation + force * Math.PI - sprite.rotation) * 0.1
        // Boost alpha when hovered, but still keep the shimmer
        sprite.alpha += (Math.max(shimmerAlpha, 0.4 + force * 0.5) - sprite.alpha) * 0.1
        const mobileScaleBoost = isMobile ? 1.5 : 1
        sprite.scale.set(((SCALE_BASE * mobileScaleBoost) + force * 0.3) / dprFix)
      } else {
        sprite.x += (baseX + driftX - sprite.x) * 0.05
        sprite.y += (baseY + driftY - sprite.y) * 0.05
        
        sprite.rotation += (targetRotation - sprite.rotation) * 0.05
        // Apply exact shimmering alpha
        const alphaMultiplier = isMobile ? 0.60 : 0.50
        sprite.alpha += (shimmerAlpha * alphaMultiplier - sprite.alpha) * 0.05
        
        const mobileScaleBoost = isMobile ? 1.5 : 1
        const targetScale = (SCALE_BASE * mobileScaleBoost) / dprFix
        sprite.scale.set(sprite.scale.x + (targetScale - sprite.scale.x) * 0.05)
      }
    }
  })

  mountedScope.run(() => {
    useEventListener('resize', () => {
      if (app && el.value) {
        const { offsetWidth, offsetHeight } = el.value
        app.renderer.resize(offsetWidth, offsetHeight)
        createGrid()
      }
    })

    useEventListener(document, 'mousemove', (e: MouseEvent) => {
      rawMouseX = e.clientX
      rawMouseY = e.clientY
      isMouseInWindow = true
    })

    // `mouseout` on window with relatedTarget === null is the only
    // reliable cross-browser signal that the cursor left the browser window.
    useEventListener(window, 'mouseout', (e: MouseEvent) => {
      if (!e.relatedTarget) {
        isMouseInWindow = false
        rawMouseX = -9999
        rawMouseY = -9999
      }
    })

    useEventListener(window, 'mouseover', () => {
      isMouseInWindow = true
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
