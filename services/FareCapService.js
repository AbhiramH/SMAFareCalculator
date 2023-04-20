const { User, Trip } = require("../models");
const JourneyService = require("./JourneyService");
const {FareCap} = require('../constants');

function getFCTallyKeyForDay (trip) {
    return trip.time.date();
}

function getFCTallyKeyForWeek (trip) {
    return trip.time.year() + '-' + trip.time.isoWeek();
}

/**
* 
* @param {User} user 
* @param {Trip} trip 
* @returns {{DAY: Number, WEEK: Number}}
*/
function getFareCapTally (user, trip) {
   let journeyKey = JourneyService.getConsolidatedNotation(trip.from, trip.to),
       dayKey = getFCTallyKeyForDay(trip),
       weekKey = getFCTallyKeyForWeek(trip),
       res = {
           DAY: 0,
           WEEK: 0
       };
   
   if (!user.farecapTally[journeyKey]) {
       return res;
   }

   if (user.farecapTally[journeyKey][dayKey]) {
       res.DAY = user.farecapTally[journeyKey][dayKey];
   }

   if (user.farecapTally[journeyKey][weekKey]) {
       res.WEEK = user.farecapTally[journeyKey][weekKey];
   }

   return res;
}

module.exports = {
    
    /**
     * 
     * @param {User} user 
     * @param {Trip} trip 
     * @param {Number} fare 
     */
    addFareToFareCapTally: function (user, trip, fare) {
        let journeyKey = JourneyService.getConsolidatedNotation(trip.from, trip.to),
            dayKey = getFCTallyKeyForDay(trip),
            weekKey = getFCTallyKeyForWeek(trip);
    
        if (!user.farecapTally[journeyKey]) {
            user.farecapTally[journeyKey] = {};
        }
    
        if (!user.farecapTally[journeyKey][dayKey]) {
            user.farecapTally[journeyKey][dayKey] = 0;
        }
    
        if (!user.farecapTally[journeyKey][weekKey]) {
            user.farecapTally[journeyKey][weekKey] = 0;
        }
    
        user.farecapTally[journeyKey][dayKey] += fare;
        user.farecapTally[journeyKey][weekKey] += fare;
    },

    /**
     * 
     * @param {User} user 
     * @param {Trip} trip 
     */
    getRemainingAmountForFareCap: function(user, trip) {
        let farecapTally = getFareCapTally(user, trip),
            caps = FareCap[trip.from][trip.to],
            dailyRemains = caps.DAY - farecapTally.DAY,
            weeklyRemains = caps.WEEK - farecapTally.WEEK;
        
        return Math.min(dailyRemains, weeklyRemains);
    }
};