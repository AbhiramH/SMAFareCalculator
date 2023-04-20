class Trip {

    from;
    to;
    time;

    /**
     * 
     * @param {string} from 
     * @param {string} to 
     * @param {Moment} time 
     */
    constructor (from, to, time) {
        this.from = from;
        this.to = to;
        this.time = time;
    }
}

module.exports = Trip;
