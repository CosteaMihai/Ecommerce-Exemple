import { db } from '../main';

const extractCategoriesFromDatabase = async () => {
    return await db.collection('categories').get();
};
const addCategoryToDatabase = async (category) => {
    await db
        .collection('categories')
        .doc(`${category}`)
        .set({});
};
const deleteCategoryFromDatabase = async (category) => {
    await db
        .collection('categories')
        .doc(`${category}`)
        .delete();
};
const Category = {
    extractCategoriesFromDatabase,
    addCategoryToDatabase,
    deleteCategoryFromDatabase,
};

export default Category;
