const { LINE_GREEN, LINE_RED } = require("./lines");

module.exports = {
    [LINE_GREEN]: {
        [LINE_GREEN]: {
            PEAK: 2,
            REGULAR: 1
        },
        [LINE_RED]: {
            PEAK: 4,
            REGULAR: 3
        }
    },
    [LINE_RED]: {
        [LINE_GREEN]: {
            PEAK: 3,
            REGULAR: 2
        },
        [LINE_RED]: {
            PEAK: 3,
            REGULAR: 2
        }
    }
};
