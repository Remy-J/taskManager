<template>
    <div class="bg-white rounded-lg shadow-md p-6">
        <header class="mb-4">
            <slot name="header">
                <h2 class="text-xl font-semibold text-gray-800">
                    <slot name="title">Default Title</slot>
                </h2>
            </slot>
        </header>
        <div class="mb-4">
            <slot></slot>
        </div>
        <footer class="mt-auto pt-4 border-t border-gray-100">
            <slot name="footer"></slot>
        </footer>
    </div>
</template>

<script setup lang="ts">
/**
 * Card component for content organization
 * @component
 * @description A flexible container component with header, content, and footer slots
 * 
 * @slot default - Main content of the card
 * @slot header - Custom header content
 * @slot title - Card title (used within default header)
 * @slot footer - Footer content
 */

defineSlots<{
    default: () => {};
    header: () => {};
    title: () => {};
    footer: () => {};
}>();
</script>