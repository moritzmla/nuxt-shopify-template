<template>
    <div class="flex flex-col items-start gap-4">
        <NuxtLink :to="`/products/${modelValue.handle}`">
            <img
                loading="lazy"
                width="360"
                height="360"
                class="rounded-lg aspect-square shadow-sm transition duration-200 hover:scale-104"
                :alt="modelValue.featuredImage.altText ?? modelValue.title"
                :src="modelValue.featuredImage.url + '&width=360'"
            />
        </NuxtLink>

        <div class="flex flex-col">
            <UiLink class="text-xl" :to="`/products/${modelValue.handle}`">
                {{ modelValue.title }}
            </UiLink>

            <div>
                <UiPrice :model-value="modelValue.priceRange.minVariantPrice" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { ProductModel } from "~/types/shopify";

defineProps<{
    modelValue: ProductModel;
}>();
</script>
