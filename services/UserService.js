const { User, Trip } = require("../models");
const FareCapService = require("./FareCapService");
const FareService = require("./FareService");

module.exports = {

    /**
     * Initialises a new user object.
     * 
     * @returns {User} new user
     */
    createUser: function () {
        let newUser = new User();

        return newUser;
    },

    /**
     * 
     * @param {User} user
     * @param {Trip} trip
     */
    addFare: function (user, trip) {
        let fare = FareService.getFare(trip, user);

        user.totalFare += fare;

        FareCapService.addFareToFareCapTally(user, trip, fare);
    },

    /**
     * 
     * @param {User} user 
     * @returns {Number}
     */
    getTotalFare: function (user) {
        return user.totalFare;
    }
};
