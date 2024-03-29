import express, { Router } from "express";
import { healthCheck } from "../service/index/index";
const router: Router = express.Router();

/* GET home page. */
router.get("/", healthCheck);

export default router;
