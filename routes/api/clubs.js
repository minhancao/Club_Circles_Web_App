const express = require("express");
const router = express.Router();

// Club Model
const Club = require("../../models/Club");

router.get("/:id", (req, res) => {
  Club.findById(req.params.id).then(club => res.json(club));
});

// @route GET api/items
// @desc Get All Items
// @access Public
router.get("/", (req, res) => {
  Club.find()
    .sort({ name: -1 })
    .then(items => res.json(items));
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
    members: req.body.members
  });

  newClub.save().then(item => res.json(item));
});

// @route DELETE api/items/:id
// @desc Delete A Item
// @access Public
router.delete("/:id", (req, res) => {
  Club.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

// update club
// This is for adding to announcements, events, etc.
router.put("/add/:id", (req, res) => {
  Club.findOneAndUpdate(
    { _id: req.params.id },
    { $push: req.body },
    { sort: { _id: -1 }, upsert: true },
    (err, result) => {
      if (err) return res.json(err);
    }
  )
    .then(item => res.json(item))
    .catch(err => res.status(404).json({ success: false }));
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
        "announcements.$.announcement": req.body.announcement
      }
    },
    { sort: { _id: -1 }, upsert: true },
    (err, result) => {
      if (err) return res.json(err);
    }
  )
    .then(item => res.json(item))
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
