import {
    APP_CONFIG,
    PRODUCT,
    TRANSACTION,
    TRANSACTION_ITEMS,
    ORDER,
    ORDER_ITEMS,
    NEW_ORDER,
    NEW_ORDER_ITEMS,
    PRODUCT_OPTION,
    PRODUCT_OPTION_LIST
} from './types';

const AppConfigSchema = {
    name: APP_CONFIG,
    properties: {
        id: "string",
        key: "string?",
        value: "string?",
    },
    primaryKey: "id",
};

const ProductSchema = {
    name: PRODUCT,
    properties: {
        id: "string",
        name: "string?",
        categoryId: "string?",
        categoryName: "string?",
        description: "string?",
        image: '{}',
        price: "int?",
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
    primaryKey: "id",
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

const orderProductSchema = {
    name: ORDER,
    properties: {
        id: "string",
        createdAt: "string?",
        discount: "int?",
        invoice: "string?",
        items: {
            type: 'list',
            objectType: ORDER_ITEMS
        },
        name: "string?",
        paid: "int?",
        payment: "string?",
        phone: "string?",
        ppn: "int?",
        status: "string?",
        subTotal: "int?",
        tableId: "string?",
        tableNumber: "string?",
        total: "int?",
        type: "string?",
    },
    primaryKey: "id",
};

const orderProductItemsSchema = {
    name: ORDER_ITEMS,
    embedded: true,
    properties: {
        id: "string",
        name: "string?",
        categoryId: "string?",
        categoryName: "string?",
        description: "string?",
        image: '{}',
        price: "int?",
        options: {
            type: 'list',
            objectType: PRODUCT_OPTION
        },
        addons: {
            type: 'list',
            objectType: PRODUCT_OPTION
        },
        merchantId: "string?",
        notes: "{}",
        qty: "int?",
        discount: "int?",
        information: "string?",
        menuId: "string?",
        menuName: "string?",
        totalAddons: "int?",
        totalOptions: "int?",
        totalPrice: "int?",
    },
};

const transactionSchema = {
    name: TRANSACTION,
    properties: {
        id: "string",
        createdAt: "string?",
        discount: "int?",
        invoice: "string?",
        items: {
            type: 'list',
            objectType: TRANSACTION_ITEMS
        },
        merchantId: "string?",
        merchantName: "string?",
        name: "string?",
        paid: "int?",
        payment: "string?",
        phone: "string?",
        ppn: "int?",
        status: "string?",
        subTotal: "int?",
        tableNumber: "string?",
        total: "int?",
    },
    primaryKey: "id",
}

const transactionItemsSchema = {
    name: TRANSACTION_ITEMS,
    embedded: true,
    properties: {
        menuId: "string?",
        menuName: "string?",
        price: "int?",
        totalOptions: "int?",
        totalAddons: "int?",
        qty: "int?",
        discount: "int?",
        totalPrice: "int?",
        options: {
            type: 'list',
            objectType: PRODUCT_OPTION
        },
        addons: {
            type: 'list',
            objectType: PRODUCT_OPTION
        },
    },
}

const newOrderSchema = {
    name: NEW_ORDER,
    properties: {
        id: "string",
        invoice: "string?",
        merchantId: "string?",
        merchantName: "string?",
        name: "string?",
        phone: "string?",
        payment: "string?",
        subTotal: "int?",
        discount: "int?",
        ppn: "int?",
        total: "int?",
        paid: "int?",
        createdAt: "string?",
        status: "string?",
        tableNumber: "string?",
        type: "string?",
        tableId: "string?",
        items: {
            type: 'list',
            objectType: NEW_ORDER_ITEMS
        },
    },
    primaryKey: "id",
}

const newOrderItemsSchema = {
    name: NEW_ORDER_ITEMS,
    embedded: true,
    properties: {
        menuId: "string?",
        menuName: "string?",
        image: '{}',
        categoryId: "string?",
        options: {
            type: 'list',
            objectType: PRODUCT_OPTION
        },
        addons: {
            type: 'list',
            objectType: PRODUCT_OPTION
        },
        information: "string?",
        price: "int?",
        totalOptions: "int?",
        totalAddons: "int?",
        totalPrice: "int?",
        qty: "int?",
        discount: "int?",
    },
};

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

const migrationOrderProductSchema = (oldRealm, newRealm) => {
    const oldObjects = oldRealm.objects(ORDER);
    const newObjects = newRealm.objects(ORDER);
    for (const objectIndex in oldObjects) {
        const oldObject = oldObjects[objectIndex];
        const newObject = newObjects[objectIndex];
        for (let key in orderProductSchema.properties) {
            newObject[key] = oldObject[key];
        }
    }
};

const migrationOrderProductItemsSchema = (oldRealm, newRealm) => {
    const oldObjects = oldRealm.objects(ORDER_ITEMS);
    const newObjects = newRealm.objects(ORDER_ITEMS);
    for (const objectIndex in oldObjects) {
        const oldObject = oldObjects[objectIndex];
        const newObject = newObjects[objectIndex];
        for (let key in orderProductItemsSchema.properties) {
            newObject[key] = oldObject[key];
        }
    }
};

const migrationTransactionSchema = (oldRealm, newRealm) => {
    const oldObjects = oldRealm.objects(ORDER_ITEMS);
    const newObjects = newRealm.objects(ORDER_ITEMS);
    for (const objectIndex in oldObjects) {
        const oldObject = oldObjects[objectIndex];
        const newObject = newObjects[objectIndex];
        for (let key in transactionSchema.properties) {
            newObject[key] = oldObject[key];
        }
    }
};

const migrationTransactionItemsSchema = (oldRealm, newRealm) => {
    const oldObjects = oldRealm.objects(ORDER_ITEMS);
    const newObjects = newRealm.objects(ORDER_ITEMS);
    for (const objectIndex in oldObjects) {
        const oldObject = oldObjects[objectIndex];
        const newObject = newObjects[objectIndex];
        for (let key in transactionItemsSchema.properties) {
            newObject[key] = oldObject[key];
        }
    }
};

const migrationNewOrderSchema = (oldRealm, newRealm) => {
    const oldObjects = oldRealm.objects(ORDER_ITEMS);
    const newObjects = newRealm.objects(ORDER_ITEMS);
    for (const objectIndex in oldObjects) {
        const oldObject = oldObjects[objectIndex];
        const newObject = newObjects[objectIndex];
        for (let key in newOrderSchema.properties) {
            newObject[key] = oldObject[key];
        }
    }
};

const migrationNewOrderItemsSchema = (oldRealm, newRealm) => {
    const oldObjects = oldRealm.objects(ORDER_ITEMS);
    const newObjects = newRealm.objects(ORDER_ITEMS);
    for (const objectIndex in oldObjects) {
        const oldObject = oldObjects[objectIndex];
        const newObject = newObjects[objectIndex];
        for (let key in newOrderItemsSchema.properties) {
            newObject[key] = oldObject[key];
        }
    }
};

export {
    AppConfigSchema,
    ProductSchema,
    productOption,
    productOptionList,
    orderProductSchema,
    orderProductItemsSchema,
    transactionSchema,
    transactionItemsSchema,
    newOrderSchema,
    newOrderItemsSchema,
    migrationAppConfigSchema,
    migrationProductSchema,
    migrationProductOption,
    migrationProductOptionList,
    migrationOrderProductSchema,
    migrationOrderProductItemsSchema,
    migrationTransactionSchema,
    migrationTransactionItemsSchema,
    migrationNewOrderSchema,
    migrationNewOrderItemsSchema,
}