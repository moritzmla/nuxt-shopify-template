<template>
    <div class="flex relative">
        <img alt="Banner" class="object-cover object-top h-100 w-full select-none" :src="Banner" />

        <div
            class="flex flex-col items-center text-center sm:text-left sm:items-start sm:pl-50 justify-center gap-4 absolute w-full h-full"
        >
            <UiHeading class="text-white">
                The Peak <br />
                Collection
            </UiHeading>

            <p class="text-slate-200">Push your performance with our premium athletic wear</p>

            <UiButton variant="primary" class="text-lg" to="/collections/featured">
                <span class="px-2"> Shop now </span>
            </UiButton>
        </div>
    </div>
</template>

<script setup lang="ts">
import Banner from "~/assets/banner.webp";
</script>
