<template>
    <component
        class="relative inline-flex cursor-pointer justify-center items-center select-none gap-2 whitespace-nowrap rounded p-2 font-semibold outline-none ring-slate-200 focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50"
        :class="[variants[variant]]"
        :is="to ? NuxtLink : 'button'"
        :to="to"
    >
        <slot />
    </component>
</template>

<script setup lang="ts">
import { NuxtLink } from "#components";
import { type Component } from "vue";

type Variant = "primary" | "text";

withDefaults(
    defineProps<{
        as?: string | Component;
        variant?: Variant;
        to?: string;
    }>(),
    {
        as: "button",
        type: "button",
        variant: "primary",
        loading: false,
    }
);

const variants: Record<Variant, string> = {
    "primary": "text-white bg-blue-500 hover:bg-blue-400  active:bg-blue-300",
    "text": "hover:bg-slate-50 active:bg-slate-100",
};
</script>
