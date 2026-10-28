const { Doctor } = require("../models");

async function createDoctor(req, res) {
  try {
    const doctor = await Doctor.create({ ...req.body, userId: req.user.id });
    return res.status(201).json(doctor);
  } catch (error) {
    return res.status(500).json({ message: "Could not create doctor" });
  }
}

async function getDoctors(req, res) {
  try {
    const doctors = await Doctor.findAll({ where: { userId: req.user.id } });
    return res.status(200).json(doctors);
  } catch (error) {
    return res.status(500).json({ message: "Could not get doctors" });
  }
}

async function getDoctor(req, res) {
  try {
    const doctor = await Doctor.findOne({
      where: { id: req.params.id, userId: req.user.id },
    });
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });
    return res.status(200).json(doctor);
  } catch (error) {
    return res.status(500).json({ message: "Could not get doctor" });
  }
}

async function updateDoctor(req, res) {
  try {
    const doctor = await Doctor.findOne({
      where: { id: req.params.id, userId: req.user.id },
    });
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });
    const updates = {};
    if (req.body.name !== undefined) updates.name = req.body.name;
    if (req.body.specialization !== undefined)
      updates.specialization = req.body.specialization;
    if (req.body.email !== undefined) updates.email = req.body.email;
    await doctor.update(updates);
    return res.status(200).json(doctor);
  } catch (error) {
    return res.status(500).json({ message: "Could not update doctor" });
  }
}

async function deleteDoctor(req, res) {
  try {
    const doctor = await Doctor.findOne({
      where: { id: req.params.id, userId: req.user.id },
    });
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });
    await doctor.destroy();
    return res.status(200).json({ message: "Doctor deleted" });
  } catch (error) {
    return res.status(500).json({ message: "Could not delete doctor" });
  }
}

module.exports = {
  createDoctor,
  getDoctors,
  getDoctor,
  updateDoctor,
  deleteDoctor,
};
