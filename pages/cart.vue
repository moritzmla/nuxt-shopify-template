<template>
    <UiCenter>
        <UiHeading> Your cart </UiHeading>

        <CartModel :model-value="cookie" v-if="cookie" />
    </UiCenter>
</template>

<script setup lang="ts">
const cookie = useCartCookie();
</script>
