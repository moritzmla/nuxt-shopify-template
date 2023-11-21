export function useCollections() {
    const query = gql`
        {
            collections(first: 10) {
                edges {
                    cursor
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

    return useAsyncQuery(query);
}
