import connectDB from '../../config/db';
import { generateUniqueId } from '../../helper/helpers';
import Ad from '../../models/ad';

// Use the Ad model here

connectDB();
export default async function handler(req, res) {
    // Handle the API request here
    try {
        const adId = generateUniqueId();
        const ad = new Ad({
            _id: adId,
            final_url: req.body.final_url,
            headlines: req.body.headlines,
            descriptions: req.body.descriptions,
            site_link_asset: req.body.site_link_asset,
            callout_asset: req.body.callout_asset,
            promotions_asset: req.body.promotions_asset,
            price_asset: req.body.price_asset,
            phone_number: req.body.phone_number,
            address: req.body.address,
            message: req.body.message,
            advertiser_rating: req.body.advertiser_rating,
            structured_snippets: req.body.structured_snippets,
            generatedID: adId,
            isSiteLinkHead: req.body.isSiteLinkHead,
            isSiteLinkDesc: req.body.isSiteLinkDesc,
            isCallout: req.body.isCallout,
            ispromotion: req.body.ispromotion,
            isAddPrice: req.body.isAddPrice,
            isCallAsset: req.body.isCallAsset,
            isLocationAsset: req.body.isLocationAsset,
            isMessageAsset: req.body.isMessageAsset,
            isSnippetsAsset: req.body.isSnippetsAsset,
        });
        console.log(req.body.final_url)
        await ad.save();
        res.status(201).json({ id: adId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
}