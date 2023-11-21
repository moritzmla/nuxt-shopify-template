<template>
    <component
        class="relative inline-flex cursor-pointer items-center select-none gap-2 whitespace-nowrap rounded border p-2 font-semibold outline-none ring-slate-200 focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50"
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

type Variant = "primary" | "secondary" | "danger" | "outline" | "text";

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
    "primary":
        "text-white bg-slate-900 border-slate-900 hover:border-slate-800 hover:bg-slate-800 active:border-slate-700 active:bg-slate-700",
    "secondary":
        "bg-slate-100 border-slate-100 hover:border-slate-200 hover:bg-slate-200 active:border-slate-300 active:bg-slate-300",
    "danger":
        "text-white bg-red-500 border-red-500 hover:border-red-600 hover:bg-red-600 active:border-red-600 active:bg-red-700",
    "outline": "bg-white border-slate-200 hover:bg-slate-50 active:bg-slate-100",
    "text": "bg-transparent border-transparent hover:border-slate-100 hover:bg-slate-100 active:border-slate-200 active:bg-slate-200",
};
</script>
