<template>
    <NuxtLayout>
        <NuxtPage />
    </NuxtLayout>
</template>

<script setup lang="ts">
const cookie = useCartCookie();
const { mutate, onDone } = useCreateCart();

if (!cookie.value) {
    mutate();
}

onDone((response) => (cookie.value = response.data?.cartCreate.cart.id));
</script>

<style>
svg {
    stroke-width: 1.5;
}
</style>
