<template>
    <div class="flex items-start gap-6">
        <img
            loading="lazy"
            width="180"
            height="180"
            class="rounded-lg aspect-square shadow-sm"
            :alt="modelValue.merchandise.product.featuredImage.altText"
            :src="modelValue.merchandise.product.featuredImage.url + '&width=360'"
        />

        <div class="flex flex-col items-start gap-2">
            <UiLink class="text-xl" :to="productUrl">
                {{ modelValue.merchandise.product.title }}
            </UiLink>

            <strong class="font-semibold">
                <UiPrice :model-value="modelValue.cost.totalAmount" />
            </strong>

            <div class="flex flex-col text-sm">
                <UiParagraph v-for="option in modelValue.merchandise.selectedOptions">
                    {{ option.name }}: {{ option.value }}
                </UiParagraph>
            </div>

            <UiButton variant="outline" :loading="loading" @click="deleteLine">
                <IconTrash width="20" height="20" />
            </UiButton>
        </div>
    </div>
</template>

<script setup lang="ts">
import { IconTrash } from "@tabler/icons-vue";
import type { CartLineModel } from "~/types/shopify";

const props = defineProps<{
    modelValue: CartLineModel;
}>();

const cartCookie = useCartCookie();

const { mutate: deleteLineMutation, loading } = useDeleteCartLine();

const productUrl = computed(() => {
    const searchParams = new URLSearchParams();

    for (const option of props.modelValue.merchandise.selectedOptions) {
        searchParams.set(option.name, option.value);
    }

    return `/products/${props.modelValue.merchandise.product.handle}?${searchParams}`;
});

async function deleteLine() {
    await deleteLineMutation({
        cart: cartCookie.value ?? "",
        lines: [props.modelValue.id],
    });

    refreshNuxtData("Cart");
}
</script>
