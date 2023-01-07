const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// find all tags
router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product }]
    });
    if (!tagData) {
      res.status(504).json({ message: "Tag not found!" })
    };
    res.status(200).json(tagData)
  } catch (err) {
    res.status(500).json(err);
  }
});

// find a single tag by its `id`
router.get('/:id', async (req, res) => {
  try {
    const tagIdData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }]
    });
    if (!tagIdData) {
      res.status(504).json({ message: "Tag with this id not found!" })
    }
    res.status(200).json(tagIdData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create a new tag
router.post('/', async (req, res) => {
  try {
    const newTagData = await Tag.create(req.body);
    
    res.status(200).json(newTagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// update a tag's name by its `id` value
router.put('/:id', async (req, res) => {
  try {
    const updateTagData = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    })
    if (!updateTagData) {
      res.status(404).json({ message: "Tag with this id not found!" })
    }
    res.status(200).json(updateTagData)
  } catch (err) {
    res.status(500).json(err);
  }

});

// delete on tag by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const deleteTagData = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!deleteTagData) {
      res.status(404).json({ message: "Tag with this id not found!" })
    }
    res.status(200).json(deleteTagData)
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
