<template>
    <div class="flex flex-col gap-4">
        <NuxtLink :to="`/products/${modelValue?.handle}`">
            <img
                loading="lazy"
                width="360"
                height="360"
                class="rounded aspect-square shadow"
                :alt="modelValue?.title"
                :src="modelValue?.featuredImage?.url + '&width=360'"
            />
        </NuxtLink>

        <NuxtLink class="font-semibold text-xl" :to="`/products/${modelValue?.handle}`">
            {{ modelValue?.title }}
        </NuxtLink>
    </div>
</template>

<script setup lang="ts">
import type { ProductModel } from "~/types/shopify";

defineProps<{
    modelValue?: ProductModel;
}>();
</script>
