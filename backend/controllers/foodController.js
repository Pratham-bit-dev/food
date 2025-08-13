import foodModel from "../models/foodModel.js";

// add food items
const addFood = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;
    if (!name || !description || !price || !category || !req.file) {
      return res.status(400).json({ msg: "All fields including image are required" });
    }

    const created = await foodModel.create({
      name,
      description,
      price: Number(price),
      image: `/uploads/${req.file.filename}`,
      category
    });

    res.status(201).json(created);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

export { addFood }