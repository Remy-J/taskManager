import { ref, computed, onMounted, onUnmounted } from "vue";
import type { ComputedRef } from "vue";

export interface VirtualListOptions {
  /** Fixed height of each item in pixels */
  itemHeight: number;
  /** Number of items to render outside the visible area */
  overscan?: number;
}

export function useVirtualList<T>(
  itemsSource: ComputedRef<T[]>,
  options: VirtualListOptions
) {
  const containerRef = ref<HTMLElement | null>(null);
  const scrollTop = ref(0);
  const containerHeight = ref(0);

  const itemHeight = options.itemHeight;
  const overscan = options.overscan || 3;

  const visibleItems = computed(() => {
    if (!containerHeight.value) return [];

    const items = itemsSource.value;
    const startIndex = Math.floor(scrollTop.value / itemHeight);
    const endIndex = Math.ceil(
      (scrollTop.value + containerHeight.value) / itemHeight
    );

    const start = Math.max(0, startIndex - overscan);
    const end = Math.min(items.length, endIndex + overscan);

    return items.slice(start, end).map((item, index) => ({
      item,
      index: start + index,
      style: {
        position: "absolute",
        top: `${(start + index) * itemHeight}px`,
        height: `${itemHeight - 2}px`,
        width: "100%",
        marginBottom: "2px",
      },
    }));
  });

  const totalHeight = computed(() => itemsSource.value.length * itemHeight);

  function handleScroll(event: Event) {
    const target = event.target as HTMLElement;
    scrollTop.value = target.scrollTop;
  }

  function updateContainerHeight() {
    if (containerRef.value) {
      containerHeight.value = containerRef.value.clientHeight;
    }
  }

  onMounted(() => {
    updateContainerHeight();
    window.addEventListener("resize", updateContainerHeight);
  });

  onUnmounted(() => {
    window.removeEventListener("resize", updateContainerHeight);
  });

  return {
    containerRef,
    visibleItems,
    totalHeight,
    handleScroll,
  };
}
