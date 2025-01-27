import { afterEach } from 'vitest'

// Configuration globale pour jsdom
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
} 