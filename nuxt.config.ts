export default defineNuxtConfig({
    modules: ["@nuxtjs/apollo", "@unocss/nuxt"],

    devtools: {
        enabled: false,
    },

    css: ["@unocss/reset/tailwind.css"],

    apollo: {
        clients: {
            default: {
                httpEndpoint: "https://mock.shop/api",
            },
        },
    },

    unocss: {
        rules: [
            [
                "grid-layout-main",
                {
                    "grid-template-rows": "min-content 1fr min-content",
                },
            ],
        ],
        safelist: ["overflow-y-scroll"],
    },

    app: {
        head: {
            title: "Acme Store",
            link: [
                {
                    rel: "icon",
                    href: "/favicon.svg",
                },
            ],
            meta: [
                {
                    name: "description",
                    content: "Acme Store Description",
                },
            ],
            htmlAttrs: {
                lang: "en",
            },
            bodyAttrs: {
                class: "overflow-y-scroll",
            },
        },
    },
});
