export type Edges<T> = {
    edges: Array<{
        node: T;
    }>;
};

export type ImageModel = {
    id: string;
    url: string;
};

export type ProductModel = {
    id: string;
    handle: string;
    title: string;
    description: string;
    featuredImage: ImageModel;
};

export type CollectionModel = {
    id: string;
    handle: string;
    title: string;
    description: string;
    image: ImageModel;
};

export type CollectionsResponse = {
    collections: Edges<CollectionModel>;
};
