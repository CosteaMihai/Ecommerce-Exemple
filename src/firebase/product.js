import { db, storage } from '../main';
import { cloneDeep } from 'lodash';

const nextPageProducts = async (first, last, limit, page) => {
    try {
        page++;
        let array = [];
        let snapshot = await db
            .collection('products')
            .orderBy('name')
            .startAfter(last)
            .limit(limit)
            .get();
        for (const doc of snapshot.docs) {
            let object = { ...doc.data() };
            object.id = doc.id;
            array.push(object);
        }
        first = snapshot.docs[0];
        last = snapshot.docs[array.length - 1];
        return {
            first,
            last,
            array,
            page,
        };
    } catch (error) {
        console.log('Error at the nextPageProducts: ', error);
    }
};
const otherPageProducts = async (first, last, limit, page, previous) => {
    try {
        let array = [];
        console.log(previous, page);
        let snapshot = await db
            .collection('products')
            .orderBy('name')
            .startAfter(previous[page - 2])
            .limit(limit)
            .get();
        for (const doc of snapshot.docs) {
            let object = { ...doc.data() };
            object.id = doc.id;
            array.push(object);
        }
        first = snapshot.docs[0];
        last = snapshot.docs[array.length - 1] || '';
        return {
            first,
            last,
            array,
            page,
        };
    } catch (error) {
        console.log('Error at the otherPageProducts: ', error);
    }
};
const initialPageProducts = async (last, limit) => {
    try {
        let array = [];
        let snapshot = await db
            .collection('products')
            .orderBy('name')
            .limit(limit)
            .get();
        for (const doc of snapshot.docs) {
            let object = { ...doc.data() };
            object.id = doc.id;
            array.push(object);
        }
        last = snapshot.docs[array.length - 1];
        return {
            first: '',
            last,
            array,
            page: 1,
        };
    } catch (error) {
        console.log('Error at the initialPageProducts: ', error);
    }
};
const previousPageProducts = async (first, last, limit, page) => {
    try {
        page--;
        let array = [];
        let snapshot = await db
            .collection('products')
            .orderBy('name')
            .endBefore(first)
            .limitToLast(limit)
            .get();
        for (const doc of snapshot.docs) {
            let object = { ...doc.data() };
            object.id = doc.id;
            array.push(object);
        }
        last = snapshot.docs[array.length - 1];
        first = snapshot.docs[0];
        return {
            first,
            last,
            array,
            page,
        };
    } catch (error) {
        console.log('Error at the previousPageProducts: ', error);
    }
};
const products = async () => {
    try {
        let snapshot = await db.collection('products').get();
        return snapshot.docs.length;
    } catch (error) {
        console.log(error);
    }
};
const getProductsFromDatabaseById = async (productID) => {
    try {
        const snapshot = await db
            .collection('products')
            .doc(productID)
            .get();
        if (snapshot.exists) {
            return { id: productID, ...snapshot.data() };
        } else {
            console.log('No such document!');
        }
    } catch (error) {
        console.log('Error getting document:', error);
    }
};
const deleteProductById = async (productID) => {
    try {
        await db
            .collection('products')
            .doc(`${productID}`)
            .delete();
        await storage.ref(`${productID}`).delete();
    } catch (error) {
        console.log('Error deleting documents:', error);
    }
};
const modifyProductWithoutImage = async (product) => {
    try {
        const initialProduct = cloneDeep(product);
        const id = initialProduct.id;
        delete initialProduct.id;
        await db
            .collection('products')
            .doc(`${id}`)
            .set(initialProduct);
    } catch (error) {
        console.log('Error updating document:', error);
    }
};
const modifyProductWithImage = async (product, photo) => {
    try {
        const initialProduct = cloneDeep(product);
        const id = initialProduct.id;
        await storage.ref(`${id}`).delete();
        await storage.ref(`${id}`).put(photo);
        const imageURL = await storage.ref(`${id}`).getDownloadURL();
        initialProduct.urlPhoto = imageURL;
        delete initialProduct.id;
        await db
            .collection('products')
            .doc(`${id}`)
            .set(initialProduct);
        return initialProduct;
    } catch (error) {
        console.log('Error adding document: ', error);
    }
};
const addProductToDatabase = async (product, photo) => {
    try {
        const insertedProduct = await db.collection('products').add(product);
        await storage.ref(`${insertedProduct.id}`).put(photo);
        const imageURL = await storage
            .ref(`${insertedProduct.id}`)
            .getDownloadURL();
        await db
            .collection('products')
            .doc(`${insertedProduct.id}`)
            .update({
                urlPhoto: `${imageURL}`,
            });
        product.id = insertedProduct.id;

        product.urlPhoto = imageURL;

        return product;
    } catch (error) {
        console.log('Error adding document: ', error);
    }
};
const Product = {
    nextPageProducts,
    initialPageProducts,
    previousPageProducts,
    products,
    getProductsFromDatabaseById,
    deleteProductById,
    modifyProductWithoutImage,
    modifyProductWithImage,
    addProductToDatabase,
    otherPageProducts,
};

export default Product;
