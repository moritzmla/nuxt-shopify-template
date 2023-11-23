<template>
    <component
        class="relative inline-flex cursor-pointer justify-center items-center select-none gap-2 whitespace-nowrap rounded-lg p-2 font-semibold outline-none ring-slate-200 focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50"
        :class="[variants[variant], { 'text-opacity-0': loading }]"
        :is="to ? NuxtLink : 'button'"
        :disabled="disabled || loading"
        :to="to"
    >
        <IconLoader width="24" height="24" class="absolute animate-spin" v-if="loading" />

        <slot />
    </component>
</template>

<script setup lang="ts">
import { NuxtLink } from "#components";
import { IconLoader } from "@tabler/icons-vue";
import { type Component } from "vue";

type Variant = "primary" | "outline" | "highlight" | "text";

withDefaults(
    defineProps<{
        as?: string | Component;
        variant?: Variant;
        loading?: boolean;
        disabled?: boolean;
        to?: string;
    }>(),
    {
        as: "button",
        variant: "primary",
        loading: false,
        disabled: false,
    }
);

const variants: Record<Variant, string> = {
    "primary":
        " text-white bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 active:from-blue-400 active:to-blue-300 svg:stroke-white",
    "outline": "bg-white hover:bg-slate-50 active:bg-slate-100 border border-slate-200",
    "highlight":
        "bg-white text-blue-500 hover:bg-slate-50 active:bg-slate-100 border border-blue-500",
    "text": "hover:bg-slate-50 active:bg-slate-100",
};
</script>
