<template>
    <main class="grid grid-layout-main h-screen overflow-y-scroll">
        <header
            class="flex items-center justify-between p-4 gap-4 bg-white sticky top-0 border-b border-slate-200"
        >
            <div class="flex items-center gap-4">
                <div class="flex items-center gap-2">
                    <img width="32" height="32" src="/favicon.svg" />

                    <NuxtLink to="/" class="font-semibold font-mono"> ACME STORE </NuxtLink>
                </div>

                <NuxtLink to="/collections"> Explore </NuxtLink>
            </div>

            <UiButton variant="text" class="text-sm" to="/cart">
                <IconShoppingCart width="22" height="22" />

                Shopping Cart
            </UiButton>
        </header>

        <div class="flex flex-col">
            <slot />
        </div>

        <footer class="flex items-center justify-between p-4 gap-4 border-t border-slate-200">
            <span> © {{ new Date().getFullYear() }} ACME </span>

            <NuxtLink target="_blank" to="https://moritzmueller.co/">
                Created by Moritz Müller
            </NuxtLink>
        </footer>
    </main>
</template>

<script setup lang="ts">
import { IconShoppingCart } from "@tabler/icons-vue";
</script>
