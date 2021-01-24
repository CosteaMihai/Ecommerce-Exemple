const formatDate = (date) => {
    const brutDate = new Date(date.seconds * 1000 + date.nanoseconds);
    return `${brutDate.getDate()}-${brutDate.getMonth() +
        1}-${brutDate.getFullYear()} ${brutDate.getHours()}:${brutDate.getMinutes()}`;
};

export { formatDate };
