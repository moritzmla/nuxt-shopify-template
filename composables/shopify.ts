import type {
    CollectionResponse,
    CollectionsResponse,
    Edges,
    PageModel,
    ProductModel,
    ProductResponse,
} from "~/types/shopify";

export function useCollections() {
    const query = gql`
        {
            collections(first: 100, sortKey: TITLE) {
                edges {
                    node {
                        id
                        handle
                        title
                        description
                        image {
                            id
                            url
                        }
                    }
                }
            }
        }
    `;

    return useAsyncQuery<CollectionsResponse>(query);
}

export function useCollection(slug: string, first?: number) {
    const query = gql`
        query getCollection($slug: String!, $first: Int!) {
            collection(handle: $slug) {
                id
                handle
                title
                description
                image {
                    id
                    url
                }
                products(first: $first) {
                    edges {
                        node {
                            id
                            title
                            handle
                            description
                            priceRange {
                                maxVariantPrice {
                                    amount
                                    currencyCode
                                }
                                minVariantPrice {
                                    amount
                                    currencyCode
                                }
                            }
                            featuredImage {
                                id
                                url
                            }
                        }
                    }
                }
            }
        }
    `;

    return useAsyncQuery<CollectionResponse>(query, {
        slug,
        first: first ?? 100,
    });
}

export function useProduct(slug: string) {
    const query = gql`
        query getProduct($slug: String!) {
            product(handle: $slug) {
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
                    maxVariantPrice {
                        amount
                        currencyCode
                    }
                    minVariantPrice {
                        amount
                        currencyCode
                    }
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
                                amount
                                currencyCode
                            }
                        }
                    }
                }
                featuredImage {
                    id
                    url
                }
            }
        }
    `;

    return useAsyncQuery<ProductResponse>(query, {
        slug,
    });
}

export function useRecommendations(product: string) {
    const query = gql`
        query getRecommendations($product: ID!) {
            productRecommendations(productId: $product) {
                id
                title
                handle
                description
                priceRange {
                    maxVariantPrice {
                        amount
                        currencyCode
                    }
                    minVariantPrice {
                        amount
                        currencyCode
                    }
                }
                featuredImage {
                    id
                    url
                }
            }
        }
    `;

    return useAsyncQuery<{
        productRecommendations?: Array<ProductModel>;
    }>(query, {
        product,
    });
}

export function usePages() {
    type Response = {
        pages?: Edges<PageModel>;
    };

    const query = gql`
        query getPages {
            pages(first: 100) {
                edges {
                    node {
                        title
                        handle
                        body
                        bodySummary
                    }
                }
            }
        }
    `;

    return useAsyncQuery<Response>(query);
}

export function usePage(key: string) {
    type Response = {
        pageByHandle?: PageModel;
    };

    const query = gql`
        query getPage($key: String!) {
            pageByHandle(handle: $key) {
                title
                handle
                body
                bodySummary
            }
        }
    `;

    return useAsyncQuery<Response>(query, {
        key,
    });
}
