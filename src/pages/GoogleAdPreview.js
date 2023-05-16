import React, { useState, useEffect } from 'react';
import Script from 'next/script';
import $ from 'jquery';
import Image from 'next/image';
import { toast } from 'react-toastify';


function GoogleAdPreview() {
    const [finalUrl, setFinalUrl] = useState("https://example.com")
    const [headlineForm, setHeadlineForm] = useState(['Google Ads Preview Tool', 'Explore New Campaign Ideas', 'Master Google Ads Writing'])
    const [descriptionForm, setDescriptionForm] = useState(['Work through new ad ideas and see a preview of how it would look if your ad was live.', 'Easily share your ad with others or keep a copy for yourself with the link below.'])
    const [responseTrue, setresponseTrue] = useState(false)
    const [siteLinkAsset, setSiteLinkAsset] = useState([{ headline: 'Show 1 headline', description_1: 'show description 1', description_2: 'show description 2' }, { headline: 'Show 2 headline', description_1: 'show description 1', description_2: 'show description 2' }, { headline: 'Show 3 headline', description_1: 'show description 1', description_2: 'show description 2' }, { headline: 'Show 3 headline', description_1: 'show description 1', description_2: 'show description 1' }])
    const [calloutAsset, setCalloutAsset] = useState(['Additional Text for Ad', 'Product/Service Details', 'Highlight Offers', 'Show Additional Benefits'])
    const [promotionsAsset, setPromotionsAsset] = useState({ occasion: '', currency: '', promotion_type: '', discount: '', automatic_domain_name: '', promotion_details: '', promotion_start_date: '', promotion_end_date: '' })
    const [priceAsset, setPriceAsset] = useState({ currency: '$', price_qualifier: 'from' })
    const [priceItems, setPriceItems] = useState([{ headline: 'headline 1', price: '10', description: 'description 1' }, { headline: 'headline 2', price: '20', description: 'description 2' }, { headline: 'headline 3', price: '30', description: 'description 3' }, { headline: 'headline 4', price: '40', description: 'description 4' }])
    const [phoneNumber, setPhoneNumber] = useState('')
    const [address, setAddress] = useState('21960 Minnetonka Blvd 100, Excelsior')
    const [message, setMessage] = useState('Got Questions? Send Us a Text!')
    const [advertiserRating, setAdvertiserRating] = useState(false)
    const [structuredSnippets, setstructuredSnippets] = useState({ header: 'Barnds' })
    const [snippetsItems, setSnippetsItems] = useState(['item 1', 'item 2', 'itwm 3'])
    const [headerItem, setHeaderItem] = useState("")
    const [searchInput, setSearchInput] = useState("")


    const [isSiteLinkHead, setSiteLinkHead] = useState(false)
    const [isSiteLinkDesc, setSiteLinkDesc] = useState(false)
    const [isCallout, setCallout] = useState(false)
    const [ispromotion, setPromotion] = useState(false)
    const [isAddPrice, setAddPrice] = useState(false)
    const [isCallAsset, setCallAsset] = useState(false)
    const [isLocationAsset, setLocationAsset] = useState(false)
    const [isMessageAsset, setMessageAsset] = useState(false)
    const [isSnippetsAsset, setSnippetsAsset] = useState(false)
    const [responseID, setResponseId] = useState("")
    const [loader, setLoader] = useState(false)



    const maxHeadLineLimit = 30
    const maxDescriptionLimit = 90
    const maxSiteLinkHeadLimit = 25
    const maxSiteLinkDescLimit = 35
    const maxCalloutLimit = 25
    const maxPriceHeadLimit = 30
    const maxPriceDescLimit = 30
    const maxPhoneLimit = 15
    const maxSnippetsItemLimit = 25
    const maxMessageLimit = 35
    const maxDomainNameLimit = 30


    const handleChangeHeadLine = (i, event) => {
        const { value } = event.target
        let newInputValues = [...headlineForm];
        newInputValues[i] = value;
        setHeadlineForm(newInputValues)
    }

    const handleChangeDescription = (i, event) => {
        const { value } = event.target
        let newInputValues = [...descriptionForm];
        newInputValues[i] = value;
        setDescriptionForm(newInputValues)
    }

    const handleChangeSiteLinkAsset = (i, event) => {
        const { name, value } = event.target
        let newInputValues = [...siteLinkAsset];
        newInputValues[i][name] = value;
        setSiteLinkAsset(newInputValues)
    }

    const handleChangeCalloutAsset = (i, event) => {
        const { value } = event.target
        let newInputValues = [...calloutAsset];
        newInputValues[i] = value;
        setCalloutAsset(newInputValues)
    }

    const handleChangePromotionsAsset = (event) => {
        const { name, value } = event.target
        setPromotionsAsset(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleChangePriceAsset = (event) => {
        const { name, value } = event.target
        setPriceAsset(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleChangePriceItems = (i, event) => {
        const { name, value } = event.target
        let newInputValues = [...priceItems];
        newInputValues[i][name] = value;
        setPriceItems(newInputValues)
    }

    const handleChangeStructuredSneppets = (event) => {
        const { name, value } = event.target
        setstructuredSnippets(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleChangeSnippetsItems = (i, event) => {
        const { value } = event.target
        let newInputValues = [...snippetsItems];
        newInputValues[i] = value;
        setSnippetsItems(newInputValues)
    }

    const handleSubmit = async () => {
        const payload = {
            final_url: finalUrl,
            headlines: headlineForm,
            descriptions: descriptionForm,
            site_link_asset: siteLinkAsset,
            callout_asset: calloutAsset,
            promotions_asset: promotionsAsset,
            price_asset: { ...priceAsset, priceItems },
            phone_number: phoneNumber,
            searchText:searchInput,
            address: address,
            message: message,
            advertiser_rating: advertiserRating,
            structured_snippets: { ...structuredSnippets, snippetsItems },
            isSiteLinkHead,
            isSiteLinkDesc,
            isCallout,
            ispromotion,
            isAddPrice,
            isCallAsset,
            isLocationAsset,
            isMessageAsset,
            isSnippetsAsset,
        };
        console.log(payload, "Payload")
        setresponseTrue(false)
        setLoader(true)
        fetch('/api/save-new-ads', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
            .then(response => {
                setLoader(false)
                return response.json();
            })
            .then(data => {
                if (data.id) {
                    // toast.success('Ads Saved');
                    setresponseTrue(true)
                    setResponseId(data.id)
                } else {

                    toast.error(data.message);
                }
            })
            .catch(error => {
                setLoader(false)
                toast.error(error.message);
                console.log(error);
            });
    };

    const handleResetForm = () => {
        setHeadlineForm(['Google Ads Preview Tool', 'Explore New Campaign Ideas', 'Master Google Ads Writing'])
        setDescriptionForm(['Work through new ad ideas and see a preview of how it would look if your ad was live.', 'Easily share your ad with others or keep a copy for yourself with the link below.'])
        setSiteLinkAsset([
            { headline: '', description_1: '', description_2: '' },
            { headline: '', description_1: '', description_2: '' },
            { headline: '', description_1: '', description_2: '' },
            { headline: '', description_1: '', description_2: '' }])
        setCalloutAsset(['', '', '', ''])
        setPromotionsAsset({
            occasion: '',
            currency: '',
            promotion_type: '',
            discount: '',
            automatic_domain_name: '',
            promotion_details: '',
            promotion_start_date: '',
            promotion_end_date: ''
        })
        setPriceAsset({ currency: '', price_qualifier: '' })
        setPriceItems([
            { headline: '', price: '', description: '' },
            { headline: '', price: '', description: '' },
            { headline: '', price: '', description: '' },
            { headline: '', price: '', description: '' }
        ])
        setPhoneNumber('')
        setAddress('')
        setMessage('')
        setAdvertiserRating(false)
        setstructuredSnippets({ header: '' })
        setSnippetsItems(['', '', ''])
        setSiteLinkHead(false)
        setSiteLinkDesc(false)
        setCallout(false)
        setPromotion(false)
        setAddPrice(false)
        setCallAsset(false)
        setLocationAsset(false)
        setMessageAsset(false)
        setSnippetsAsset(false)
        setresponseTrue(false)
        setResponseId("")
    }
    useEffect(() => {
        fetch('https://www.postmagnetmedia.com/')
            .then(response => response.text())
            .then(data => {
                const parser = new DOMParser();
                const htmlDoc = parser.parseFromString(data, 'text/html');
                const headerElement = htmlDoc.querySelector('.dmHeaderContainer');
                setHeaderItem(headerElement.outerHTML)
                console.log(headerElement.outerHTML);
            })
            .catch(error => console.error(error));

    }, [])

    return (
        <>
            <Script
                src="https://code.jquery.com/jquery-3.6.0.min.js"
                onLoad={() => {
                    $(document).on("click", ".tab--item > label", function () {
                        $(this).parent().next(".tab--content").toggleClass("active");
                    });
                    $(document).on("click", ".tab--item--inner > label", function () {
                        $(".ds--input").toggleClass("active");
                    });
                }}
            />
            <div
                dangerouslySetInnerHTML={{ __html: headerItem }}
            />
            <section className="form--area">
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-md-6 pr--45">
                            <div className="search--form--left mt-3">
                                <form action="/action_page.php">
                                    <div className="input-group mb-3">
                                        <span className="input-group-text">Final URL</span>
                                        <input type="search" className="form-control" value={finalUrl} onChange={(e) => setFinalUrl(e.target.value)} placeholder="Search" name="usrname" />
                                    </div>
                                </form>
                            </div>
                            <div className="headline--box">
                                <h3 className="title--sm mb-0">Headlines</h3>
                                <p className="ft--10">(Use up to 30 characters)</p>
                                <div className="headline--inputs">
                                    {headlineForm.map((item, i) =>
                                        <div className="input-group mb-2" key={i}>
                                            <span className="input-group-text">Headline {i + 1}</span>
                                            <input type="text" className="form-control" value={item} onChange={(e) => handleChangeHeadLine(i, e)} placeholder="Enter Headline" name="headline" />
                                            <span className={`input-group-text ${maxHeadLineLimit - item.length >= 0 ? 'alert-success' : 'alert-danger'} `}>{maxHeadLineLimit - item.length}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="headline--box">
                                <h3 className="title--sm mb-0">DESCRIPTIONS</h3>
                                <p className="ft--10">(Use up to 90 characters)</p>
                                <div className="headline--inputs">
                                    {descriptionForm.map((item, i) =>
                                        <div className="input-group mb-2" key={i}>
                                            <span className="input-group-text">Description {i + 1}</span>
                                            <textarea name="description" value={item} onChange={(e) => handleChangeDescription(i, e)} className="form-control" id="" rows="2"></textarea>
                                            <span className={`input-group-text ${maxDescriptionLimit - item.length >= 0 ? 'alert-success' : 'alert-danger'} `}>{maxDescriptionLimit - item.length}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="checkbox--form--group mt-4">
                                <div className="form-check tab--item mb-3">
                                    <input type="checkbox" className="form-check-input" checked={isSiteLinkHead} onChange={() => setSiteLinkHead(!isSiteLinkHead)} id="check2" name="option2" value="something" />
                                    <label className="form-check-label" for="check2">ADD SITELINK ASSETS</label>
                                    <p className="ft--10">(Use up to 25 characters)</p>

                                </div>
                                <div className={`tab--content ${isSiteLinkHead ? 'active' : ''}  `}>
                                    <div className="form-check tab--item--inner mb-3 pl-60">
                                        <input type="checkbox" className="form-check-input" checked={isSiteLinkDesc} onChange={() => setSiteLinkDesc(!isSiteLinkDesc)} id="check12" name="option12" value="something" />
                                        <label className="form-check-label" for="check12">ADD SITELINK DESCRIPTIONS</label>
                                        <p className="ft--10">(Use up to 35 characters)</p>

                                    </div>

                                    {siteLinkAsset.map((item, i) =>
                                        <React.Fragment key={i}>
                                            <div className="input-group mb-2">
                                                <span className="input-group-text">Sitelink {i + 1}</span>
                                                <input type="text" className="form-control" onChange={(e) => handleChangeSiteLinkAsset(i, e)} name='headline' value={item.headline} placeholder="Show Headlines" />
                                                <span className={`input-group-text ${maxSiteLinkHeadLimit - item.headline.length >= 0 ? 'alert-success' : 'alert-danger'} `}>{maxSiteLinkHeadLimit - item.headline.length}</span>
                                            </div>
                                            <div className={`input-group mb-2 ps-4 ds--input ${isSiteLinkDesc ? 'active' : ''} `}>
                                                <span className="input-group-text">Description 1</span>
                                                <input type="text" className="form-control" placeholder="Sitelink description" onChange={(e) => handleChangeSiteLinkAsset(i, e)} value={item.description_1} name="description_1" />
                                                <span className={`input-group-text ${maxSiteLinkDescLimit - item.description_1.length >= 0 ? 'alert-success' : 'alert-danger'} `}>{maxSiteLinkDescLimit - item.description_1.length}</span>
                                            </div>
                                            <div className={`input-group mb-2 ps-4 ds--input ${isSiteLinkDesc ? 'active' : ''} `}>
                                                <span className="input-group-text">Description 2</span>
                                                <input type="text" className="form-control" placeholder="Sitelink description" onChange={(e) => handleChangeSiteLinkAsset(i, e)} value={item.description_2} name="description_2" />
                                                <span className={`input-group-text ${maxSiteLinkDescLimit - item.description_2.length >= 0 ? 'alert-success' : 'alert-danger'} `}>{maxSiteLinkDescLimit - item.description_2.length}</span>
                                            </div>
                                        </React.Fragment>
                                    )}
                                </div>

                                <div className="form-check tab--item mb-3">
                                    <input type="checkbox" checked={isCallout} onChange={() => setCallout(!isCallout)} className="form-check-input" id="check3" name="option3" value="something" />
                                    <label className="form-check-label" for="check3">ADD CALLOUT ASSETS</label>
                                    <p className="ft--10">(Use up to 25 characters)</p>

                                </div>
                                <div className={`tab--content ${isCallout ? 'active' : ''}`}>
                                    {calloutAsset.map((item, i) =>
                                        <div className="input-group mb-2" key={i}>
                                            <span className="input-group-text">Callout {i + 1}</span>
                                            <input type="text" className="form-control" onChange={(e) => handleChangeCalloutAsset(i, e)} value={item} placeholder="Additional Text for Ad" name="callout" />
                                            <span className={`input-group-text ${maxCalloutLimit - item.length >= 0 ? 'alert-success' : 'alert-danger'} `}>{maxCalloutLimit - item.length}</span>
                                        </div>
                                    )}
                                </div>
                                <div className="form-check tab--item mb-3">
                                    <input type="checkbox" checked={ispromotion} onChange={() => setPromotion(!ispromotion)} className="form-check-input" id="check4" name="option4" value="something" />
                                    <label className="form-check-label" for="check4">ADD PROMOTIONS ASSET</label>
                                    <p className="ft--10">(Use up to 25 characters)</p>
                                </div>
                                <div className={`tab--content ${ispromotion ? 'active' : ''}`}>
                                    <div className="form-group row mb-3">
                                        <strong className="col-3">Occasion</strong>
                                        <div className="col-9">
                                            <select name='occasion' onChange={handleChangePromotionsAsset} value={promotionsAsset.occasion} className="form-control ">
                                                <option value="" >Choose Occasion</option>
                                                <option label="New Year&rsquo;s" selected="selected" value="New-Year's">New Year&rsquo;s</option>
                                                <option label="Valentine&rsquo;s Day" value="Valentine's Day">Valentine&rsquo;s Day</option>
                                                <option label="Easter" value="Easter">Easter</option>
                                                <option label="Mother&rsquo;s Day" value="Mother's Day">Mother&rsquo;s Day</option>
                                                <option label="Father&rsquo;s Day" value="Father's Day">Father&rsquo;s Day</option>
                                                <option label="Labor Day" value="Labor Day">Labor Day</option>
                                                <option label="Back to school" value="Back to school">Back to school</option>
                                                <option label="Halloween" value="Halloween">Halloween</option>
                                                <option label="Black Friday" value="Black Friday">Black Friday</option>
                                                <option label="Cyber Monday" value="Cyber Monday">Cyber Monday</option>
                                                <option label="Christmas" value="Christmas">Christmas</option>
                                                <option label="Boxing Day" value="Boxing Day">Boxing Day</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-group row mb-3">
                                        <strong className="col-3">Currency</strong>
                                        <div className="col-9">
                                            <select name='currency' onChange={handleChangePromotionsAsset} value={promotionsAsset.currency} className="form-control ">
                                                <option value="" className="" >Choose Currency</option>
                                                <option label="USD" selected="selected" value="USD">USD</option>
                                                <option label="AED" value="AED">AED</option>
                                                <option label="ARS" value="ARS">ARS</option>
                                                <option label="AUD" value="AUD">AUD</option>
                                                <option label="BGN" value="BGN">BGN</option>
                                                <option label="BND" value="BND">BND</option>
                                                <option label="BOB" value="BOB">BOB</option>
                                                <option label="BRL" value="BRL">BRL</option>
                                                <option label="CAD" value="CAD">CAD</option>
                                                <option label="CHF" value="CHF">CHF</option>
                                                <option label="CLP" value="CLP">CLP</option>
                                                <option label="CNY" value="CNY">CNY</option>
                                                <option label="COP" value="COP">COP</option>
                                                <option label="CZK" value="CZK">CZK</option>
                                                <option label="DKK" value="DKK">DKK</option>
                                                <option label="EGP" value="EGP">EGP</option>
                                                <option label="EUR" value="EUR">EUR</option>
                                                <option label="FJD" value="FJD">FJD</option>
                                                <option label="GBP" value="GBP">GBP</option>
                                                <option label="HKD" value="HKD">HKD</option>
                                                <option label="HRK" value="HRK">HRK</option>
                                                <option label="HUF" value="HUF">HUF</option>
                                                <option label="IDR" value="IDR">IDR</option>
                                                <option label="ILS" value="ILS">ILS</option>
                                                <option label="INR" value="INR">INR</option>
                                                <option label="JPY" value="JPY">JPY</option>
                                                <option label="KES" value="KES">KES</option>
                                                <option label="KRW" value="KRW">KRW</option>
                                                <option label="MAD" value="MAD">MAD</option>
                                                <option label="MXN" value="MXN">MXN</option>
                                                <option label="MYR" value="MYR">MYR</option>
                                                <option label="NOK" value="NOK">NOK</option>
                                                <option label="NZD" value="NZD">NZD</option>
                                                <option label="PEN" value="PEN">PEN</option>
                                                <option label="PHP" value="PHP">PHP</option>
                                                <option label="PKR" value="PKR">PKR</option>
                                                <option label="PLN" value="PLN">PLN</option>
                                                <option label="RON" value="RON">RON</option>
                                                <option label="RSD" value="RSD">RSD</option>
                                                <option label="RUB" value="RUB">RUB</option>
                                                <option label="SAR" value="SAR">SAR</option>
                                                <option label="SEK" value="SEK">SEK</option>
                                                <option label="SGD" value="SGD">SGD</option>
                                                <option label="THB" value="THB">THB</option>
                                                <option label="TRY" value="TRY">TRY</option>
                                                <option label="TWD" value="TWD">TWD</option>
                                                <option label="UAH" value="UAH">UAH</option>
                                                <option label="USD" value="USD">USD</option>
                                                <option label="VND" value="VND">VND</option>
                                                <option label="ZAR" value="ZAR">ZAR</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-group row mb-3">
                                        <strong className="col-3">Promotion Type</strong>
                                        <div className="col-5">
                                            <select name='promotion_type' onChange={handleChangePromotionsAsset} value={promotionsAsset.promotion_type} className="form-control">
                                                <option value="" className="">Choose promotion type</option>
                                                <option value="Monetary discount" className="" selected="selected">Monetary discount</option>
                                                <option label="Percent discount" value="Percent-discount">Percent discount</option>
                                                <option label="Up to monetary discount" value="Up-to-monetary-discount">Up to monetary discount</option>
                                                <option label="Up to percent discount" value="Up-to-percent-discount">Up to percent discount</option>
                                            </select>
                                        </div>
                                        <div className="col-4">
                                            <input name='discount' onChange={handleChangePromotionsAsset} value={promotionsAsset.discount} type="text" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="input-group mb-3">
                                        <span className="input-group-text">Item</span>
                                        <input type="text" name='automatic_domain_name' onChange={handleChangePromotionsAsset} value={promotionsAsset.automatic_domain_name} className="form-control" placeholder="Automatic Domain Name" />
                                        <span className={`input-group-text ${maxDomainNameLimit - promotionsAsset.automatic_domain_name.length >= 0 ? 'alert-success' : 'alert-danger'} `}>{maxDomainNameLimit - promotionsAsset.automatic_domain_name.length}</span>
                                    </div>
                                    <div className="form-group row mb-3">
                                        <strong className="col-3">Promotion Details</strong>
                                        <div className="col-5">
                                            <select name='promotion_details' onChange={handleChangePromotionsAsset} value={promotionsAsset.promotion_details} className="form-control">
                                                <option value="" className="" selected="selected">Choose Promotion details</option>
                                                <option label="On orders over" value="On-orders-over">On orders over</option>
                                                <option label="Promo code" value="Promo-code">Promo code</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-group row mb-3">
                                        <strong className="col-12">Promotion Dates</strong>
                                    </div>
                                    <div className="form-group row mb-3">
                                        <div className="col-6">
                                            <div className="input-group mb-3">
                                                <span className="input-group-text">Start Date</span>
                                                <input type="text" className="form-control br--right" onChange={handleChangePromotionsAsset} value={promotionsAsset.promotion_start_date} placeholder="DD/MM/YYYY" name="promotion_start_date" />
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="input-group mb-3">
                                                <span className="input-group-text">End Date</span>
                                                <input type="text" className="form-control br--right" onChange={handleChangePromotionsAsset} value={promotionsAsset.promotion_end_date} placeholder="DD/MM/YYYY" name="promotion_end_date" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-check tab--item mb-3">
                                    <input type="checkbox" checked={isAddPrice} onChange={() => setAddPrice(!isAddPrice)} className="form-check-input" id="check5" name="option5" value="something" />
                                    <label className="form-check-label" for="check5">ADD PRICE ASSET</label>
                                    <p className="ft--10">(Use up to 30 characters)</p>
                                </div>
                                <div className={`tab--content ${isAddPrice ? 'active' : ''}`}>
                                    <div className="form-group row mb-3">
                                        <strong className="col-3">Currency</strong>
                                        <div className="col-9">
                                            <select name='currency' onChange={handleChangePriceAsset} value={priceAsset.currency} className="form-control">
                                                <option value="" >Choose Currency </option>
                                                <option label="USD" selected="selected" value="$">USD</option>
                                                <option label="GBP" value="£">GBP</option>
                                                <option label="EUR" value="€">EUR</option>
                                                <option label="INR" value="₹">INR</option>
                                                <option label="JPY" value="¥">JPY</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-group row mb-3">
                                        <strong className="col-3">Price Qualifier</strong>
                                        <div className="col-9">
                                            <select name='price_qualifier' onChange={handleChangePriceAsset} value={priceAsset.price_qualifier} className="form-control">
                                                <option value="" className="none" >Choose qualifier</option>
                                                <option label="From" selected="selected" value="From">From</option>
                                                <option label="Up to" value="Up to">Up to</option>
                                                <option label="Average" value="Average">Average</option>
                                            </select>
                                        </div>
                                    </div>
                                    {
                                        priceItems.map((item, i) =>
                                            <div className="input-group mb-2" key={i}>
                                                <span className="input-group-text">Item {i + 1}</span>
                                                <div className="input--merge">
                                                    <input type="text" className="form-control" onChange={(e) => handleChangePriceItems(i, e)} value={item.headline} placeholder="Header" name="headline" />
                                                    <input type="number" className="form-control" onChange={(e) => handleChangePriceItems(i, e)} value={item.price} placeholder="0" name="price" />
                                                    <input type="text" className="form-control" onChange={(e) => handleChangePriceItems(i, e)} value={item.description} placeholder="Description" name="description" />
                                                </div>
                                                <span className={`input-group-text  span--br ${(maxPriceHeadLimit - item.headline.length < 0 || maxPriceDescLimit - item.description.length < 0) ? 'alert-danger' : 'alert-success'}`}><span>{maxPriceHeadLimit - item.headline.length}</span> <span>--</span><span>{maxPriceDescLimit - item.description.length}</span></span>
                                            </div>
                                        )}
                                </div>
                                <div className="form-check tab--item mb-3">
                                    <input type="checkbox" checked={isCallAsset} onChange={() => setCallAsset(!isCallAsset)} className="form-check-input" id="check6" name="option6" value="something" />
                                    <label className="form-check-label" for="check6">ADD CALL ASSET</label>
                                    <p className="ft--10">(Use up to 15 characters)</p>
                                </div>
                                <div className={`tab--content ${isCallAsset ? 'active' : ''} `}>
                                    <div className="input-group mb-2">
                                        <span className="input-group-text">Phone Number</span>
                                        <input type="number" name="phoneNumber" onChange={(e) => setPhoneNumber(e.target.value)} className="form-control" placeholder="8001234567" />
                                        <span className={`input-group-text ${maxPhoneLimit - phoneNumber.length >= 0 ? 'alert-success' : 'alert-danger'} `}>{maxPhoneLimit - phoneNumber.length}</span>
                                    </div>
                                </div>
                                <div className="form-check tab--item mb-3">
                                    <input type="checkbox" checked={isLocationAsset} onChange={() => setLocationAsset(!isLocationAsset)} className="form-check-input" id="check7" name="option7" value="something" />
                                    <label className="form-check-label" for="check7">ADD LOCATION ASSETS</label>
                                </div>
                                <div className={`tab--content  ${isLocationAsset ? 'active' : ''}`}>
                                    <div className="input-group mb-2">
                                        <span className="input-group-text">Address</span>
                                        <input type="text" name='address' value={address} onChange={(e) => setAddress(e.target.value)} className="form-control br--right" placeholder="" />
                                    </div>
                                </div>
                                <div className="form-check tab--item mb-3">
                                    <input type="checkbox" checked={isMessageAsset} onChange={() => setMessageAsset(!isMessageAsset)} className="form-check-input" id="check8" name="option8" value="something" />
                                    <label className="form-check-label" for="check8">ADD MESSAGE ASSETS</label>
                                    <p className="ft--10">(Use up to 35 characters)</p>
                                </div>
                                <div className={`tab--content ${isMessageAsset ? 'active' : ''} `}>
                                    <div className="input-group mb-2">
                                        <span className="input-group-text">Msg. Ext. Text</span>
                                        <input type="text" name='message' value={message} onChange={(e) => setMessage(e.target.value)} className="form-control" placeholder="Got Questions? Send Us a Text!" />
                                        <span className={`input-group-text ${maxMessageLimit - message.length >= 0 ? 'alert-success' : 'alert-danger'} `}>{maxMessageLimit - message.length}</span>
                                    </div>
                                </div>
                                <div className="form-check tab--item mb-3">
                                    <input type="checkbox" onChange={(e) => setAdvertiserRating(e.target.checked)} checked={advertiserRating} className="form-check-input" id="check9" name="option9" value="something" />
                                    <label className="form-check-label" for="check9">SHOW ADVERTISER RATING</label>
                                </div>
                                <div className="form-check tab--item mb-3">
                                    <input type="checkbox" checked={isSnippetsAsset} onChange={() => setSnippetsAsset(!isSnippetsAsset)} className="form-check-input" id="check10" name="option10" value="something" />
                                    <label className="form-check-label" for="check10">ADD STRUCTURED SNIPPETS ASSET</label>
                                    <p className="ft--10">(Use up to 25 characters)</p>
                                </div>
                                <div className={`tab--content ${isSnippetsAsset ? 'active' : ''}`}>
                                    <div className="form-group row mb-3">
                                        <strong className="col-3">Header</strong>
                                        <div className="col-9">
                                            <select name='header' onChange={handleChangeStructuredSneppets} value={structuredSnippets.header} className="form-control">
                                                <option value="" className="" selected="selected">Choose Header</option>
                                                <option label="Amenities" value="Amenities">Amenities</option>
                                                <option label="Brands" value="Brands">Brands</option>
                                                <option label="Courses" value="Courses">Courses</option>
                                                <option label="Degree programs" value="Degree programs">Degree programs</option>
                                                <option label="Destinations" value="Destinations">Destinations</option>
                                                <option label="Featured hotels" value="Featured hotels">Featured hotels</option>
                                                <option label="Insurance coverage" value="Insurance coverage">Insurance coverage</option>
                                                <option label="Models" value="Models">Models</option>
                                                <option label="Neighborhoods" value="Neighborhoods">Neighborhoods</option>
                                                <option label="Service catalog" value="Service catalog">Service catalog</option>
                                                <option label="Shows" value="Shows">Shows</option>
                                                <option label="Styles" value="Styles">Styles</option>
                                                <option label="Types" value="Types">Types</option>
                                            </select>
                                        </div>
                                    </div>

                                    {snippetsItems.map((element, i) =>
                                        <div className="input-group mb-2" key={i}>
                                            <span className="input-group-text">Value {i + 1}</span>
                                            <input type="text" onChange={(e) => handleChangeSnippetsItems(i, e)} value={element} className="form-control" placeholder="" name="item" />
                                            <span className={`input-group-text ${maxSnippetsItemLimit - element.length >= 0 ? 'alert-success' : 'alert-danger'} `}>{maxSnippetsItemLimit - element.length}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="form--actions">
                                <button className="btn btn-warning w-100 text-white" onClick={handleResetForm} type="button">RESET</button>
                                <button onClick={handleSubmit} className="btn btn-success text-white" type="button">SHARE THIS AD</button>
                            </div>
                            {responseTrue &&
                                <div className="share--url p-3">
                                    <div className="row ">
                                        <div className="col-12 alert-success p-4">
                                            <h4 className="fs--24">Copy and share the following URL: </h4>
                                            <a className="text-black share--url" target="_blank" href={`/resources/adspreview?id=${responseID}`}>http://{window.location.hostname}/resources/adspreview?id={responseID}</a>
                                        </div>
                                    </div>
                                </div>
                            }
                            {loader &&
                                <div className="share--url p-3 loader--url">
                                    <div className="row ">
                                        <div className="col-12 p-4">
                                            <div id="loader"></div>
                                        </div>
                                    </div>
                                </div>
                            }

                        </div>
                        <div className="col-12 col-md-6 pl--45">
                            <div className="main-sec">
                                <div className="desktop-sec">
                                    <div id="header">
                                        <div id="topbar">
                                            <Image id="searchbarimage" src="/googlelogo_color_120x44dp.png" alt="Google logo" width={120} height={44} />
                                            {/* <img id="searchbarimage" src={require("./image/googlelogo_color_120x44dp.png")} alt='' /> */}
                                            <div id="searchbar" type="text">
                                                <input id="searchbartext" type="text"  value={searchInput} onChange={(e) => setSearchInput(e.target.value)} placeholder="Search Terms Here" />
                                                <button id="searchbarbutton">
                                                    <svg focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                                        <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z">
                                                        </path>
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div id="searchresultsarea" className="search--resut--desktop">
                                        <div className="searchresult">
                                            <span className="call--add mt-1"><a className="ad--heading"><span className="adtag--ad">Ad&nbsp;·</span>{finalUrl}<Image className='down--arrow' width={10} height={6} src="/down-arrow.png" alt="" /> </a> {isCallAsset && <span className="p--title call--asset ms-1">{phoneNumber}</span>}</span>
                                            {(headlineForm[0] || headlineForm[1] || headlineForm[2]) &&
                                                <h2 className="fm--headline mt-2"><span className='spm--headline'>{headlineForm[0]}</span><span className='spm--headline'>{headlineForm[1]}</span><span className='spm--headline'>{headlineForm[2]}</span></h2>
                                            }
                                            {advertiserRating &&
                                                <div className="advertiger--rating">
                                                    <span className="p--title">5</span>
                                                    <span className="advertiger--rating--span">
                                                        <Image className='star--img' src="/star--new2.png" width={67} height={14} alt="" />
                                                    </span>
                                                    <span className="p--title">advertiser rating</span>
                                                </div>
                                            }
                                            <p className="fm--desciption mt-1"><span>{descriptionForm[0]}</span> <span>{descriptionForm[1]}</span></p>

                                            {isCallout &&
                                                <div className="getcallout d-inline">
                                                    <span className="p--title">{`${calloutAsset[0]} - ${calloutAsset[1]} - ${calloutAsset[2]} - ${calloutAsset[3]}`}</span>
                                                </div>
                                            }

                                            {ispromotion &&
                                                <div className="getpromoline d-inline">
                                                    <span className="p--title"><strong>{promotionsAsset.occasion}</strong></span>
                                                    <span className="p--title"><a href="#" className="text-decoration-underline">{promotionsAsset.discount}% off {promotionsAsset.promotion_type}</a></span>
                                                    <span className="p--title"><span>{promotionsAsset.promotion_details}</span> <span>{promotionsAsset.currency}$0</span> · <span>Valid {promotionsAsset.promotion_start_date}</span> - <span>{promotionsAsset.promotion_end_date}</span></span>
                                                </div>
                                            }

                                            {isSnippetsAsset &&
                                                <div className="snippets-asset">
                                                    <span className="p--title">{structuredSnippets.header} : </span><span className="p--title">{snippetsItems[0]}, </span><span className="p--title">{snippetsItems[1]}, </span><span className="p--title">{snippetsItems[2]}</span>
                                                </div>
                                            }

                                            {isSiteLinkHead && <div className="row sitelink px--20 mt-2">
                                                <div className="col-md-6 col-6">
                                                    <div className="fisrt--heading">
                                                        <a href="#">{siteLinkAsset[0].headline}</a>
                                                    </div>
                                                    {isSiteLinkDesc &&
                                                        <div className="scond--data">
                                                            <span>{siteLinkAsset[0].description_1}</span>
                                                            <span>{siteLinkAsset[0].description_2}</span>
                                                        </div>
                                                    }
                                                </div>
                                                <div className="col-md-6 col-6">
                                                    <div className="fisrt--heading">
                                                        <a href="#">{siteLinkAsset[1].headline}</a>
                                                    </div>
                                                    {isSiteLinkDesc &&
                                                        <div className="scond--data">
                                                            <span>{siteLinkAsset[1].description_1}</span>
                                                            <span>{siteLinkAsset[1].description_2}</span>
                                                        </div>
                                                    }
                                                </div>
                                                <div className="col-md-6 col-6">
                                                    <div className="fisrt--heading">
                                                        <a href="#">{siteLinkAsset[2].headline}</a>
                                                    </div>
                                                    {isSiteLinkDesc &&
                                                        <div className="scond--data">
                                                            <span>{siteLinkAsset[2].description_1}</span>
                                                            <span>{siteLinkAsset[2].description_2}</span>
                                                        </div>
                                                    }
                                                </div>
                                                <div className="col-md-6 col-6">
                                                    <div className="fisrt--heading">
                                                        <a href="#">{siteLinkAsset[3].headline}</a>
                                                    </div>
                                                    {isSiteLinkDesc &&
                                                        <div className="scond--data">
                                                            <span>{siteLinkAsset[3].description_1}</span>
                                                            <span>{siteLinkAsset[3].description_2}</span>
                                                        </div>
                                                    }
                                                </div>
                                            </div>
                                            }

                                            {isLocationAsset &&
                                                <div className="location--asset">
                                                    <span className="p--title"><Image src="/location-icon.png" width={11} height={17} alt="" /> <a href="#">{address}</a></span>
                                                </div>
                                            }

                                            {isAddPrice &&
                                                <div className="price--asset ms-2 mt-1">
                                                    <div className="header--price--asset">
                                                        <div className="hd--text p--title">
                                                            {priceItems[0].headline}
                                                        </div>
                                                        <div className="price--asset--price"><span className="p--title">{priceAsset.price_qualifier}</span> <span className="p--title"><strong>{`${priceAsset.currency} ${priceItems[0].price}`}</strong></span></div>
                                                        <span className="p--title"> {priceItems[0].description}</span>
                                                    </div>
                                                    <div className="header--price--asset">
                                                        <div className="hd--text p--title">
                                                            {priceItems[1].headline}
                                                        </div>
                                                        <div className="price--asset--price"><span className="p--title">{priceAsset.price_qualifier}</span> <span className="p--title"><strong>{`${priceAsset.currency} ${priceItems[1].price}`}</strong></span></div>
                                                        <span className="p--title">{priceItems[1].description}</span>
                                                    </div>
                                                    <div className="header--price--asset">
                                                        <div className="hd--text p--title">
                                                            {priceItems[2].headline}
                                                        </div>
                                                        <div className="price--asset--price"><span className="p--title">{priceAsset.price_qualifier}</span> <span className="p--title"><strong>{`${priceAsset.currency} ${priceItems[2].price}`}</strong></span></div>
                                                        <span className="p--title">{priceItems[2].description}</span>
                                                    </div>
                                                    <div className="header--price--asset">
                                                        <div className="hd--text p--title">
                                                            {priceItems[3].headline}
                                                        </div>
                                                        <div className="price--asset--price"><span className="p--title">{priceAsset.price_qualifier}</span> <span className="p--title"><strong>{`${priceAsset.currency} ${priceItems[3].price}`}</strong></span></div>
                                                        <span className="p--title">{priceItems[3].description}</span>
                                                    </div>
                                                </div>
                                            }

                                        </div>
                                    </div>
                                    <div>
                                        <div className="mobile-sec">
                                            <div className="mobile-inner">
                                                <div id="header">
                                                    <div className="search-result">
                                                        <div className="g--img">
                                                            <Image id="searchbarimage" src="/googlelogo_color_120x44dp.png" alt="Google logo" width={100} height={35} />
                                                            {/* <img id="searchbarimage" src={require("./image/googlelogo_color_120x44dp.png")} /> */}
                                                        </div>
                                                        <div className="mobile--topbar">
                                                            <div className="input--group">
                                                                <input id="mobile-search-input" placeholder="Search Terms here..." value={searchInput} onChange={(e) => setSearchInput(e.target.value)} className="form-control input" type="text" />
                                                                <div className="btn-search">
                                                                    <Image id="searchbarimage" src="/Search.svg" alt="Google logo" width={30} height={32} />
                                                                </div>
                                                            </div>
                                                            <div className="mob-captions">
                                                                <span className="active--mob--cps">ALL</span>
                                                                <span>IMAGES</span>
                                                                <span>VIDEOS</span>
                                                                <span>NEWS</span>
                                                                <span>BOOKS</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div id="searchresultsarea">
                                                    <div className="searchresult">
                                                        <span className="call--add row ms-1"><a className="ad--heading col-10"><span className="adtag--ad">Ad ·</span>{finalUrl}</a> <span className='col-2 text-center mt-2'><Image className='bell--img' src="/bell.png" width={12} height={13} alt="" /></span> </span>
                                                        {(headlineForm[0] || headlineForm[1] || headlineForm[2]) &&
                                                            <h2 className="fm--headline mt-1"><span>{headlineForm[0]}</span><span>{headlineForm[1]}</span><span>{headlineForm[2]}</span></h2>
                                                        }
                                                        {advertiserRating &&
                                                            <div className="advertiger--rating">
                                                                <span className="p--title">5</span>
                                                                <span className="advertiger--rating--span">
                                                                    <Image className='star--img' src="/star--new2.png" width={67} height={14} alt="" />
                                                                </span>
                                                                <span className="p--title">advertiser rating</span>
                                                            </div>
                                                        }
                                                        <p className="fm--desciption mt-1"><span>{descriptionForm[0]}</span> <span>{descriptionForm[1]}</span></p>

                                                        {isCallout &&
                                                            <div className="getcallout d-inline">
                                                                <span className="p--title">{`${calloutAsset[0]} - ${calloutAsset[1]} - ${calloutAsset[2]} - ${calloutAsset[3]}`}</span>
                                                            </div>
                                                        }

                                                        {isSnippetsAsset &&
                                                            <div className="snippets-asset">
                                                                <span className="p--title">{structuredSnippets.header} : </span><span className="p--title">{snippetsItems[0]}, </span><span className="p--title">{snippetsItems[1]}, </span><span className="p--title">{snippetsItems[2]}</span>
                                                            </div>
                                                        }

                                                        {isSiteLinkHead &&
                                                            <div className="row sitelink">
                                                                <div className="col-md-6">
                                                                    <div className="fisrt--heading">
                                                                        <a href="#">{siteLinkAsset[0].headline}</a>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-6">
                                                                    <div className="fisrt--heading">
                                                                        <a href="#">{siteLinkAsset[1].headline}</a>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-6">
                                                                    <div className="fisrt--heading">
                                                                        <a href="#">{siteLinkAsset[2].headline}</a>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-6">
                                                                    <div className="fisrt--heading">
                                                                        <a href="#">{siteLinkAsset[3].headline}</a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        }
                                                        {isAddPrice &&
                                                            <div className="price--asset">
                                                                <div className="header--price--asset">
                                                                    <div className="hd--text p--title">
                                                                        {priceItems[0].headline}
                                                                    </div>
                                                                    <div className="price--asset--price"><span className="p--title">{priceAsset.price_qualifier}</span> <span className="p--title"><strong>{`${priceAsset.currency} ${priceItems[0].price}`}</strong></span></div>
                                                                    <span className="p--title"> {priceItems[0].description}</span>
                                                                </div>
                                                                <div className="header--price--asset">
                                                                    <div className="hd--text p--title">
                                                                        {priceItems[1].headline}
                                                                    </div>
                                                                    <div className="price--asset--price"><span className="p--title">{priceAsset.price_qualifier}</span> <span className="p--title"><strong>{`${priceAsset.currency} ${priceItems[1].price}`}</strong></span></div>
                                                                    <span className="p--title">{priceItems[1].description}</span>
                                                                </div>
                                                                <div className="header--price--asset">
                                                                    <div className="hd--text p--title">
                                                                        {priceItems[2].headline}
                                                                    </div>
                                                                    <div className="price--asset--price"><span className="p--title">{priceAsset.price_qualifier}</span> <span className="p--title"><strong>{`${priceAsset.currency} ${priceItems[2].price}`}</strong></span></div>
                                                                    <span className="p--title">{priceItems[2].description}</span>
                                                                </div>
                                                                <div className="header--price--asset">
                                                                    <div className="hd--text p--title">
                                                                        {priceItems[3].headline}
                                                                    </div>
                                                                    <div className="price--asset--price"><span className="p--title">{priceAsset.price_qualifier}</span> <span className="p--title"><strong>{`${priceAsset.currency} ${priceItems[3].price}`}</strong></span></div>
                                                                    <span className="p--title">{priceItems[3].description}</span>
                                                                </div>
                                                            </div>
                                                        }

                                                        {ispromotion &&
                                                            <div className="getpromoline ">
                                                                <div className="tag--icon"><Image className='bagage--img' src="/bagage.png" width={15} height={16} alt="" /></div>
                                                                <div className="promaline--data">
                                                                    <span className="p--title"><strong>{promotionsAsset.occasion}</strong></span>
                                                                    <span className="p--title"><a href="#" className="text-decoration-underline">{promotionsAsset.discount}% off {promotionsAsset.promotion_type}</a></span>
                                                                    <span className="p--title"><span>{promotionsAsset.promotion_details}</span> <span>{promotionsAsset.currency} </span> valid - <span>{promotionsAsset.promotion_start_date}</span> - <span>{promotionsAsset.promotion_end_date}</span></span>
                                                                </div>
                                                            </div>
                                                        }

                                                        {(isLocationAsset || isCallAsset) &&
                                                            <div className="location--wrapper--mb">
                                                                <div className="location--and--phone">
                                                                    {isLocationAsset &&
                                                                        <div className="location--asset">
                                                                            <Image className='map--img' src="/map--img.png" width={11} height={17} alt="" /> <a href="#">{address}</a>
                                                                        </div>}
                                                                    {isCallAsset &&
                                                                        <div className="location--asset">
                                                                            <Image className='bagage--img phone--img' src="/phone--img.png" width={15} height={16} alt="" /> <span className="p--title call--asset ms-1">Call {phoneNumber}</span>
                                                                        </div>
                                                                    }
                                                                </div>
                                                            </div>
                                                        }

                                                        {isMessageAsset &&
                                                            <div className="mb--message">
                                                                <i className="fa-regular fa-comment"></i> <span className="p--title call--asset ms-1">{message}</span>
                                                            </div>}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section >
            <section className='form--footer' >
                <div className='form--footer--container'>
                    <div className='form--footer--container--wrapper'>
                        <p>Hope you&rsquo;ve enjoyed utilizing our incredible Google Ads Preview Tool. If you&rsquo;re looking for further assistance with your Google Ads campaigns, then look no further. Post Magnet Media, is here to help you achieve your business goals with advertising on Google. Don&rsquo;t hesitate to reach out to us and schedule a discovery call.</p>
                        <a href='http://www.postmagnetmedia.com'>www.postmagnetmedia.com</a>
                        <div className='btn--contact'><a href='#'>CONTACT</a></div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default GoogleAdPreview
