const { Patient, Doctor, PatientDoctorMapping } = require("../models");

async function createMapping(req, res) {
  try {
    const { patientId, doctorId } = req.body;
    const patient = await Patient.findOne({
      where: { id: patientId, userId: req.user.id },
    });
    if (!patient) return res.status(404).json({ message: "Patient not found" });
    const doctor = await Doctor.findOne({
      where: { id: doctorId, userId: req.user.id },
    });
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });

    const existingMapping = await PatientDoctorMapping.findOne({
      where: { patientId, doctorId },
    });
    if (existingMapping)
      return res
        .status(409)
        .json({ message: "Doctor is already assigned to this patient" });

    const mapping = await PatientDoctorMapping.create({
      patientId,
      doctorId,
      userId: req.user.id,
    });
    return res.status(201).json(mapping);
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res
        .status(409)
        .json({ message: "Doctor is already assigned to this patient" });
    }
    return res.status(500).json({ message: "Could not create mapping" });
  }
}

async function getMappings(req, res) {
  try {
    const mappings = await PatientDoctorMapping.findAll({
      where: { userId: req.user.id },
      include: [
        { model: Patient, where: { userId: req.user.id } },
        { model: Doctor, where: { userId: req.user.id } },
      ],
    });
    return res.status(200).json(mappings);
  } catch (error) {
    return res.status(500).json({ message: "Could not get mappings" });
  }
}

async function getPatientMappings(req, res) {
  try {
    const patient = await Patient.findOne({
      where: { id: req.params.patient_id, userId: req.user.id },
    });
    if (!patient) return res.status(404).json({ message: "Patient not found" });
    const mappings = await PatientDoctorMapping.findAll({
      where: { patientId: patient.id, userId: req.user.id },
      include: [{ model: Doctor, where: { userId: req.user.id } }],
    });
    return res.status(200).json(mappings);
  } catch (error) {
    return res.status(500).json({ message: "Could not get patient mappings" });
  }
}

async function deleteMapping(req, res) {
  try {
    const mapping = await PatientDoctorMapping.findOne({
      where: { id: req.params.id, userId: req.user.id },
    });
    if (!mapping) return res.status(404).json({ message: "Mapping not found" });
    await mapping.destroy();
    return res.status(200).json({ message: "Mapping deleted" });
  } catch (error) {
    return res.status(500).json({ message: "Could not delete mapping" });
  }
}

module.exports = {
  createMapping,
  getMappings,
  getPatientMappings,
  deleteMapping,
};
