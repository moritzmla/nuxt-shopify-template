<template>
    <div class="flex items-center justify-center relative">
        <img alt="Banner" class="object-cover object-top h-100 w-full select-none" :src="Banner" />

        <div class="flex flex-col items-start gap-4 absolute w-full max-w-6xl p-8">
            <UiHeading class="text-white">
                The Peak <br />
                Collection
            </UiHeading>

            <h2 class="text-slate-200">Push your performance with our premium athletic wear</h2>

            <UiButton variant="primary" class="text-lg" to="/collections/featured">
                <span class="px-2"> Shop now </span>
            </UiButton>
        </div>
    </div>

    <UiCenter>
        <div class="text-center flex flex-col gap-2">
            <UiParagraph class="uppercase tracking-wider"> New arrivals </UiParagraph>

            <UiHeading> Spring '23 </UiHeading>
        </div>

        <div class="grid place-content-center sm:grid-cols-2 md:grid-cols-3 gap-8">
            <ProductModel
                :model-value="product.node"
                v-for="product in data?.collection.products.edges"
            />
        </div>
    </UiCenter>
</template>

<script setup lang="ts">
import Banner from "~/assets/banner.webp";

const { data } = await useCollection("featured", 6);

useSeoMeta({
    title: "Home - Acme Store",
});
</script>
