const express = require("express");
const router = express.Router();
const passport = require("passport");

const Incident = require("../../models/Incident");

// @route POST api/incidents/create
// @desc Create a new incident
// @access Private
router.post(
  "/create",
  // passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const newIncident = await new Incident({
      name: req.body.name,
      description: req.body.description,
      area: req.body.area,
      dateDue: req.body.dateDue,
      assignee: req.body.assignee,
      status: req.body.status,
      priority: req.body.priority,
    });

    newIncident.save().then((incident) => res.json(incident));
  }
);

// @route GET api/incidents/
// @desc Get all incidents
// @access Private
router.get(
  "/",
  // passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    Incident.find().then((incident) => res.json(incident));
  }
);

// @route GET api/incidents/:id
// @desc Get specific incident by id
// @access Private
router.get(
  "/:id",
  //passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let id = req.params.id;

    Incident.findById(id).then((incident) => res.json(incident));
  }
);

// @route DELETE api/incidents/delete/:id
// @desc Delete an existing incident
// @access Private
router.delete(
  "/delete/:id",
  //passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Incident.findById(req.params.id).then((incident) => {
      incident.remove().then(() => res.json({ success: true }));
    });
  }
);

// @route PATCH api/incidents/update
// @desc Update an existing incident
// @access Private
router.patch(
  "/update",
  //passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let incidentFields = {};

    incidentFields.name = req.body.name;
    incidentFields.description = req.body.description;
    incidentFields.area = req.body.area;
    incidentFields.dateDue = req.body.dateDue;
    incidentFields.assignee = req.body.assignee;
    incidentFields.status = req.body.status;
    incidentFields.priority = req.body.priority;

    Incident.findOneAndUpdate(
      { _id: req.body._id },
      { $set: incidentFields },
      { new: true }
    )
      .then((incident) => {
        res.json(incident);
      })
      .catch((err) => console.log(err));
  }
);

module.exports = router;
