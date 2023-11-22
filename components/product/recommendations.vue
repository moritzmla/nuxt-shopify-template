<template>
    <UiSubheading> You may also like </UiSubheading>

    <div class="grid place-content-center sm:grid-cols-2 md:grid-cols-3 gap-8">
        <ProductBox
            :model-value="product"
            v-for="product in data?.productRecommendations.slice(0, 3)"
        />
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    modelValue: string;
}>();

const { data } = useRecommendations(props.modelValue);
</script>
