# MBC06-Weather-App

# MBC05_Work-Day-Scheduler

Monash Bootcamp Week 5 Assignment - Workday Scheduler

### About this project

This simple calendar application allows an employee to add events to a daily work planner for time managment.

The schedule has defined business hours (9AM -5PM). On entry, color coding has been used so that the employee can easily identify records in the past, the current hour based on their local time
and scheduled future events.

This app will run in the browser and feature dynamically updated HTML and CSS powered by jQuery.

### Project Link

### Screen layout and Design

The following image depicts the web application's appearance and functionality:
(![Weather App Screen Design](https://github.com/vvnnzar/MBC06_Weather/blob/main/assets/screen%20design/assets/screen design/screen design.PNG))

### Acknowledgements

This development was completed in part using the following online references:

- w3 schools

### Installation

### Pre requisites

To view and modify code you will require installation of HTML and Code editor software such as Visual Code Studio.

### Installation of local project repository

1. Install GITHib on your PC
2. Create a local project repository i.e. c:\horiseon_website
3. Clone project repository using command: https://github.com/vvnnzar/MBC05_Work-Day-Scheduler.git
4. Initialise the project using command: git init

### Getting Started

Your project structure should mirror the following file structure:
/.assets (Note: assets includes css , js and screen design files)
/index.html
/ReadMe.md

### Tests

1. Application loads without error
2. On initial entry to application screen displays no city weather results.
3. On search for a city user is presented with current and future conditions for that city and that city is added to the search history
4. On view of current weather conditions for that city user is presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index.
5. On view of the UV Index color coding presented with a color that indicates whether the conditions are favorable, moderate, or severe
6. On view of future weather conditions for that city user is presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
7. On click on a city in the search history user is again presented with current and future conditions for that city
8. Data entered is saved and persists on screen refresh

### Code Deployment

To update the project with latest code:

1. Run command git status to ensure no conflict of changes
2. Run command git pull to get latest code
3. Stage files for checkin using command git add .
4. Commit files using command git commit -m "My commit message"
5. Push files to gitlab main branch using command git push

### Built With

- Use the [OpenWeather API](https://openweathermap.org/api) to retrieve weather data for city searched.

### Versioning

Initial Release v1.0 -12/04/2021

### License

This project is licensed under xxx 2020
