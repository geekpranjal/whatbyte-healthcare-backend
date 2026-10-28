const express = require("express");
const { body, param } = require("express-validator");
const authMiddleware = require("../middleware/authMiddleware");
const validateRequest = require("../middleware/validateRequest");
const controller = require("../controllers/doctorController");

const router = express.Router();
const doctorFields = [
  body("name").trim().notEmpty().withMessage("Name is required"),
  body("specialization")
    .trim()
    .notEmpty()
    .withMessage("Specialization is required"),
  body("email").isEmail().withMessage("A valid email is required"),
];
const idField = param("id")
  .isInt({ min: 1 })
  .withMessage("ID must be a positive number");

router.use(authMiddleware);
router.post("/", doctorFields, validateRequest, controller.createDoctor);
router.get("/", controller.getDoctors);
router.get("/:id", idField, validateRequest, controller.getDoctor);
router.put(
  "/:id",
  [
    idField,
    body("name").optional().trim().notEmpty(),
    body("specialization").optional().trim().notEmpty(),
    body("email").optional().isEmail(),
  ],
  validateRequest,
  controller.updateDoctor,
);
router.delete("/:id", idField, validateRequest, controller.deleteDoctor);

module.exports = router;
