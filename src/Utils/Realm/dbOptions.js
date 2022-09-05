import {
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
} from './schema';

let key = new Int8Array(64);
key[0] = 10;
key[2] = 69;
key[21] = 10;
key[32] = 1;
key[44] = 9;
key[50] = 0;
key[60] = 4;
key[64] = 9;
key[62] = 5;

const version = 1;

export default dbOptions = {
    path: "FoodieCoffieDB",
    schema: [
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
    ],
    schemaVersion: version,
    encryptionKey: key,
    migration: (oldRealm, newRealm) => {
        if (oldRealm.schemaVersion < version) {
            migrationAppConfigSchema(oldRealm, newRealm);
            migrationProductSchema(oldRealm, newRealm);
            migrationProductOption(oldRealm, newRealm);
            migrationProductOptionList(oldRealm, newRealm);
            migrationOrderProductSchema(oldRealm, newRealm);
            migrationOrderProductItemsSchema(oldRealm, newRealm);
            migrationTransactionSchema(oldRealm, newRealm);
            migrationTransactionItemsSchema(oldRealm, newRealm);
            migrationNewOrderSchema(oldRealm, newRealm);
            migrationNewOrderItemsSchema(oldRealm, newRealm);
        }
    },
}
