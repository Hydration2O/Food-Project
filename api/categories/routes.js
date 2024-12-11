const express = require("express");
const router = express.Router();

const {
  listCategoryController,
  createNewCategoryController,
  updateCategoryController,
  deleteCategoryController,
  listCategoryIdController,
} = require("./controllers");

router.get("/", listCategoryController);

router.get("/:categoryId", listCategoryIdController);

router.post("/", createNewCategoryController);

router.put("/:categoryId", updateCategoryController);

router.delete("/:categoryId", deleteCategoryController);

module.exports = router;
