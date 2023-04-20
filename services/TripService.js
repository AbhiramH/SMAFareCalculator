const moment = require('moment');

const { Lines } = require("../constants");
const { Trip } = require('../models');

module.exports = {
    
    /**
     * 
     * @param {string} from 
     * @param {string} to 
     * @param {string} timeString 
     * 
     * @returns {Trip} new user
     */
    createTrip: function (from, to, timeString) {
        if (!Lines.LINES.includes(from) || !Lines.LINES.includes(to)) {
            throw new Error('Unrecognised trip information - ', {from, to});
        }

        let timeObj;

        try {
            timeObj = moment(timeString);
        }
        catch {
            throw new Error('Unrecognised date/time information - ', timeString);
        }

        let newTrip = new Trip(from, to, timeObj);

        return newTrip;
    }
};