import connectDB from '../../config/db';
import Ad from '../../models/ad';
import mongoose from 'mongoose';

connectDB();

export default async function handler(req, res) {
    try {
        const { id } = req.query;
        const ad = await Ad.findOne({ generatedID: id });

        if (!ad) {
            return res.status(404).json({ message: 'Ad not found' });
        }

        res.status(200).json(ad);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
}
