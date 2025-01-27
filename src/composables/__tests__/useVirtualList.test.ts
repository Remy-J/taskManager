import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import { useVirtualList } from '../useVirtualList'
import { computed, nextTick, defineComponent, h } from 'vue'
import { mount } from '@vue/test-utils'

describe('useVirtualList', () => {
  const mockItems = Array.from({ length: 1000 }, (_, i) => `Item ${i}`)
  const options = {
    itemHeight: 30,
    overscan: 2
  }

  function createTestComponent(setupFn: () => void) {
    return defineComponent({
      setup() {
        setupFn()
        return () => h('div')
      }
    })
  }

  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.restoreAllMocks()
    vi.useRealTimers()
  })

  it('should initialize with correct values', () => {
    let result: any
    const TestComponent = createTestComponent(() => {
      const items = computed(() => mockItems)
      result = useVirtualList(items, options)
    })

    mount(TestComponent)

    expect(result.containerRef.value).toBe(null)
    expect(result.visibleItems.value).toEqual([])
    expect(result.totalHeight.value).toBe(mockItems.length * options.itemHeight)
  })

  it('should update containerHeight when container is set', async () => {
    let result: any
    const TestComponent = createTestComponent(() => {
      const items = computed(() => mockItems)
      result = useVirtualList(items, options)
    })

    mount(TestComponent)

    const container = document.createElement('div')
    Object.defineProperties(container, {
      clientHeight: { value: 300, configurable: true }
    })

    result.containerRef.value = container
    await nextTick()

    expect(container.clientHeight).toBe(300)
  })

  it('should add resize event listener on mount', async () => {
    const addEventListenerSpy = vi.spyOn(window, 'addEventListener')
    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener')

    let result: any
    const TestComponent = createTestComponent(() => {
      const items = computed(() => mockItems)
      result = useVirtualList(items, options)
    })

    const wrapper = mount(TestComponent)
    await nextTick()
    
    expect(addEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function))

    wrapper.unmount()
    await nextTick()

    expect(removeEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function))
  })

  it('should calculate total height based on items length', () => {
    let result: any
    const TestComponent = createTestComponent(() => {
      const items = computed(() => mockItems.slice(0, 5)) 
      result = useVirtualList(items, options)
    })

    mount(TestComponent)

    expect(result.totalHeight.value).toBe(5 * options.itemHeight)
  })
}) 