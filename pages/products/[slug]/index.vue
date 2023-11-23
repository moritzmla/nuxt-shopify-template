<template>
    <UiCenter v-if="data">
        <div class="grid sm:grid-cols-2 gap-8">
            <div class="flex flex-col gap-4">
                <img
                    class="rounded-lg shadow-sm"
                    :alt="data?.product.featuredImage.altText"
                    :src="data?.product.featuredImage.url + '&width=360'"
                />
            </div>

            <div class="flex flex-col gap-6">
                <UiHeading>
                    {{ data.product.title }}
                </UiHeading>

                <UiParagraph v-if="data.product.description">
                    {{ data.product.description }}
                </UiParagraph>

                <strong class="font-bold text-lg">
                    <UiPrice
                        :model-value="
                            currentVariant?.node.price ?? data.product.priceRange.minVariantPrice
                        "
                    />
                </strong>

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

                <UiButton
                    :loading="isLoading"
                    :disabled="!currentVariant || outOfStock"
                    @click="addCartLine"
                >
                    {{ outOfStock ? "Out of stock" : "Add to cart" }}
                </UiButton>
            </div>
        </div>

        <ProductRecommendations :model-value="data.product.id" />
    </UiCenter>
</template>

<script setup lang="ts">
import type { OptionModel } from "~/types/shopify";

const route = useRoute();
const router = useRouter();
const cookie = useCookie("cart");

const { mutate: createCart } = useCreateCart();
const { mutate: createCartLine } = useCreateCartLine();
const { data } = await useProduct(route.params.slug as string);

const isLoading = ref(false);

const currentVariant = computed(() => {
    if (data.value) {
        return data.value.product.variants.edges.find((variant) =>
            variant.node.selectedOptions.every(
                (option) => option.value === route.query[option.name]
            )
        );
    }
});

const outOfStock = computed(
    () => currentVariant.value && !currentVariant.value.node.availableForSale
);

async function addCartLine() {
    isLoading.value = true;
    try {
        const cart = await getCart();

        if (cart && currentVariant.value && currentVariant.value.node.availableForSale) {
            await createCartLine({
                cart: cart.id,
                lines: [
                    {
                        merchandiseId: currentVariant.value.node.id,
                        quantity: 1,
                    },
                ],
            });
        }
    } finally {
        isLoading.value = false;
    }
}

async function getCart() {
    if (cookie.value) {
        const { data } = await useCart(cookie.value);

        if (data.value) {
            return data.value.cart;
        }
    }

    const response = await createCart();

    if (response && response.data) {
        cookie.value = response.data.cartCreate.cart.id;

        return response.data.cartCreate.cart;
    }
}

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
