const router = require('express').Router();
const { Category, Product } = require('../../models');
const { findByPk } = require('../../models/Product');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
    // find all categories
  // be sure to include its associated Products
  try{
    const categoryData = await Category.findAll({
      include:{
        model: Product,
        attributes: ['product_name']
      }
    });
    if(!categoryData) {
      res.status(404).json({message: "No Categories Found"})
    }
    res.status(200).json(categoryData)
  } catch(err){
    res.status(500).json(err)
  }
});
// find one category by its `id` value
router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      // be sure to include its associated Products
    include: {
      model: Product,
      attributes: ['product_name']
    }
  })
  if(!categoryData) {
    res.status(404).json({message: "No category found using that id"});
    return
  };
  res.status(200).json(categoryData)
  } catch (err) {
    res.status(500).json(err)
  }

});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData)
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const categoryData = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if(!categoryData[0]) {
      res.status(404).json({message: 'No category found with this ID'});
      return;
    }
    res.status(200).json(categoryData)
  } catch (err) {
    res.status(500).json(err)
    
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id
      },
    });
    if (!categoryData) {
      res.status(404).json({message: "No Category found with this ID!"})
    }
  } catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router;
