<template>
    <header
        class="flex items-center justify-between p-4 gap-4 bg-white border-b border-slate-200 z-50"
    >
        <div class="flex items-center gap-4">
            <UiBrand />

            <hr class="w-px h-6 border-none bg-slate-200" />

            <UiLink class="text-sm hover:underline" to="/collections"> Explore </UiLink>
        </div>

        <UiButton variant="text" class="text-sm" aria-label="Shopping Cart" to="/cart">
            <IconShoppingCart width="22" height="22" />

            <span class="hidden md:block"> Shopping Cart </span>
        </UiButton>
    </header>

    <div class="flex flex-col">
        <slot />
    </div>

    <footer class="flex flex-col border-t border-slate-200">
        <div
            class="flex flex-col items-start gap-8 md:gap-12 md:flex-row mx-auto w-full max-w-6xl p-8"
        >
            <UiBrand />

            <div class="flex flex-col gap-2">
                <UiLink :to="`/${page.node.handle}`" v-for="page in data?.pages.edges">
                    {{ page.node.title }}
                </UiLink>
            </div>
        </div>

        <div
            class="flex gap-2 flex-col md:flex-row items-center justify-between text-sm font-semibold border-t border-slate-200 p-4"
        >
            <UiButton variant="text" to="/">
                <span class="px-2"> © {{ new Date().getFullYear() }} ACME </span>
            </UiButton>

            <div class="flex gap-2">
                <UiButton
                    variant="outline"
                    target="_blank"
                    aria-label="GitHub"
                    to="https://github.com/moritzmla/nuxt-shopify-template"
                >
                    <IconBrandGithub width="20" height="20" />
                </UiButton>

                <UiButton target="_blank" to="https://moritzmla.com/">
                    <span class="px-2"> Created by Moritz Müller </span>
                </UiButton>
            </div>
        </div>
    </footer>
</template>

<script setup lang="ts">
import { IconBrandGithub, IconShoppingCart } from "@tabler/icons-vue";

const { data } = usePages();
</script>
