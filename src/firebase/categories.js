import { db } from '../main';

const extractCategoriesFromDatabase = async () => {
    try {
        return await db.collection('categories').get();
    } catch (error) {
        console.log('Error while extracting categories:', error);
    }
};
const addCategoryToDatabase = async (category) => {
    try {
        await db
            .collection('categories')
            .doc(`${category}`)
            .set({});
    } catch (error) {
        console.log('Error while adding a category:', error);
    }
};
const deleteCategoryFromDatabase = async (category) => {
    try {
        await db
            .collection('categories')
            .doc(`${category}`)
            .delete();
    } catch (error) {
        console.log('Error while deleting a category', error);
    }
};
const Category = {
    extractCategoriesFromDatabase,
    addCategoryToDatabase,
    deleteCategoryFromDatabase,
};

export default Category;
