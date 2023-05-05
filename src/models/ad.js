import mongoose from 'mongoose';

const { Schema } = mongoose;

const promotionSchema = new Schema({
    occasion: String,
    currency: String,
    promotion_type: String,
    discount: String,
    automatic_domain_name: String,
    promotion_details: String,
    promotion_start_date: String,
    promotion_end_date: String
});

const priceItemSchema = new Schema({
    headline: String,
    price: String,
    description: String
});

const priceAssetSchema = new Schema({
    currency: String,
    price_qualifier: String,
    priceItems: [priceItemSchema]
});

const structuredSnippetsSchema = new Schema({
    header: String,
    snippetsItems: [String]
});

const siteLinkSchema = new Schema({
    headline: String,
    description_1: String,
    description_2: String
});

const adSchema = new Schema({
    final_url: String,
    headlines: [String],
    descriptions: [String],
    site_link_asset: [siteLinkSchema],
    callout_asset: [String],
    promotions_asset: promotionSchema,
    price_asset: priceAssetSchema,
    phone_number: String,
    address: String,
    message: String,
    advertiser_rating: Boolean,
    structured_snippets: structuredSnippetsSchema,
    generatedID: { type: String, unique: true },
    isSiteLinkHead: { type: Boolean, default: false },
    isSiteLinkDesc: { type: Boolean, default: false },
    isCallout: { type: Boolean, default: false },
    ispromotion: { type: Boolean, default: false },
    isAddPrice: { type: Boolean, default: false },
    isCallAsset: { type: Boolean, default: false },
    isLocationAsset: { type: Boolean, default: false },
    isMessageAsset: { type: Boolean, default: false },
    isSnippetsAsset: { type: Boolean, default: false },
});

let Ad;

try {
    Ad = mongoose.model('Ad');
} catch (error) {
    Ad = mongoose.model('Ad', adSchema);
}

export default Ad;
