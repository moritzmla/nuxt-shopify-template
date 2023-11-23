<template>
    <UiCenter>
        <UiHeading> {{ data?.collection.title }} </UiHeading>

        <UiParagraph class="max-w-xl" v-if="data?.collection.description">
            {{ data?.collection.description }}
        </UiParagraph>

        <div class="grid place-content-center sm:grid-cols-2 md:grid-cols-3 gap-8">
            <ProductModel
                :model-value="product.node"
                v-for="product in data?.collection.products.edges"
            />
        </div>
    </UiCenter>
</template>

<script setup lang="ts">
const route = useRoute();

const { data } = useCollection(route.params.slug as string);
</script>
