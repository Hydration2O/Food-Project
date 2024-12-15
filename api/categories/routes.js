const express = require("express");
const router = express.Router();

const multer = require("multer");

const storage = multer.diskStorage({
  destination: "./media",
  filename: (req, file, cb) => {
    cb(null, `${+new Date()}${file.originalname}`);
  },
});

const upload = multer({
  storage,
});

const {
  listCategoryController,
  createNewCategoryController,
  updateCategoryController,
  deleteCategoryController,
  listCategoryIdController,
} = require("./controllers");

router.get("/", listCategoryController);

router.get("/:categoryId", listCategoryIdController);

router.post("/", upload.single("image"), createNewCategoryController);

router.put("/:categoryId", updateCategoryController);

router.delete("/:categoryId", deleteCategoryController);

module.exports = router;
