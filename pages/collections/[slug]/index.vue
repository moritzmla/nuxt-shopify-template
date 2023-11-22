<template>
    {{ data }}
</template>

<script setup lang="ts">
const route = useRoute();

const { data } = useCollection(route.params.slug as string);
</script>
