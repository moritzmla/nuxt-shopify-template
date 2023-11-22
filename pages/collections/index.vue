<template>
    <UiCenter>
        <UiHeading> Collections </UiHeading>

        <div class="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
            <CollectionBox
                :model-value="collection.node"
                v-for="collection in data?.collections?.edges"
            />
        </div>
    </UiCenter>
</template>

<script setup lang="ts">
const { data } = useCollections();
</script>
