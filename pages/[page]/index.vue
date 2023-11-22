<template>
    <UiCenter>
        <UiHeading>
            {{ data?.pageByHandle?.title }}
        </UiHeading>

        <p>
            {{ data?.pageByHandle?.body }}
        </p>
    </UiCenter>
</template>

<script setup lang="ts">
const route = useRoute();

const { data } = usePage(route.params.page as string);
</script>
