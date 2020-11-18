import { db } from '../main';

const getUserByID = async (userID) => {
    return await db
        .collection('users')
        .doc(`${userID}`)
        .get();
};
const User = {
    getUserByID,
};

export default User;
