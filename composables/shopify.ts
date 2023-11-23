import type {
    CartLineInput,
    CartLineUpdateInput,
    CartModel,
    CollectionModel,
    Edges,
    PageModel,
    ProductModel,
} from "~/types/shopify";

const imageFragment = gql`
    fragment image on Image {
        url
        altText
        width
        height
    }
`;

const priceFragment = gql`
    fragment price on MoneyV2 {
        amount
        currencyCode
    }
`;

const pageFragment = gql`
    fragment page on Page {
        title
        handle
        body
        bodySummary
    }
`;

const seoFragment = gql`
    fragment seo on SEO {
        description
        title
    }
`;

const collectionFragment = gql`
    fragment collection on Collection {
        id
        handle
        title
        description
        image {
            ...image
        }
        seo {
            ...seo
        }
    }
    ${seoFragment}
    ${imageFragment}
`;

const productFragment = gql`
    fragment product on Product {
        id
        title
        handle
        description
        options {
            id
            name
            values
        }
        priceRange {
            minVariantPrice {
                ...price
            }
            maxVariantPrice {
                ...price
            }
        }
        seo {
            ...seo
        }
        featuredImage {
            ...image
        }
        variants(first: 250) {
            edges {
                node {
                    id
                    title
                    availableForSale
                    selectedOptions {
                        name
                        value
                    }
                    price {
                        ...price
                    }
                }
            }
        }
    }
    ${seoFragment}
    ${priceFragment}
    ${imageFragment}
`;

const cartFragment = gql`
    fragment cart on Cart {
        id
        checkoutUrl
        totalQuantity
        cost {
            subtotalAmount {
                ...price
            }
            totalAmount {
                ...price
            }
            totalTaxAmount {
                ...price
            }
        }
        lines(first: 100) {
            edges {
                node {
                    id
                    quantity
                    cost {
                        totalAmount {
                            ...price
                        }
                    }
                    merchandise {
                        ... on ProductVariant {
                            id
                            title
                            selectedOptions {
                                name
                                value
                            }
                            product {
                                ...product
                            }
                        }
                    }
                }
            }
        }
    }
    ${productFragment}
    ${priceFragment}
`;

export function useCollections() {
    type Response = {
        collections: Edges<CollectionModel>;
    };

    const query = gql`
        query getCollections {
            collections(first: 100, sortKey: TITLE) {
                edges {
                    node {
                        ...collection
                    }
                }
            }
        }
        ${collectionFragment}
    `;

    return useAsyncQuery<Response | undefined>(query);
}

export function useCollection(collection: string, first?: number) {
    type Response = {
        collection: CollectionModel;
    };

    const query = gql`
        query getCollection($collection: String!, $first: Int!) {
            collection(handle: $collection) {
                ...collection
                products(first: $first) {
                    edges {
                        node {
                            ...product
                        }
                    }
                }
            }
        }
        ${productFragment}
        ${collectionFragment}
    `;

    return useAsyncQuery<Response | undefined>(query, {
        collection,
        first: first ?? 100,
    });
}

export function useProduct(product: string) {
    type Response = {
        product: ProductModel;
    };

    const query = gql`
        query getProduct($product: String!) {
            product(handle: $product) {
                ...product
            }
        }
        ${productFragment}
    `;

    return useAsyncQuery<Response | undefined>(query, {
        product,
    });
}

export function useRecommendations(product: string) {
    type Response = {
        productRecommendations: Array<ProductModel>;
    };

    const query = gql`
        query getRecommendations($product: ID!) {
            productRecommendations(productId: $product) {
                ...product
            }
        }
        ${productFragment}
    `;

    return useAsyncQuery<Response | undefined>(query, {
        product,
    });
}

export function usePages() {
    type Response = {
        pages: Edges<PageModel>;
    };

    const query = gql`
        query getPages {
            pages(first: 100) {
                edges {
                    node {
                        ...page
                    }
                }
            }
        }
        ${pageFragment}
    `;

    return useAsyncQuery<Response | undefined>(query);
}

export function usePage(page: string) {
    type Response = {
        pageByHandle: PageModel;
    };

    const query = gql`
        query getPage($page: String!) {
            pageByHandle(handle: $page) {
                ...page
            }
        }
        ${pageFragment}
    `;

    return useAsyncQuery<Response | undefined>(query, {
        page,
    });
}

export function useCart(cart: string) {
    type Response = {
        cart: CartModel;
    };

    const query = gql`
        query getCart($cart: ID!) {
            cart(id: $cart) {
                ...cart
            }
        }
        ${cartFragment}
    `;

    return useAsyncQuery<Response | undefined>(query, {
        cart,
    });
}

export function useCreateCart() {
    type Response = {
        cartCreate: {
            cart: CartModel;
        };
    };

    const mutation = gql`
        mutation createCart($lines: [CartLineInput!]) {
            cartCreate(input: { lines: $lines }) {
                cart {
                    ...cart
                }
            }
        }
        ${cartFragment}
    `;

    return useMutation<Response>(mutation);
}

export function useUpdateCartLines(cart: string, lines: Array<CartLineUpdateInput>) {
    type Response = {};

    const mutation = gql`
        mutation editCartItems($cart: ID!, $lines: [CartLineUpdateInput!]!) {
            cartLinesUpdate(cartId: $cart, lines: $lines) {
                cart {
                    ...cart
                }
            }
        }
        ${cartFragment}
    `;

    return useMutation<Response>(mutation, {
        variables: {
            cart,
            lines,
        },
    });
}

export function useCreateCartLine(cart: string, lines: Array<CartLineInput>) {
    type Response = {};

    const mutation = gql`
        mutation addToCart($cart: ID!, $lines: [CartLineInput!]!) {
            cartLinesAdd(cartId: $cart, lines: $lines) {
                cart {
                    ...cart
                }
            }
        }
        ${cartFragment}
    `;

    return useMutation<Response>(mutation, {
        variables: {
            cart,
            lines,
        },
    });
}

export function useDeleteCartLine(cart: string, lines: Array<string>) {
    type Response = {};

    const mutation = gql`
        mutation removeFromCart($cart: ID!, $lines: [ID!]!) {
            cartLinesRemove(cartId: $cart, lineIds: $lines) {
                cart {
                    ...cart
                }
            }
        }
        ${cartFragment}
    `;

    return useMutation<Response>(mutation, {
        variables: {
            cart,
            lines,
        },
    });
}
