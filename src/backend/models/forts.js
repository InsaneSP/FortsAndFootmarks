const mongoose = require('mongoose')

const fortSchema = new mongoose.Schema({
    name: String,
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
    comments: [
        {
            username: String,
            photoURL: String,
            comment: String,
            createdAt: { type: Date, default: Date.now },
            replies: [ 
                {
                    username: String,
                    photoURL: String,
                    comment: String,
                    createdAt: { type: Date, default: Date.now },
                    replies: [ 
                        {
                            username: String,
                            photoURL: String,
                            comment: String,
                            createdAt: { type: Date, default: Date.now }
                        }
                    ]
                }
            ]
        }
    ]
});

const FortModel = mongoose.model("forts", fortSchema);
module.exports = FortModel