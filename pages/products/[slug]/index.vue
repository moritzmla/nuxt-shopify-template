<template>
    <UiCenter>
        <div class="grid sm:grid-cols-2 gap-8">
            <div class="flex flex-col gap-4">
                <img
                    class="rounded-lg shadow-sm"
                    :src="data?.product?.featuredImage?.url + '&width=360'"
                />
            </div>

            <div class="flex flex-col gap-6">
                <UiHeading>
                    {{ data?.product?.title }}
                </UiHeading>

                <p class="text-slate-400">
                    {{ data?.product?.description }}
                </p>

                <div class="flex flex-col gap-2" v-for="option in data?.product?.options">
                    <h2 class="font-semibold">
                        {{ option.name }}
                    </h2>

                    <div class="flex gap-2 flex-wrap">
                        <UiButton
                            class="text-sm"
                            :variant="params[option.name] === value ? 'highlight' : 'outline'"
                            @click="handleOption(value, option)"
                            v-for="value in option.values"
                        >
                            <span class="px-2 font-normal">
                                {{ value }}
                            </span>
                        </UiButton>
                    </div>
                </div>

                <UiButton> Add to cart </UiButton>
            </div>
        </div>

        <ProductRecommendations :model-value="data.product.id" v-if="data?.product?.id" />
    </UiCenter>
</template>

<script setup lang="ts">
import type { OptionModel } from "~/types/shopify";

const route = useRoute();
const params = useUrlSearchParams();

const { data } = await useProduct(route.params.slug as string);

function handleOption(value: string, option: OptionModel) {
    params[option.name] = value;
}
</script>
