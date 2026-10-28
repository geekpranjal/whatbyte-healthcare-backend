const User = require("./User");
const Patient = require("./Patient");
const Doctor = require("./Doctor");
const PatientDoctorMapping = require("./PatientDoctorMapping");

User.hasMany(Patient, { foreignKey: "userId", onDelete: "CASCADE" });
Patient.belongsTo(User, { foreignKey: "userId" });

User.hasMany(Doctor, { foreignKey: "userId", onDelete: "CASCADE" });
Doctor.belongsTo(User, { foreignKey: "userId" });

Patient.hasMany(PatientDoctorMapping, {
    foreignKey: "patientId",
    onDelete: "CASCADE",
});
PatientDoctorMapping.belongsTo(Patient, { foreignKey: "patientId" });

Doctor.hasMany(PatientDoctorMapping, {
    foreignKey: "doctorId",
    onDelete: "CASCADE",
});
PatientDoctorMapping.belongsTo(Doctor, { foreignKey: "doctorId" });

module.exports = { User, Patient, Doctor, PatientDoctorMapping };
