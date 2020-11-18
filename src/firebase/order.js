import { db } from '../main';

const extractOrdersFromDatabase = async () => {
    return await db.collection('orders').get();
};

const Order = {
    extractOrdersFromDatabase,
};
export default Order;
