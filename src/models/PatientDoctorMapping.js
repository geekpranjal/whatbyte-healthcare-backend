const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const PatientDoctorMapping = sequelize.define("PatientDoctorMapping", {
  patientId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: "patient_doctor_unique",
  },
  doctorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: "patient_doctor_unique",
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = PatientDoctorMapping;
