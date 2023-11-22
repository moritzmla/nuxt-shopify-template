export type Edges<T> = {
    edges?: Array<{
        node?: T;
    }>;
};

export type ImageModel = {
    id?: string;
    url?: string;
};

export type ProductModel = {
    id?: string;
    handle?: string;
    title?: string;
    description?: string;
    featuredImage?: ImageModel;
};

export type CollectionModel = {
    id?: string;
    handle?: string;
    title?: string;
    description?: string;
    image?: ImageModel;
    products?: Edges<ProductModel>;
};

export type CollectionsResponse = {
    collections?: Edges<CollectionModel>;
};

export type CollectionResponse = {
    collection?: CollectionModel;
};

export type ProductResponse = {
    product?: ProductModel;
};

export type ProductsResponse = {
    collection?: {
        products?: Edges<ProductModel>;
    };
};
