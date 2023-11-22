<template>
    <UiCenter>
        <UiHeading> Collections </UiHeading>

        <div class="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
            <div class="flex flex-col gap-4" v-for="collection in data?.collections?.edges">
                <NuxtLink :to="`/collections/${collection.node.handle}`">
                    <img
                        class="rounded aspect-square shadow"
                        :alt="collection.node.title"
                        :src="collection.node.image.url"
                    />
                </NuxtLink>

                <NuxtLink
                    class="font-semibold text-xl"
                    :to="`/collections/${collection.node.handle}`"
                >
                    {{ collection.node.title }}
                </NuxtLink>
            </div>
        </div>
    </UiCenter>
</template>

<script setup lang="ts">
const { data } = useCollections();
</script>
