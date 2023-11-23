<template>
    <UiCenter>
        <UiHeading>
            {{ data?.pageByHandle.title }}
        </UiHeading>

        <UiParagraph>
            {{ data?.pageByHandle.body }}
        </UiParagraph>
    </UiCenter>
</template>

<script setup lang="ts">
const route = useRoute();

const { data } = await usePage(route.params.page as string);
</script>
