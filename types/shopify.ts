export type Edges<T> = {
    edges: Array<Nodes<T>>;
};

export type Nodes<T> = {
    node: T;
};

export type SeoModel = {
    title: string;
    description: string;
};

export type ImageModel = {
    url: string;
    altText: string;
    width: number;
    height: number;
};

export type ProductModel = {
    id: string;
    handle: string;
    title: string;
    description: string;
    seo: SeoModel;
    featuredImage: ImageModel;
    options: Array<OptionModel>;
    variants: Edges<VariantModel>;
    priceRange: {
        minVariantPrice: PriceModel;
        maxVariantPrice: PriceModel;
    };
};

export type CollectionModel = {
    id: string;
    handle: string;
    title: string;
    description: string;
    seo: SeoModel;
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

export type CreateCartLineRequest = {
    merchandiseId: string;
    quantity: number;
};

export type UpdateCartLineRequest = {
    id: string;
    merchandiseId: string;
    quantity: number;
};

export type CartLineModel = {
    id: string;
    quantity: number;
    cost: {
        totalAmount: PriceModel;
    };
    merchandise: VariantModel & {
        product: ProductModel;
    };
};

export type CartModel = {
    id: string;
    checkoutUrl: string;
    totalQuantity: number;
    cost: {
        subtotalAmount: PriceModel;
        totalAmount: PriceModel;
        totalTaxAmount: PriceModel;
    };
    lines: Edges<CartLineModel>;
};
