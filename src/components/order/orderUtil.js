exports.getSalesByDay = function (orders) {
    if (!orders) {
        return 0;
    }

    return orders.filter((order) => {
        const { createdAt } = order;

        const createdDate = new Date(createdAt);
        const currentDate = new Date();
        return createdDate.getDate() === currentDate.getDate();
    }).length;
}

exports.getSalesByMonth = function (orders) {
    return orders.filter((order) => {
        const { createdAt } = order;

        const createdDate = new Date(createdAt);
        const currentDate = new Date();
        return createdDate.getMonth() === currentDate.getMonth();
    }).length;
}

exports.getSalesByQuarter = function (orders) {
    return orders.filter((order) => {
        const { createdAt } = order;

        const createdDate = new Date(createdAt);
        const currentDate = new Date();
        const createdQuarter = Math.floor((createdDate.getMonth() + 3) / 3);
        const currentQuarter = Math.floor((currentDate.getMonth() + 3) / 3);

        return (
          createdQuarter === currentQuarter &&
          createdDate.getFullYear() === currentDate.getFullYear()
        );
    }).length;
}

exports.getSalesByYear = function (orders) {
    return orders.filter((order) => {
        const { createdAt } = order;

        const createdDate = new Date(createdAt);
        const currentDate = new Date();
        return createdDate.getFullYear() === currentDate.getFullYear();
    }).length;
}