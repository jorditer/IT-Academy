import express from "express";
import { getCoordinates } from "../controllers/coordinates.controller.js";

const router = express.Router();

router.get('/', getCoordinates);

export default router;