const csv = require('csvtojson');
const { UserService, TripService } = require("./services");

// Figure out csv file
const SAMPLE_CSV = './sample.csv';
let args = process.argv.slice(2),
    csvFile = args.length ? args[0] : SAMPLE_CSV;

// Create user to track trips for.
// In the future, this app can easily be expanded to support multiple users too.
let user = UserService.createUser();

csv({
    noheader: true,
    trim: true
})
.fromFile(csvFile)
.then((trips)=>{
    for (let tripInfo of trips) {
        let tripInfoArray = Object.values(tripInfo);

        if (tripInfoArray.length < 3) {
            console.warn('Ignoring line due to invalid format', tripInfo);
            continue;
        }

        let trip = TripService.createTrip(
            tripInfoArray[0],
            tripInfoArray[1],
            tripInfoArray[2]
        );

        UserService.addFare(user, trip);
    }

    console.log(UserService.getTotalFare(user));
});

