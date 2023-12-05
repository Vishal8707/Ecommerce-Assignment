import categoryModel from "../Models/categoryModel.js";

import { validateName } from "../validation/validate.js";

export const createCategory = async function (req, res) {
  try {
    let data = req.body;
    const {category} = data

    if (Object.keys(data).length == 0) {
      return res.status(400).send({
        status: "false",
        message: "Please enter the firlds in request body",
      });
    }

    if (!category || category == "") {
      return res
        .status(400)
        .send({ status: false, message: "The product category is mandatory." });
    }
    if (!validateName(category)) {
      return res
        .status(400)
        .send({ status: false, message: "category can not conatin number." });
    }
    let savedProduct = await categoryModel.create(data);
    return res
      .status(201)
      .send({ status: true, message: "Success", data: savedProduct });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

export const getCategoryList = async function (req, res) {
  try {
    let categoryList = await categoryModel
      .find()
      .select({ createdAt: 0, updatedAt: 0, __v: 0, _id: 0, title: 0 });

    if (!categoryList)
      return res.send({ status: false, message: "data not found" });

    return res
      .status(201)
      .send({ status: true, message: "Success", data: categoryList });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};
