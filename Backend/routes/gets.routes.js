import { Router } from "express";
import { getsControllers } from "../controller/gets.controller.js";
import { getsOneControllers } from "../controller/getsOne.controller.js";
import { postsControllers } from "../controller/post.controllers.js";
import { updatesControllers } from "../controller/patch.controllers.js";
import loginFunction from "../controller/login.controller.js";

const router = Router();

router.get("/:colection", [], getsControllers);
router.get("/:colection/:id", [], getsOneControllers);
router.post("/:colection/", [], postsControllers);
router.patch("/:colection/:id", [], updatesControllers);
router.patch("/login", [], loginFunction);

export default router;
