const moment = require('moment');

const { Trip, User } = require("../models");
const { PeakHours, Fares } = require('../constants');
const FareCapService = require('./FareCapService');

const timeFormat = 'HH:mm';

/**
 * 
 * @param {Trip} trip 
 * @returns {Boolean}
 */
function isPeakTime (trip) {
    let dayNumber = trip.time.isoWeekday(),
        peakHoursForDay = PeakHours[dayNumber],

        // Create new moment to remove date information from time
        tripTime = moment(trip.time.format(timeFormat), timeFormat);
    
    for (let p of peakHoursForDay) {
        let pFrom = moment(p[0], timeFormat),
            pTo = moment(p[1], timeFormat);

        if (tripTime.isBetween(pFrom, pTo)) {
            return true;
        }
    }
    
    return false;
}

module.exports = {

    /**
     * Return the fare for a trip and user, after considering
     * peak hours and fare caps.
     * 
     * @param {Trip} trip 
     * @param {User} user
     */
    getFare: function (trip, user) {
        let isPeak = isPeakTime(trip),
            baseFare = 0,
            fares = Fares[trip.from][trip.to];

        if (isPeak) {
            baseFare = fares.PEAK;
        }
        else {
            baseFare = fares.REGULAR;
        }
        
        let remainingAmountForFareCap = FareCapService.getRemainingAmountForFareCap(user, trip);

        if (baseFare >= remainingAmountForFareCap) {
            return baseFare;
        }
        else {
            return remainingAmountForFareCap;
        }
    }
};
