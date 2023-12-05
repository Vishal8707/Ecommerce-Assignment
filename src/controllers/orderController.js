import orderModel from "../Models/orderModel.js";
import cartModel from "../Models/cartModel.js";
import userModel from "../Models/userModel.js";
import { isValidObjectId } from "mongoose";


//================================= Create Order ================================================//

export const createOrder = async function (req, res) {
  try {
    let userId = req.params.userId;
    let data = req.body;
    let { cartId, cancellable } = data;

    if (!isValidObjectId(userId))
      return res
        .status(400)
        .send({ status: false, message: "Invalid User Id" });

    let userData = await userModel.findById(userId);

    if (!userData) {
      return res.status(404).send({ status: false, message: "User Not Found" });
    }
    if (cancellable) {
      if (cancellable !== "true" && cancellable !== "false") {
        return res.status(400).send({
          status: false,
          message: "cancellable data always either true or false",
        });
      }
    }
    if (!cancellable) {
      cancellable = false;
    }

    if (!cartId)
      return res.status(400).send({ status: false, message: "Enter cartId" });

    const cart = await cartModel.findById(cartId);

    if (!cart)
      return res.status(404).send({ status: false, message: "Cart Not Found" });

    let { items, totalPrice, totalItems } = cart;

    if (items.length == 0)
      return res.status(404).send({
        status: false,
        message: "Cart is empty. Please add Product to Cart.",
      });

    let totalQuantity = 0;

    for (let i = 0; i < items.length; i++) {
      totalQuantity += items[i].quantity;
    }
    data.userId = userId;
    data.items = items;
    data.totalPrice = totalPrice;
    data.totalItems = totalItems;
    data.totalQuantity = totalQuantity;

    let order = await orderModel.create(data);

    if (order) {
      let cartUpdate = await cartModel.findOneAndUpdate(
        { _id: cartId },
        { totalPrice: 0, totalItems: 0, items: [] },
        { new: true }
      );
    }
    return res
      .status(200)
      .send({ status: true, message: "Success", data: order });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

export const orderHistory = async function (req, res) {
  try {
    let userId = req.params.userId;

    if (userId) {
      if (!isValidObjectId(userId))
        return res
          .status(400)
          .send({ status: false, message: "Please provide correct UserId." });
    }

    let checkUserId = await userModel.findById(userId);

    if (!checkUserId) {
      return res
        .status(404)
        .send({ status: false, message: "No user found with this userId." });
    }

    let getData = await orderModel.find({ userId: userId });

    if (!getData) {
      return res
        .status(404)
        .send({ status: false, message: "order not found with this userId." });
    }

    return res
      .status(200)
      .send({ status: true, message: "Success", data: getData });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

export const ordersbyId = async function (req, res) {
  try {
    let orderId = req.body.orderId;

    if (!isValidObjectId(orderId))
      return res
        .status(400)
        .send({ status: false, message: "Please provide correct orderId." });

    let getOrder = await orderModel.findById(orderId);

    if (!getOrder) {
      return res
        .status(404)
        .send({ status: false, message: "order not found with this orderId." });
    }

    return res
      .status(200)
      .send({ status: true, message: "Success", data: getOrder });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};
