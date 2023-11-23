<template>
    <div class="grid md:grid-cols-2 gap-8" v-if="data">
        <div class="flex flex-col gap-8">
            <div class="flex flex-col gap-4 items-center bg-slate-50 rounded-lg p-8" v-if="isEmpty">
                <IconShoppingCart width="48" height="48" />

                <p class="text-xl">Your cart is empty.</p>
            </div>
            <div class="flex items-start gap-6" v-for="line in data.cart.lines.edges" v-else>
                <div class="flex relative">
                    <img
                        loading="lazy"
                        width="180"
                        height="180"
                        class="rounded-lg aspect-square shadow-sm"
                        :alt="line.node.merchandise.product.featuredImage.altText"
                        :src="line.node.merchandise.product.featuredImage.url + '&width=360'"
                    />

                    <div class="absolute p-1">
                        <UiButton
                            variant="outline"
                            class="shadow-sm"
                            :loading="isLoading"
                            @click="deleteLine(line.node)"
                        >
                            <IconTrash width="20" height="20" />
                        </UiButton>
                    </div>
                </div>

                <div class="flex flex-col items-start gap-2">
                    <UiLink
                        class="text-xl"
                        :to="`/products/${line.node.merchandise.product.handle}`"
                    >
                        {{ line.node.merchandise.product.title }}
                    </UiLink>

                    <div class="flex flex-col">
                        <UiParagraph v-for="option in line.node.merchandise.selectedOptions">
                            {{ option.name }}: {{ option.value }}
                        </UiParagraph>
                    </div>
                </div>
            </div>
        </div>

        <div>
            <div class="flex flex-col gap-4 bg-slate-50 p-8 rounded-lg">
                <div class="flex items-center justify-between">
                    <UiParagraph> Taxes </UiParagraph>

                    <strong class="font-semibold">
                        <UiPrice
                            :model-value="data.cart.cost.totalTaxAmount"
                            v-if="data.cart.cost.totalTaxAmount"
                        />
                        <UiParagraph v-else> --- </UiParagraph>
                    </strong>
                </div>

                <div class="flex items-center justify-between">
                    <UiParagraph> Shipping </UiParagraph>

                    <UiParagraph> Calculated at checkout </UiParagraph>
                </div>

                <div class="flex items-center justify-between">
                    <UiParagraph> Total </UiParagraph>

                    <strong class="font-semibold">
                        <UiPrice :model-value="data.cart.cost.totalAmount" />
                    </strong>
                </div>

                <UiButton
                    class="text-lg"
                    :disabled="isEmpty"
                    :to="isEmpty ? undefined : data.cart.checkoutUrl"
                >
                    Checkout
                </UiButton>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { IconShoppingCart, IconTrash } from "@tabler/icons-vue";
import type { CartLineModel } from "~/types/shopify";

const props = defineProps<{
    modelValue: string;
}>();

const { mutate: deleteCartLine } = useDeleteCartLine();
const { data, refresh } = useCart(props.modelValue);

const isLoading = ref(false);

const isEmpty = computed(() => data.value && data.value.cart.lines.edges.length === 0);

async function deleteLine(line: CartLineModel) {
    isLoading.value = true;
    try {
        await deleteCartLine({
            cart: props.modelValue,
            lines: [line.id],
        });

        await refresh();
    } finally {
        isLoading.value = false;
    }
}
</script>
