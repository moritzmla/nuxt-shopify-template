<template>
    {{
        modelValue
            ? Intl.NumberFormat(undefined, {
                  style: "currency",
                  currency: modelValue.currencyCode,
                  currencyDisplay: "narrowSymbol",
              }).format(modelValue.amount)
            : "---"
    }}
</template>

<script setup lang="ts">
import type { PriceModel } from "~/types/shopify";

defineProps<{
    modelValue?: PriceModel;
}>();
</script>
