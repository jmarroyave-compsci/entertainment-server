import express from "express";
import * as controller from "../../controllers/2.0/TV";
import { asyncHandler } from "../../lib/asyncHandler";

const router = express.Router();
router.use("/2.0/api/tv/:id", asyncHandler(controller.tvGet, "tvGet"));

export default router;