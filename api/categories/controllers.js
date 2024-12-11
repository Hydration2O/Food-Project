const Category = require("../../models/Category");

exports.listCategoryController = async (req, res) => {
  try {
    const categories = await Category.find(); //.populate("Recipe");
    res.json(categories);
  } catch (e) {
    res.status(500).json({ Message: e.Message });
  }
};

exports.listCategoryIdController = async (req, res) => {
  const { categoryId } = req.params;
  try {
    const category = await Category.findById(categoryId);
    if (category) {
      res.status(200).json(category);
    } else {
      res.status(404).json({ message: "Category not found" });
    }
  } catch (e) {
    res.status(500).json({ Message: e.Message });
  }
};

exports.createNewCategoryController = async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);
    res.status(201).json(newCategory);
  } catch (e) {
    res.status(500).json({ Message: e.Message });
  }
};

exports.updateCategoryController = async (req, res) => {
  const { categoryId } = req.params;
  try {
    const foundCategory = await Category.findById(categoryId);
    if (foundCategory) {
      await foundCategory.updateOne(req.body);
      res.status(204).end();
    } else {
      res.status(404).json({ message: "Category not found" });
    }
  } catch (e) {
    res.status(500).json({ Message: e.Message });
  }
};

exports.deleteCategoryController = async (req, res) => {
  const { categoryId } = req.params;
  try {
    const foundCategory = await Category.findById(categoryId);
    if (foundCategory) {
      await foundCategory.remove(req.body);
      res.status(204).end();
    } else {
      res.status(404).json({ message: "Category deleted" });
    }
  } catch (e) {
    res.status(500).json({ Message: e.Message });
  }
};
