import { Router } from "express";
import { serviceCatalog } from "../data/services.js";

const router = Router();

router.get("/", (_req, res) => {
  res.json(serviceCatalog);
});

export default router;

