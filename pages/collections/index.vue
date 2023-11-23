<template>
    <UiCenter>
        <UiHeading> Collections </UiHeading>

        <div class="grid place-content-center sm:grid-cols-2 md:grid-cols-3 gap-8">
            <CollectionModel
                :model-value="collection.node"
                v-for="collection in data?.collections.edges"
            />
        </div>
    </UiCenter>
</template>

<script setup lang="ts">
const { data } = await useCollections();

useSeoMeta({
    title: "Collections - Acme Store",
});
</script>
