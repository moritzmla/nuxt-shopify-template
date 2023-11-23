<template>
    <div class="grid md:grid-cols-2 gap-8" v-if="data">
        <div class="flex flex-col gap-8">
            <div class="flex items-start gap-6" v-for="line in data.cart.lines.edges">
                <div class="flex relative">
                    <img
                        loading="lazy"
                        width="180"
                        height="180"
                        class="rounded-lg aspect-square"
                        :alt="line.node.merchandise.product.featuredImage.altText"
                        :src="line.node.merchandise.product.featuredImage.url + '&width=360'"
                    />

                    <div class="absolute p-1">
                        <UiButton
                            variant="outline"
                            class="shadow"
                            @click="deleteCartLine(line.node)"
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
                <strong class="font-bold text-xl">
                    <UiPrice :model-value="data.cart.cost.subtotalAmount" />
                </strong>

                <UiButton class="text-lg" :to="data.cart.checkoutUrl"> Checkout </UiButton>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { IconTrash } from "@tabler/icons-vue";
import type { CartLineModel } from "~/types/shopify";

const props = defineProps<{
    modelValue: string;
}>();

const { data, refresh } = useCart(props.modelValue);

async function deleteCartLine(line: CartLineModel) {
    const { mutate } = useDeleteCartLine(props.modelValue, [line.id]);

    await mutate();
    await refresh();
}
</script>
