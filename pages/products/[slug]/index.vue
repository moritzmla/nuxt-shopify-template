<template>
    <UiCenter>
        <div class="grid sm:grid-cols-2 gap-8">
            <div class="flex flex-col gap-4">
                <img
                    class="rounded shadow-sm"
                    :src="data.product?.featuredImage?.url + '&width=360'"
                />
            </div>

            <div class="flex flex-col gap-8">
                <UiHeading>
                    {{ data.product?.title }}
                </UiHeading>

                <UiButton> Add to cart </UiButton>

                <p class="text-slate-400">
                    {{ data.product?.description }}
                </p>
            </div>
        </div>

        <ProductRecommendations :model-value="data.product.id" v-if="data.product?.id" />
    </UiCenter>
</template>

<script setup lang="ts">
const route = useRoute();

const { data } = await useProduct(route.params.slug as string);
</script>
