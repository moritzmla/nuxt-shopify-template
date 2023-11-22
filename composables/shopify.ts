import type { CollectionsResponse } from "~/types/shopify";

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

export function useCollection(slug: string) {
    const query = gql`
        query getCollection($slug: String!) {
            collection(handle: $slug) {
                id
                handle
                title
                description
                image {
                    id
                    url
                }
                products(first: 100) {
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

    return useAsyncQuery(query, {
        slug,
    });
}

export function useProduct(slug: string) {
    const query = gql`
        query getProduct($slug: String!) {
            product(handle: $slug) {
                id
                title
                description
                featuredImage {
                    id
                    url
                }
            }
        }
    `;

    return useAsyncQuery(query, {
        slug,
    });
}
