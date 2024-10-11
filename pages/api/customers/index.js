// pages/api/customer/index.js
import dbConnect from '../../../lib/db';
import Customer from '../../../models/Customer';

export default async function handler(req, res) {
    await dbConnect();
    const { method } = req;

    switch (method) {
        case 'GET':
            try {
                const customers = await Customer.find({});
                res.status(200).json({ success: true, data: customers });
            } catch (error) {
                res.status(400).json({ success: false, message: error.message });
            }
            break;

        case 'POST':
            try {
                const customer = await Customer.create(req.body);
                res.status(201).json({ success: true, data: customer });
            } catch (error) {
                res.status(400).json({ success: false, message: error.message });
            }
            break;

        default:
            res.status(405).json({ success: false, message: 'Method Not Allowed' });
            break;
    }
}
