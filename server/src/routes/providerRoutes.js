import { Router } from "express";
import {
  registerProvider,
  listProviders,
  getProvider,
  updateProvider,
} from "../controllers/providerController.js";

const router = Router();

router.post("/", registerProvider);
router.get("/", listProviders);
router.get("/:id", getProvider);
router.put("/:id", updateProvider);

export default router;

