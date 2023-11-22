<template>
    <div class="flex flex-col items-start gap-4">
        <NuxtLink :to="`/collections/${modelValue.handle}`">
            <img
                loading="lazy"
                width="360"
                height="360"
                class="rounded-lg aspect-square shadow transition duration-200 hover:scale-104"
                :alt="modelValue.title"
                :src="modelValue.image.url + '&width=360'"
            />
        </NuxtLink>

        <UiLink class="text-xl" :to="`/collections/${modelValue.handle}`">
            {{ modelValue.title }}
        </UiLink>
    </div>
</template>

<script setup lang="ts">
import type { CollectionModel } from "~/types/shopify";

defineProps<{
    modelValue: CollectionModel;
}>();
</script>
