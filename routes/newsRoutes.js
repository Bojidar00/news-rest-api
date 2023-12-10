import Router from "koa-router";
import {
  getNews,
  addNews,
  updateNews,
  deleteNews,
} from "../controllers/newsControllers.js";
import {
  validateDelete,
  validateGet,
  validatePost,
  validatePut,
} from "../validators/validators.js";

const router = new Router();

router.get("/news", validateGet, getNews);
router.post("/news", validatePost, addNews);
router.put("/news", validatePut, updateNews);
router.delete("/news", validateDelete, deleteNews);

export default router;
