<template>
    <UiCenter>
        <UiHeading> Your cart </UiHeading>

        <div class="grid md:grid-cols-2 gap-8">
            <div class="flex flex-col gap-8">
                <div
                    class="flex flex-col gap-4 items-center bg-slate-50 rounded-lg p-8"
                    v-if="!data || isEmpty"
                >
                    <IconShoppingCart width="48" height="48" />

                    <p class="text-xl">Your cart is empty.</p>
                </div>
                <CartLine :model-value="line.node" v-for="line in data?.cart.lines.edges" v-else />
            </div>

            <div>
                <div class="flex flex-col gap-4 bg-slate-50 p-8 rounded-lg">
                    <div class="flex items-center justify-between">
                        <UiParagraph> Taxes </UiParagraph>

                        <strong class="font-semibold">
                            <UiPrice :model-value="data?.cart.cost.totalTaxAmount" />
                        </strong>
                    </div>

                    <div class="flex items-center justify-between">
                        <UiParagraph> Shipping </UiParagraph>

                        <UiParagraph> Calculated at checkout </UiParagraph>
                    </div>

                    <div class="flex items-center justify-between">
                        <UiParagraph> Total </UiParagraph>

                        <strong class="font-semibold">
                            <UiPrice :model-value="data?.cart.cost.totalAmount" />
                        </strong>
                    </div>

                    <UiButton
                        class="text-lg"
                        :disabled="isEmpty"
                        :to="isEmpty ? undefined : data?.cart.checkoutUrl"
                    >
                        Checkout
                    </UiButton>
                </div>
            </div>
        </div>
    </UiCenter>
</template>

<script setup lang="ts">
import { IconShoppingCart } from "@tabler/icons-vue";

const cookie = useCartCookie();
const { data } = await useCart(cookie.value ?? "");

const isEmpty = computed(() => data.value?.cart.lines.edges.length === 0);

useSeoMeta({
    title: "Cart - Acme Store",
});
</script>
