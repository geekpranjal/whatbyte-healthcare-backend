const express = require("express");
const { body, param } = require("express-validator");
const authMiddleware = require("../middleware/authMiddleware");
const validateRequest = require("../middleware/validateRequest");
const controller = require("../controllers/patientController");

const router = express.Router();
const patientFields = [
  body("name").trim().notEmpty().withMessage("Name is required"),
  body("age")
    .isInt({ min: 0 })
    .withMessage("Age must be a non-negative number"),
  body("gender").trim().notEmpty().withMessage("Gender is required"),
];
const idField = param("id")
  .isInt({ min: 1 })
  .withMessage("ID must be a positive number");

router.use(authMiddleware);
router.post("/", patientFields, validateRequest, controller.createPatient);
router.get("/", controller.getPatients);
router.get("/:id", idField, validateRequest, controller.getPatient);
router.put(
  "/:id",
  [
    idField,
    body("name").optional().trim().notEmpty(),
    body("age").optional().isInt({ min: 0 }),
    body("gender").optional().trim().notEmpty(),
  ],
  validateRequest,
  controller.updatePatient,
);
router.delete("/:id", idField, validateRequest, controller.deletePatient);

module.exports = router;
