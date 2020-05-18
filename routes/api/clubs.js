const express = require("express");
const router = express.Router();

// Club Model
const Club = require("../../models/Club");

var ObjectId = require("mongodb").ObjectID;

router.get("/:id", (req, res) => {
  Club.findById(req.params.id).then((club) => res.json(club));
});

// @route GET api/items
// @desc Get All Items
// @access Public
router.get("/", (req, res) => {
  Club.find()
    .sort({ name: -1 })
    .then((items) => res.json(items));
});

// @route POST api/items
// @desc Create An Item
// @access Public
router.post("/", (req, res) => {
  const newClub = new Club({
    name: req.body.name,
    description: req.body.description,
    category: req.body.category,
    location: req.body.location,
    president: req.body.president,
    staff: req.body.staff,
    members: req.body.members,
  });

  newClub.save().then((item) => res.json(item));
});

// @route DELETE api/items/:id
// @desc Delete A Item
// @access Public
router.delete("/:id", (req, res) => {
  Club.findById(req.params.id)
    .then((item) => item.remove().then(() => res.json({ success: true })))
    .catch((err) => res.status(404).json({ success: false }));
});

// This is for editting club name, description, category, about, location
router.put("/edit/:clubId", (req, res) => {
  Club.findOneAndUpdate(
    { _id: req.params.clubId },
    {
      $set: req.body,
    },
    { new: true },
    (err, result) => {
      if (err) return res.json(err);
      else return res.json(result);
    }
  );
});

// update club
// This is for adding to announcements, events, discussions
router.put("/add/:id", (req, res) => {
  Club.findOneAndUpdate(
    { _id: req.params.id },
    { $addToSet: req.body },
    { new: true },
    (err, result) => {
      if (err) return res.json(err);
      else return res.json(result);
    }
  );
});

// adding a comment to a discussion, (posting to a discussion)
router.put("/add/discussions/:clubId/:discussionId", (req, res) => {
  Club.findOneAndUpdate(
    { _id: req.params.clubId, "discussions._id": req.params.discussionId },
    {
      $addToSet: {
        "discussions.$.comments": req.body,
      },
    },
    { new: true },
    (err, result) => {
      if (err) return res.json(err);
      else return res.json(result);
    }
  );
});

// This is for editting discussions
router.put("/edit/discussions/:clubId/:discussionId", (req, res) => {
  Club.findOneAndUpdate(
    { _id: req.params.clubId, "discussions._id": req.params.discussionId },
    {
      $set: {
        "discussions.$.name": req.body.name,
        "discussions.$.discussion": req.body.discussion,
      },
    },
    { new: true },
    (err, result) => {
      if (err) return res.json(err);
      else return res.json(result);
    }
  );
});

// This is for editting discussion comment
// https://stackoverflow.com/questions/23577123/updating-a-nested-array-with-mongodb
// https://stackoverflow.com/questions/48594481/selecting-and-updating-a-nested-object-by-its-objectid-in-mongoose-js
router.put("/edit/discussions/:clubId/:discussionId/:commentId", (req, res) => {
  const query = {
    _id: req.params.clubId,
  };

  const update = {
    $set: {
      "discussions.$[discussion].comments.$[comment].username":
        req.body.username,
      "discussions.$[discussion].comments.$[comment].comment": req.body.comment,
    },
  };
  const options = {
    new: true,
    arrayFilters: [
      { "discussion._id": new ObjectId(req.params.discussionId) },
      { "comment._id": new ObjectId(req.params.commentId) },
    ],
  };
  const newItemReturn = { new: true };
  // update the document
  Club.findOneAndUpdate(query, update, options, function (error, result) {
    if (error) {
      res.json(error);
    } else {
      res.json(result);
    }
  });
});

// removing a discussion
router.put("/delete/discussions/:id/:id2", (req, res) => {
  Club.updateOne(
    { _id: req.params.id },
    { $pull: { discussions: { _id: req.params.id2 } } },
    { new: true },
    (err, result) => {
      if (err) return res.json(err);
      else return res.json(result);
    }
  );
});

// removing a discussion comment
router.put("/delete/discussions/:id/:id2/:id3", (req, res) => {
  Club.updateOne(
    { _id: req.params.id, "discussions._id": req.params.id2 },
    { $pull: { "discussions.$.comments": { _id: req.params.id3 } } },
    { new: true },
    (err, result) => {
      if (err) return res.json(err);
      else return res.json(result);
    }
  );
});

// update club
// This is for editting announcements
/* Input format ex: 
{
	"name": "omegalul12335", "announcement": "hey there35354"
}
*/
router.put("/edit/announcements/:id/:id2", (req, res) => {
  Club.findOneAndUpdate(
    { _id: req.params.id, "announcements._id": req.params.id2 },
    {
      $set: {
        "announcements.$.name": req.body.name,
        "announcements.$.announcement": req.body.announcement,
      },
    },
    (err, result) => {
      if (err) return res.json(err);
    }
  )
    .then((item) => res.json(item))
    .catch((err) => res.status(404).json({ success: false }));
});

// removing an announcement
router.put("/delete/announcements/:id/:id2", (req, res) => {
  Club.updateOne(
    { _id: req.params.id },
    { $pull: { announcements: { _id: req.params.id2 } } },
    (err, result) => {
      if (err) return res.json(err);
    }
  )
    .then((item) => res.json(item))
    .catch((err) => res.status(404).json({ success: false }));
});

// editting an event
router.put("/edit/events/:id/:id2", (req, res) => {
  Club.findOneAndUpdate(
    { _id: req.params.id, "events._id": req.params.id2 },
    {
      $set: {
        "events.$.name": req.body.name,
        "events.$.dateOfEvent": req.body.dateOfEvent,
        "events.$.description": req.body.description,
      },
    },
    (err, result) => {
      if (err) return res.json(err);
    }
  )
    .then((item) => res.json(item))
    .catch((err) => res.status(404).json({ success: false }));
});

// removing an event
router.put("/delete/events/:id/:id2", (req, res) => {
  Club.updateOne(
    { _id: req.params.id },
    { $pull: { events: { _id: req.params.id2 } } },
    (err, result) => {
      if (err) return res.json(err);
    }
  )
    .then((item) => res.json(item))
    .catch((err) => res.status(404).json({ success: false }));
});

module.exports = router;
