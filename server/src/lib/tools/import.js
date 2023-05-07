
const filenames = ['2021-05.csv', '2021-06.csv', '2021-07.csv']

const validator = {
  $jsonSchema: {
    bsonType: "object",
    required: ["departure", "return", "departureStationID", "departureStationName", "returnStationId", "returnStationName", "coveredDistanceInMeters", "durationInSeconds"],
    properties: {
      departure: { bsonType: "date" },
      return: { bsonType: "date" },
      departureStationID: { bsonType: "int"},
      departureStationName: { bsonType: "string" },
      returnStationId: { bsonType: "int"},
      returnStationName: { bsonType: "string" },
      coveredDistanceInMeters: { bsonType: "int", minimum: 10 },
      durationInSeconds: { bsonType: "int", minimum: 10 }
    }
  }
};