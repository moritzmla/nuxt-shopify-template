<template>
    <div class="flex items-start gap-6">
        <img
            loading="lazy"
            width="180"
            height="180"
            class="rounded-lg aspect-square shadow-sm"
            :alt="
                modelValue.merchandise.product.featuredImage.altText ??
                modelValue.merchandise.product.title
            "
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

            <div class="flex gap-2 flex-wrap">
                <UiButton
                    variant="outline"
                    aria-label="Delete Line Item"
                    :loading="deleteLoading"
                    @click="deleteLine"
                >
                    <IconTrash width="20" height="20" />
                </UiButton>

                <div class="flex items-center border border-slate-200 rounded-lg">
                    <UiButton
                        variant="text"
                        aria-label="Increase Product Quantity"
                        :loading="updateLoading"
                        @click="changeQuantity(-1)"
                    >
                        <IconMinus width="20" height="20" />
                    </UiButton>

                    <span class="text-sm px-4">
                        {{ modelValue.quantity }}
                    </span>

                    <UiButton
                        variant="text"
                        aria-label="Decrease Product Quantity"
                        :loading="updateLoading"
                        @click="changeQuantity(1)"
                    >
                        <IconPlus width="20" height="20" />
                    </UiButton>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { IconMinus, IconPlus, IconTrash } from "@tabler/icons-vue";
import type { CartLineModel } from "~/types/shopify";

const props = defineProps<{
    modelValue: CartLineModel;
}>();

const cartCookie = useCartCookie();

const { mutate: updateLineMutation, loading: updateLoading } = useUpdateCartLines();
const { mutate: deleteLineMutation, loading: deleteLoading } = useDeleteCartLine();

const productUrl = computed(() => {
    const searchParams = new URLSearchParams();

    for (const option of props.modelValue.merchandise.selectedOptions) {
        searchParams.set(option.name, option.value);
    }

    return `/products/${props.modelValue.merchandise.product.handle}?${searchParams}`;
});

async function changeQuantity(amount: number) {
    await updateLineMutation({
        cart: cartCookie.value ?? "",
        lines: [
            {
                id: props.modelValue.id,
                merchandiseId: props.modelValue.merchandise.id,
                quantity: props.modelValue.quantity + amount,
            },
        ],
    });

    refreshNuxtData("Cart");
}

async function deleteLine() {
    await deleteLineMutation({
        cart: cartCookie.value ?? "",
        lines: [props.modelValue.id],
    });

    refreshNuxtData("Cart");
}
</script>
