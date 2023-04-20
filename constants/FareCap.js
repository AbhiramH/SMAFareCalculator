const { LINE_GREEN, LINE_RED } = require("./lines");

module.exports = {
    [LINE_GREEN]: {
        [LINE_GREEN]: {
            DAY: 8,
            WEEK: 55
        },
        [LINE_RED]: {
            DAY: 15,
            WEEK: 90
        }
    },
    [LINE_RED]: {
        [LINE_GREEN]: {
            DAY: 15,
            WEEK: 90
        },
        [LINE_RED]: {
            DAY: 12,
            WEEK: 70
        }
    }
};
