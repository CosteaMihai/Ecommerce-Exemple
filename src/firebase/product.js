import { db } from '../main';

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
        console.log(snapshot);
        snapshot.forEach((doc) => {
            array.push({ id: doc.id, ...doc.data() });
        });
        first = snapshot.docs[0];
        last = snapshot.docs[limit - 1];
        return {
            first,
            last,
            array,
            page,
        };
    } catch (error) {
        console.log(error);
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
        snapshot.forEach((doc) => {
            array.push({ id: doc.id, ...doc.data() });
        });
        last = snapshot.docs[limit - 1];
        return {
            first: '',
            last,
            array,
            page: 1,
        };
    } catch (error) {
        console.log(error);
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
        console.log(snapshot);
        snapshot.forEach((doc) => {
            array.push({ id: doc.id, ...doc.data() });
        });
        last = snapshot.docs[limit - 1];
        first = snapshot.docs[0];
        return {
            first,
            last,
            array,
            page,
        };
    } catch (error) {
        console.log(error);
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
const Product = {
    nextPageProducts,
    initialPageProducts,
    previousPageProducts,
    products,
    getProductsFromDatabaseById,
};

export default Product;
