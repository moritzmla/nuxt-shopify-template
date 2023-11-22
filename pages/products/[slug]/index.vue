<template>
    <UiCenter>
        <div class="grid sm:grid-cols-2 gap-8">
            <div class="flex flex-col gap-4">
                <img
                    class="rounded-lg shadow-sm"
                    :src="data?.product.featuredImage.url + '&width=360'"
                />
            </div>

            <div class="flex flex-col gap-6">
                <UiHeading>
                    {{ data?.product.title }}
                </UiHeading>

                <UiParagraph>
                    {{ data?.product.description }}
                </UiParagraph>

                <div class="flex flex-col gap-2" v-for="option in data?.product.options">
                    <h2 class="font-semibold">
                        {{ option.name }}
                    </h2>

                    <div class="flex gap-2 flex-wrap">
                        <UiButton
                            class="text-sm"
                            :variant="route.query[option.name] === value ? 'highlight' : 'outline'"
                            :disabled="isOptionDisabled(value, option)"
                            @click="setOption(value, option)"
                            v-for="value in option.values"
                        >
                            <span class="px-2 font-normal">
                                {{ value }}
                            </span>
                        </UiButton>
                    </div>
                </div>

                <UiButton :disabled="!currentVariant"> Add to cart </UiButton>
            </div>
        </div>

        <ProductRecommendations :model-value="data.product.id" v-if="data?.product.id" />
    </UiCenter>
</template>

<script setup lang="ts">
import type { OptionModel } from "~/types/shopify";

const route = useRoute();
const router = useRouter();

const { data } = await useProduct(route.params.slug as string);

const currentVariant = computed(() => {
    if (data.value) {
        return data.value.product.variants.edges.find((variant) => {
            const combination = variant.node.selectedOptions.reduce<Record<string, string>>(
                (accumulator, option) => ({
                    ...accumulator,
                    [option.name]: option.value,
                }),
                {}
            );

            return Object.entries(combination).every(([key, value]) => route.query[key] === value);
        });
    }
});

function isOptionDisabled(value: string, option: OptionModel) {
    return false;
}

function setOption(value: string, option: OptionModel) {
    router.replace({
        path: route.path,
        query: {
            ...route.query,
            [option.name]: value,
        },
    });
}
</script>
