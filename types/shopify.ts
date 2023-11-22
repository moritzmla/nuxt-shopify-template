export type Edges<T> = {
    edges: Array<Nodes<T>>;
};

export type Nodes<T> = {
    node: T;
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
    priceRange: PriceRangeModel;
    options: Array<OptionModel>;
    variants: Edges<VariantModel>;
};

export type CollectionModel = {
    id: string;
    handle: string;
    title: string;
    description: string;
    image: ImageModel;
    products: Edges<ProductModel>;
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

export type VariantModel = {
    id: string;
    title: string;
    availableForSale: boolean;
    selectedOptions: Array<SelectedOptionModel>;
    price: PriceModel;
};

export type SelectedOptionModel = {
    name: string;
    value: string;
};

export type PriceModel = {
    amount: number;
    currencyCode: string;
};

export type PriceRangeModel = {
    minVariantPrice: PriceModel;
    maxVariantPrice: PriceModel;
};
