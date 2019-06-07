const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const announcementsSchema = new Schema({
  name: {
    type: String,
    default: "Default Announcement Name"
  },
  announcement: {
    type: String,
    default: "Default Announcement"
  },
  date: {
    type: Date,
    default: Date.now
  }
});
const discussionsSchema = new Schema({
  name: {
    type: String,
    default: "Default Discussion Name"
  },
  discussion: {
    type: String,
    default: "Default Discussion"
  },
  date: {
    type: Date,
    default: Date.now
  },
  discussions: [String]
});
const eventsSchema = new Schema({
  name: {
    type: String,
    default: "Default Event Name"
  },
  dateOfEvent: {
    type: String,
    default: "Default Date of Event"
  },
  description: {
    type: String,
    default: "Default Description"
  },
  date: {
    type: Date,
    default: Date.now
  }
});
// Create Schema
const ClubSchema = new Schema({
  name: {
    type: String,
    default: "Default Club Name"
  },
  description: {
    type: String,
    default: "Default Club Description"
  },
  category: {
    type: String,
    default: "Default Club Category"
  },
  location: {
    type: String,
    default: "Default Club Location"
  },
  president: {
    type: String,
    default: "Default President"
  },
  date: {
    type: Date,
    default: Date.now
  },
  about: {
    type: String,
    default: "Default About"
  },
  announcements: [announcementsSchema],
  discussions: [discussionsSchema],
  events: [eventsSchema],
  members: [String],
  staff: [String]
});
module.exports = Club = mongoose.model("clubs", ClubSchema);
