# **HELSINKI BIKE APP**

Helsinki Bike App is a pre-assignment project for Solita Dev Academy. For more information and requirement visit [Solita Dev Academy Github](https://github.com/solita/dev-academy-2023-exercise)

# Techstack
### Backend
- NodeJs
- Express
### Frontend
- Typescript
- ReactJs
- Material UI
- React-leaflet
### Database
- MongoDB
##3 Testing 
- Cypress for E2E testing

# Data 

For the project download datasets of journey data. The data is owned by City Bike Finland.

[Journey Data File 1](https://dev.hsl.fi/citybikes/od-trips-2021/2021-05.csv)

[Journey Data File 2](https://dev.hsl.fi/citybikes/od-trips-2021/2021-06.csv)

[Journey Data File 3](https://dev.hsl.fi/citybikes/od-trips-2021/2021-07.csv)

Also, there is a dataset that has information about Helsinki Region Transport’s (HSL) city bicycle stations.

[Station File ](https://opendata.arcgis.com/datasets/726277c507ef4914b0aec3cbcfcbfafc_0.csv)

License and information: https://www.avoindata.fi/data/en/dataset/hsl-n-kaupunkipyoraasemat/resource/a23eef3a-cc40-4608-8aa2-c730d17e8902

# Running in Docker
*Docker-compose.yml* file contains all dependencies for the application. 

## Adding Data
Add downloaded csv files of journeys in `./server/data/journeys` and stations in `./server/data/stations`. **Don't forget to __remove add_journeys_csv_here__ and add_stations_csv_here files from the folders** 

## Running The Project

```bash
docker-compose up --build
```
This will start up all the instances required. First let the mongo-import to import all the data into mongodb. Once all the data is inserted this instance will exit. You can then use the application

Backend will run on *localhost:3000*
Frontend will run on *localhost:5000*  

by default. Changes can be made in *docker-compose.yml* file. 

## Tests

Tests can be run in frontend folder *./react-client*

`npm test`  

# Running Locally

This application can be run locally by setting up environment and adding dependencies. 

- Setup mongodb server [Setting up MongoDb server Locally](https://www.mongodb.com/docs/manual/administration/install-community/)
- Data is being imported through *MongoImport*. [Install mongoimport](https://www.mongodb.com/docs/database-tools/mongoimport/) and set environment path

- Backend: 

  - Add the downloaded csv data into *./server/data/journeys* and *./server/data/stations*.**Don't forget to __remove add_journeys_csv_here__ and add_stations_csv_here files from the folders** 


  -`cd ./server/`
  
  - create .env like provided example.env in *./server* or you can simply rename the example.env to *.env* 

  -Run `npm install` **Note: Node 16 or latest is required.**

  -Run `node ./scripts/import.js` and wait for import.js script to finish importing all the data

  -Run `npm run start` to start the server

- Frontend 

  -`cd ./react-client` 

  -Run `npm install` 

  -Run `npm run dev` to start the frontend. 

- Testing

  - `cd ./react-client`

  - Run `npm test` to run cypress E2E tests in terminal or you can also open Cypress UI by running `npx cypress open` 


# Features: 

1. Data Import 

   - Data validation
   - Journeys with duration less than 10 seconds and Journeys with covered distance less than 10 meters are not imported 

2. Journey List
   - List All Journeys with departure and return stations, covered distance in kilometers and duration in minutes
    - Pagination 
    - Ordering by ascending or descending columns.

3. Add Journey 
   - Form Validation
   - Redirection
 
4. Station List 
   - List all the stations 
   - Pagination 
   - Ordering by ascending or decending columns.
 
5. Single Station List
   - Listing Station Name, Address, Total number of journeys ending and starting from that station
   - Map View 
   - The average distance of a journey starting from the station
   - The average distance of a journey ending at the station
   - Top 5 most popular return stations for journeys starting from the station
   - Top 5 most popular departure stations for journeys ending at the station
 
## Additional Features

- Dockerization of the Applicatin 
- End to End Testing with Cypress
- Readme
