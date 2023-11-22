<template>
    <div class="flex flex-col gap-4">
        <NuxtLink :to="`/collections/${modelValue?.handle}`">
            <img
                loading="lazy"
                class="rounded aspect-square shadow"
                :alt="modelValue?.title"
                :src="modelValue?.image?.url + '&width=360'"
            />
        </NuxtLink>

        <NuxtLink class="font-semibold text-xl" :to="`/collections/${modelValue?.handle}`">
            {{ modelValue?.title }}
        </NuxtLink>
    </div>
</template>

<script setup lang="ts">
import type { CollectionModel } from "~/types/shopify";

defineProps<{
    modelValue?: CollectionModel;
}>();
</script>
