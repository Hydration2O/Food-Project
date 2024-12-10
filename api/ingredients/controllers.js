exports.createIngredient = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Ingredient name is required" });
    }

    const newIngredient = await Ingredient.create({ name });
    res.status(201).json(newIngredient);
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ error: "Duplicated Ingredient" });
    } else {
      res.status(500).json({ error: " Server Error" });
    }
  }
};
