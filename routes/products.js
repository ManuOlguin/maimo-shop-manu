import express from 'express';
const router = express.Router();
import Product from '../models/products.js';

const findAllProducts = async (req, res) => {
  try{
    const products = await Product.find().select("id name")
    return res.status(200).send({ message: 'All products', products });

  } catch (error) {
    return res.status(501).send({ message: 'Error', error });

  }
};

const findOneProduct = async (req, res) => {
  const {id} = req.params;
  try{
    const product = await Product.findOne({_id: id}).select("id name");
    return res.status(200).send({ message: 'Product info', product });

  } catch (error) {
    return res.status(501).send({ message: 'Error', error });

  }};
const addProduct = async(req, res) => {
  const {name} = req.body;
  try{
    const product = new Product({name});
    await product.save();
    return res.status(200).send({ message: `Product Created ${name}`, product });

  } catch (error) {
    return res.status(501).send({ message: 'Error', error });

  }};

const updateProduct = async(req, res) => {
  const {id} = req.params;
  const {name} = req.body;
  try{
    const productToUpdate = await Product.findOne({_id: id}).select("id name");
    if(!productToUpdate){
      return res.status(501).send({ message: `Error product not found`});
    }
    productToUpdate.name = name;

    await productToUpdate.save()
    return res.status(200).send({ message: `Product updated`,  product: productToUpdate});

  } catch (error) {
    return res.status(501).send({ message: 'Error', error });

  }};
const deleteProduct = async(req, res) => {
  const {id} = req.params;
  try{
    const productToDelete = await Product.findOne({_id: id}).select("id name");;
    if(!productToDelete){
      return res.status(501).send({ message: `Error product not found`});
    }

    await Product.deleteOne({_id: id}) 
    return res.status(200).send({ message: `Product deleted`});

  } catch (error) {
    return res.status(501).send({ message: 'Error', error });

  }};

//CRUD (Create, Read, Update, Delete)
router.get('/', findAllProducts);
router.get('/:id', findOneProduct);
router.post('/', addProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

export default router;
