const service = require("../../components/order/orderService");

exports.getSales = async (req, res) => {
    try {
        const sales = await service.getSales();
        res.json(sales);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
