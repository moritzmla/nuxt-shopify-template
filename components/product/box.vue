<template>
    <div class="flex flex-col items-start gap-4">
        <NuxtLink :to="`/products/${modelValue?.handle}`">
            <img
                loading="lazy"
                width="360"
                height="360"
                class="rounded-lg aspect-square transition duration-200 hover:scale-104"
                :alt="modelValue?.title"
                :src="modelValue?.featuredImage?.url + '&width=360'"
            />
        </NuxtLink>

        <div class="flex flex-col">
            <UiLink class="text-xl" :to="`/products/${modelValue?.handle}`">
                {{ modelValue?.title }}
            </UiLink>

            <div>
                {{ formatter.format(modelValue?.priceRange?.minVariantPrice?.amount ?? 0) }}
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { ProductModel } from "~/types/shopify";

defineProps<{
    modelValue?: ProductModel;
}>();

const formatter = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
});
</script>
