const router = require('express').Router();
const { Category, Product } = require('../../models');
const { sync } = require('../../models/Product');

// The `/api/categories` endpoint

// find all categories
router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product }]
    });
    if (!categoryData) {
      res.status(504).json({ message: "Category not found!" })
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// find one category by its `id` value
router.get('/:id', async (req, res) => {
  try {
    const categoryIdData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }]
    });
    if (!categoryIdData) {
      res.status(504).json({ message: "Category with this id not found!" })
    }
    res.status(200).json(categoryIdData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create a new category
router.post('/', async (req, res) => {
  try {
    const newCategoryData = await Category.create(req.body);
    res.status(200).json(newCategoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// update a category by its `id` value
router.put('/:id', async (req, res) => {
  try {
    const updateCategoryData = await Category.update({
      id: req.body.id,
      category_name: req.body.category_name
    },
      {
        where: {
          id: req.params.id
        }
      })
    if (!updateCategoryData) {
      res.status(404).json({ message: "Category with this id not found!" })
    }
    res.status(200).json(updateCategoryData)
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete a category by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const deleteCategoryData = await Category.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!deleteCategoryData) {
      res.status(404).json({ message: "Category with this id not found!" })
    }
    res.status(200).json(deleteCategoryData)
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
