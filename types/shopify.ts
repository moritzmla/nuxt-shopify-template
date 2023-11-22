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
    priceRange?: PriceRangeModel;
    options?: Array<OptionModel>;
};

export type CollectionModel = {
    id?: string;
    handle?: string;
    title?: string;
    description?: string;
    image?: ImageModel;
    products?: Edges<ProductModel>;
};

export type PageModel = {
    title: string;
    handle: string;
    body: string;
    bodySummary: string;
};

export type OptionModel = {
    name: string;
    values: Array<string>;
};

export type VariantPriceModel = {
    amount?: number;
    currencyCode?: string;
};

export type PriceRangeModel = {
    minVariantPrice?: VariantPriceModel;
    maxVariantPrice?: VariantPriceModel;
};
