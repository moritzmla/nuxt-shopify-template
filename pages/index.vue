<template>
    <div class="flex items-center justify-center relative">
        <img alt="Banner" class="object-cover object-top h-100 w-full select-none" :src="Banner" />

        <div class="flex flex-col items-start gap-4 absolute w-full max-w-6xl p-8">
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

    <UiCenter>
        <div class="text-center flex flex-col gap-2">
            <p class="text-slate-400 uppercase tracking-wider">New arrivals</p>

            <UiHeading> Spring '23 </UiHeading>
        </div>

        <div class="grid place-content-center sm:grid-cols-2 md:grid-cols-3 gap-8">
            <ProductBox
                :model-value="product.node"
                v-for="product in data?.collection?.products?.edges"
            />
        </div>
    </UiCenter>
</template>

<script setup lang="ts">
import Banner from "~/assets/banner.webp";

const { data } = useCollection("featured", 6);
</script>
