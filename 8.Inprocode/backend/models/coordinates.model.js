import mongoose from "mongoose";

const LocationSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["Venue", "Bar", "Park"],
      required: true,
    },
    properties: {
      id: {
        type: String,
        required: true,
        unique: true,
      },
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: false,
      },
      "marker-size": {
        type: String,
        required: false,
      },
      "marker-color": {
        type: String,
        required: false,
      },
      "marker-symbol": {
        type: String,
        required: false,
      },
    },
    geometry: {
      type: {
        type: String,
        enum: ["Point"],
        required: true,
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        required: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

// Create geospatial index, to allow querying by location (other points within a certain distance, within a polygon area, etc)
LocationSchema.index({ geometry: "2dsphere" });

const Location = mongoose.model("Location", LocationSchema); // Mongo "pluralizes" the name of the model

export default Location;
