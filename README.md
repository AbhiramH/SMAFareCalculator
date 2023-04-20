# Metro Fare Calculator

This is a Node app that calculates a user's total fare when given their trips.
It also supports daily and weekly fare caps, as well as different peak and regular fares for any given trip.


## Limitations

The app currently only supports fare calculation using lines and not stations. The app is written assuming that two lines exist - red and green.

## How to run

This being a Nodejs app, you need to first install node modules by doing:
```
npm i
```
Then, you can run the app using:
```
node main.js
```
The above command uses the sample csv included in the repo. To use your own csv file, add it as a command line argument:
```
node main.js path/to/your/csv/file
```

## CSV file format

The csv file that the program expects as input needs to be of the following format:
```
<from_line>,<to_line>,<date-time>
```
For example:
```
green,red,2021-03-24T09:58:30
```
> **Note:** Ensure that your csv file does **NOT** have headers.

## Changing the parameters
Parameters such as the supported lines, weekly / daily fare caps, peak/regular fares, etc are defined in the `constants` folder under the appropriate files, and can be updated there.