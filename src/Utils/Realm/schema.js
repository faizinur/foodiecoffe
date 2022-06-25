const AppConfigSchema = {
    name: "APP_CONFIG",
    properties: {
        _id: "string?",
        key: "string?",
        value: "string?",
    },
    primaryKey: "_id",
};

const ProductSchema = {
    name: "product",
    properties: {
        id: "string?",
        name: "string?",
        categoryId: "string?",
        categoryName: "string?",
        description: "string?",
        image: 'string?',
        // image: 'productImage{}',
        price: "int?",
        options: 'string?',
        addons: 'string?',
        // options: 'productOption[]',
        // addons: 'productOption[]',
        merchantId: "string?"
    },
    primaryKey: "id",
};

// const productImage = {
//     name: 'productImage',
//     properties: {
//         name: "string?",
//         title: "string?",
//         url: "string?"
//     }
// }
// const productOption = {
//     name: "productOption",
//     properties: {
//         name: "string?",
//         list: 'productOptionList[]',
//     }
// }

// const productOptionList = {
//     name: "productOptionList",
//     properties: {
//         name: "string?",
//         price: "int"
//     }
// }

const migrationAppConfigSchema = (oldRealm, newRealm) => {
    const oldObjects = oldRealm.objects("APP_CONFIG");
    const newObjects = newRealm.objects("APP_CONFIG");
    for (const objectIndex in oldObjects) {
        const oldObject = oldObjects[objectIndex];
        const newObject = newObjects[objectIndex];
        for (let key in AppConfigSchema.properties) {
            newObject[key] = oldObject[key];
        }
    }
};

const migrationProductSchema = (oldRealm, newRealm) => {
    const oldObjects = oldRealm.objects("product");
    const newObjects = newRealm.objects("product");
    for (const objectIndex in oldObjects) {
        const oldObject = oldObjects[objectIndex];
        const newObject = newObjects[objectIndex];
        for (let key in ProductSchema.properties) {
            newObject[key] = oldObject[key];
        }
    }
};

// const migrationProductImage = (oldRealm, newRealm) => {
//     const oldObjects = oldRealm.objects("productImage");
//     const newObjects = newRealm.objects("productImage");
//     for (const objectIndex in oldObjects) {
//         const oldObject = oldObjects[objectIndex];
//         const newObject = newObjects[objectIndex];
//         for (let key in productImage.properties) {
//             newObject[key] = oldObject[key];
//         }
//     }
// };

// const migrationProductOption = (oldRealm, newRealm) => {
//     const oldObjects = oldRealm.objects("productOption");
//     const newObjects = newRealm.objects("productOption");
//     for (const objectIndex in oldObjects) {
//         const oldObject = oldObjects[objectIndex];
//         const newObject = newObjects[objectIndex];
//         for (let key in productOption.properties) {
//             newObject[key] = oldObject[key];
//         }
//     }
// };

// const migrationProductOptionList = (oldRealm, newRealm) => {
//     const oldObjects = oldRealm.objects("productOptionList");
//     const newObjects = newRealm.objects("productOptionList");
//     for (const objectIndex in oldObjects) {
//         const oldObject = oldObjects[objectIndex];
//         const newObject = newObjects[objectIndex];
//         for (let key in productOptionList.properties) {
//             newObject[key] = oldObject[key];
//         }
//     }
// };


export {
    AppConfigSchema,
    ProductSchema,
    // productImage,
    // productOption,
    // productOptionList,
    migrationAppConfigSchema,
    migrationProductSchema,
    // migrationProductImage,
    // migrationProductOption,
    // migrationProductOptionList,
}