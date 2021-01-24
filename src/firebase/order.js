import { db } from '../main';

const extractOrdersFromDatabase = async (start, end, range) => {
    try {
        console.log(range);
        return await db
            .collection('orders')
            .where('date', '>=', start)
            .where('date', '<=', end)
            .where('status', 'in', range.length ? range : [0, 1, 2])
            .get();
    } catch (error) {
        console.log('Fetching orders error:', error);
    }
};
const changeCompleteStatusOrder = async (id, status) => {
    try {
        await db
            .collection('orders')
            .doc(`${id}`)
            .update({
                status,
            });
    } catch (error) {
        console.log('Error while changing status of the order', error);
    }
};
const searchOrderInDatabaseByID = async (id) => {
    try {
        return await db
            .collection('orders')
            .doc(`${id}`)
            .get();
    } catch (error) {
        console.log('Error while fetching order by ID', error);
    }
};
const deleteOrderFromDatabase = async (id) => {
    try {
        await db
            .collection('orders')
            .doc(`${id}`)
            .delete();
    } catch (error) {
        console.log('Error while fetching order by ID', error);
    }
};

const Order = {
    extractOrdersFromDatabase,
    changeCompleteStatusOrder,
    searchOrderInDatabaseByID,
    deleteOrderFromDatabase,
};
export default Order;
