import type {
    CollectionResponse,
    CollectionsResponse,
    ProductModel,
    ProductResponse,
    ProductsResponse,
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

export function useProducts(collection: string, first?: number) {
    const query = gql`
        query getProducts($collection: String!, $first: Int!) {
            collection(handle: $collection) {
                products(first: $first) {
                    edges {
                        node {
                            id
                            title
                            handle
                            description
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

    return useAsyncQuery<ProductsResponse>(query, {
        collection,
        first: first ?? 1000,
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
