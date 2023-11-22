<template>
    {{ data }}
</template>

<script setup lang="ts">
const route = useRoute();

const { data } = useProduct(route.params.slug as string);
</script>
