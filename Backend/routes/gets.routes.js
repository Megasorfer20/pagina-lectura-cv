import { Router } from "express";
import { getsControllers } from "../controller/gets.controller.js";

const router = Router();

router.get("/:colection", [], getsControllers);

export default router;
