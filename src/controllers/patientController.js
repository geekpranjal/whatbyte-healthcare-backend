const { Patient } = require("../models");

async function createPatient(req, res) {
  try {
    const patient = await Patient.create({ ...req.body, userId: req.user.id });
    return res.status(201).json(patient);
  } catch (error) {
    return res.status(500).json({ message: "Could not create patient" });
  }
}

async function getPatients(req, res) {
  try {
    const patients = await Patient.findAll({ where: { userId: req.user.id } });
    return res.status(200).json(patients);
  } catch (error) {
    return res.status(500).json({ message: "Could not get patients" });
  }
}

async function getPatient(req, res) {
  try {
    const patient = await Patient.findOne({
      where: { id: req.params.id, userId: req.user.id },
    });
    if (!patient) return res.status(404).json({ message: "Patient not found" });
    return res.status(200).json(patient);
  } catch (error) {
    return res.status(500).json({ message: "Could not get patient" });
  }
}

async function updatePatient(req, res) {
  try {
    const patient = await Patient.findOne({
      where: { id: req.params.id, userId: req.user.id },
    });
    if (!patient) return res.status(404).json({ message: "Patient not found" });
    const updates = {};
    if (req.body.name !== undefined) updates.name = req.body.name;
    if (req.body.age !== undefined) updates.age = req.body.age;
    if (req.body.gender !== undefined) updates.gender = req.body.gender;
    await patient.update(updates);
    return res.status(200).json(patient);
  } catch (error) {
    return res.status(500).json({ message: "Could not update patient" });
  }
}

async function deletePatient(req, res) {
  try {
    const patient = await Patient.findOne({
      where: { id: req.params.id, userId: req.user.id },
    });
    if (!patient) return res.status(404).json({ message: "Patient not found" });
    await patient.destroy();
    return res.status(200).json({ message: "Patient deleted" });
  } catch (error) {
    return res.status(500).json({ message: "Could not delete patient" });
  }
}

module.exports = {
  createPatient,
  getPatients,
  getPatient,
  updatePatient,
  deletePatient,
};
