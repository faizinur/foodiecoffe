import {
    APP_CONFIG,
    PRODUCT,
    PRODUCT_OPTION,
    PRODUCT_OPTION_LIST
} from './types';

const AppConfigSchema = {
    name: APP_CONFIG,
    properties: {
        configId: "string",
        key: "string?",
        value: "string?",
    },
    primaryKey: "configId",
};

const ProductSchema = {
    name: PRODUCT,
    properties: {
        productId: 'string',
        id: "string?",
        name: "string?",
        categoryId: "string?",
        categoryName: "string?",
        description: "string?",
        image: 'string?',
        image: '{}',
        price: "int?",
        options: 'string?',
        addons: 'string?',
        options: {
            type: 'list',
            objectType: PRODUCT_OPTION
        },
        addons: {
            type: 'list',
            objectType: PRODUCT_OPTION
        },
        merchantId: "string?"
    },
    primaryKey: "productId",
};

const productOption = {
    name: PRODUCT_OPTION,
    embedded: true,
    properties: {
        name: "string?",
        list: {
            type: 'list',
            objectType: PRODUCT_OPTION_LIST,
        }
    }
}

const productOptionList = {
    name: PRODUCT_OPTION_LIST,
    embedded: true,
    properties: {
        name: "string?",
        price: "int?",
        available: { type: 'bool', default: false },
    }
}

const migrationAppConfigSchema = (oldRealm, newRealm) => {
    const oldObjects = oldRealm.objects(APP_CONFIG);
    const newObjects = newRealm.objects(APP_CONFIG);
    for (const objectIndex in oldObjects) {
        const oldObject = oldObjects[objectIndex];
        const newObject = newObjects[objectIndex];
        for (let key in AppConfigSchema.properties) {
            newObject[key] = oldObject[key];
        }
    }
};

const migrationProductSchema = (oldRealm, newRealm) => {
    const oldObjects = oldRealm.objects(PRODUCT);
    const newObjects = newRealm.objects(PRODUCT);
    for (const objectIndex in oldObjects) {
        const oldObject = oldObjects[objectIndex];
        const newObject = newObjects[objectIndex];
        for (let key in ProductSchema.properties) {
            newObject[key] = oldObject[key];
        }
    }
};

const migrationProductOption = (oldRealm, newRealm) => {
    const oldObjects = oldRealm.objects(PRODUCT_OPTION);
    const newObjects = newRealm.objects(PRODUCT_OPTION);
    for (const objectIndex in oldObjects) {
        const oldObject = oldObjects[objectIndex];
        const newObject = newObjects[objectIndex];
        for (let key in productOption.properties) {
            newObject[key] = oldObject[key];
        }
    }
};

const migrationProductOptionList = (oldRealm, newRealm) => {
    const oldObjects = oldRealm.objects(PRODUCT_OPTION_LIST);
    const newObjects = newRealm.objects(PRODUCT_OPTION_LIST);
    for (const objectIndex in oldObjects) {
        const oldObject = oldObjects[objectIndex];
        const newObject = newObjects[objectIndex];
        for (let key in productOptionList.properties) {
            newObject[key] = oldObject[key];
        }
    }
};

export {
    AppConfigSchema,
    ProductSchema,
    productOption,
    productOptionList,
    migrationAppConfigSchema,
    migrationProductSchema,
    migrationProductOption,
    migrationProductOptionList,
}