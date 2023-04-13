import express from "express"
import {verifyToken} from "../middleware/auth.js"
import {getUser,getFavorites,addRemoveFavorites} from "../controllers/user.js"

const router = express.Router()

router.get("/:id",verifyToken,getUser);
router.get(":/id/getFavorites",verifyToken,getFavorites);

router.patch("/:id/:movieName",verifyToken,addRemoveFavorites);

export default router