import productModel from "../Models/productModel.js";
import categoryModel from "../Models/categoryModel.js";
import {
  validatePrice,
  validateDescription,
} from "../validation/validate.js";
import { isValidObjectId } from "mongoose";

export const createProduct = async function (req, res) {
  try {
    let data = req.body;
    if (Object.keys(data).length == 0) {
      return res.status(400).send({
        status: "false",
        message: "Please enter the data in request body",
      });
    }
    let { title, categoryId, description, price, brand } = data;

    if (!title || title == "") {
      return res.status(400).send({
        status: false,
        message: "title is mandatory and title Should not be Empty",
      });
    }

    const checkTitle = await categoryModel.findOne({ title });

    if (checkTitle) {
      return res.status(400).send({
        status: false,
        message: "This title already exist, provide a new title",
      });
    }
    if (!categoryId || categoryId == "") {
      return res.status(400).send({
        status: false,
        message: "categoryId is mandatory and categoryId Should not be Empty",
      });
    }

    if (!description || description == "") {
      return res.status(400).send({
        status: false,
        message: "Description is mandatory and description Should not be Empty",
      });
    }

    if (!validateDescription(description)) {
      return res.status(400).send({
        status: false,
        message: "Invalid description, or it cannot contain any number.",
      });
    }

    if (!price) {
      return res
        .status(400)
        .send({ status: false, message: "Price is mandatory " });
    }

    if (!validatePrice(price)) {
      return res.status(400).send({
        status: false,
        message: "Price is not present in correct format",
      });
    }

    if (!brand) {
      return res
        .status(400)
        .send({ status: false, message: "brand is mandatory." });
    }

    let savedProduct = await productModel.create(data);
    return res
      .status(201)
      .send({ status: true, message: "Success", data: savedProduct });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};


export const productList = async function (req, res) {
  try {
    let categoryId = req.params.categoryId;

    if (!isValidObjectId(categoryId))
      return res.status(404).send({
        status: false,
        message: `Please Enter Valid ProductId: ${categoryId}.`,
      });

    let getList = await productModel
      .find({
        categoryId: categoryId,
        isDeleted: false,
      })
      .select({ isDeleted: 0, _id: 0, categoryId:0 });

    if (!getList)
      return res.status(404).send({
        status: false,
        message: "Product data not found , it might be deleted.",
      });

    return res
      .status(200)
      .send({ status: true, message: "Success", data: getList });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

export const getproductById = async function (req, res) {
  try {
    let productId = req.params.productId;
    if (!isValidObjectId(productId))
      return res.status(404).send({
        status: false,
        message: `Please Enter Valid ProductId: ${data}.`,
      });

    let findProduct = await productModel
      .find({
        _id:productId,
        isDeleted: false,
      })
      .select({ isDeleted: 0, _id: 0, categoryId:0,createdAt:0,updatedAt:0,__v:0});

    if (!findProduct)
      return res.status(404).send({
        status: false,
        message: "Product data not found , it might be deleted.",
      });

    return res
      .status(200)
      .send({ status: true, message: "Success", data: findProduct });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

