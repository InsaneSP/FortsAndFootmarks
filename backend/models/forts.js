const mongoose = require('mongoose')

const fortSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    photos: [String],
    rating: Number,
    historicalSignificance: String,
    type: String,
    durationOfTrek: String,
    difficulty: String,
    distance: String,
    history: {
        summary: String,
        detailed: [{ title: String, content: String }],
    },
    historicalTimeline: [{ year: Number, event: String }],
    keyPoints: [String],
    localAccommodation: [String],
    howToReach: {
        nearestBusStop: String,
        busesAvailable: [String],
        nearestRailwayStation: String,
    },
    approximateBudget: String,
    location: String,
    map: {
        googleMaps: String,
        openStreetMap: String,
    },
    coordinates: {
        latitude: Number,
        longitude: Number,
    },
    bestTimeToVisit: {
        season: String,
        months: [String],
    },
    faqs: [{ question: String, answer: String }],
    sponsoredTreks: [String],
    similarNearbyForts: [String],
    season: String,
    experience: [String],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    gallery: [{
        url: { type: String, required: true },       // ✅ Cloudinary image URL
        uploadedBy: { type: String, required: true }, // ✅ Uploader's name
        photoURL: { type: String },                   // ✅ Uploader's profile photo
        uploadedAt: { type: Date, default: Date.now } // ✅ Upload timestamp
    }],
});

const FortModel = mongoose.model("forts", fortSchema);
module.exports = FortModel