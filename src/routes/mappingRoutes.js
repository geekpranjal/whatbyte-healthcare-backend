const express = require("express");
const { body, param } = require("express-validator");
const authMiddleware = require("../middleware/authMiddleware");
const validateRequest = require("../middleware/validateRequest");
const controller = require("../controllers/mappingController");

const router = express.Router();

router.use(authMiddleware);
router.post(
  "/",
  [
    body("patientId")
      .isInt({ min: 1 })
      .withMessage("A valid patientId is required"),
    body("doctorId")
      .isInt({ min: 1 })
      .withMessage("A valid doctorId is required"),
  ],
  validateRequest,
  controller.createMapping,
);
router.get("/", controller.getMappings);
router.get(
  "/:patient_id",
  param("patient_id")
    .isInt({ min: 1 })
    .withMessage("Patient ID must be a positive number"),
  validateRequest,
  controller.getPatientMappings,
);
router.delete(
  "/:id",
  param("id")
    .isInt({ min: 1 })
    .withMessage("Mapping ID must be a positive number"),
  validateRequest,
  controller.deleteMapping,
);

module.exports = router;
