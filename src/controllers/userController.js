import userModel from "../Models/userModel.js";
import {
  validateName,
  validateEmail,
  validatePassword,
  validateMobileNo,
  validatePincode,
  validatePlace,
} from "../validation/validate.js";


import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const userRegistration = async function (req, res) {
  try {
    const data = req.body;
    data.password = data.password.trim();
    const { firstName, lastName, email, phone, password, address } = data;

    if (Object.keys(data).length == 0)
      return res
        .status(400)
        .send({ status: false, message: " request body can't be empty" });

    if (!firstName)
      return res.status(400).send({
        status: false,
        message: "Please provide your first name, or it can't be empty.",
      });

    if (!validateName(firstName))
      return res
        .status(400)
        .send({ status: false, message: "Please provide valid  firstName" });

    if (!lastName)
      return res
        .status(400)
        .send({ status: false, messsage: "Please provide lastName" });

    if (!validateName(lastName))
      return res
        .status(400)
        .send({ status: false, message: "Please provide valid  lastName" });

    if (!email)
      return res
        .status(400)
        .send({ status: false, messsage: "Email is mandatory" });

    if (!validateEmail(email))
      return res
        .status(400)
        .send({ status: false, messsage: "Please provide a valid email" });

    let checkEmailId = await userModel.findOne({ email: email });

    if (checkEmailId) {
      return res
        .status(400)
        .send({ status: false, message: "This email Id is already registered." });
    }

    if (!phone)
      return res
        .status(400)
        .send({ status: false, messsage: "Phone is mandatory" });

    if (!validateMobileNo(phone))
      return res
        .status(400)
        .send({ status: false, messsage: "Please provide a valid phone number." });

    let checkphone = await userModel.findOne({ phone: phone });

    if (checkphone) {
      return res.status(400).send({
        status: false,
        message: "This mobile number is already registered",
      });
    }

    if (!password)
      return res
        .status(400)
        .send({ status: false, messsage: "Paasword is mandatory." });

    if (!validatePassword(password))
      return res.status(400).send({
        status: false,
        messsage:
          "Please provide a valid password; it should contain uppercase and lowercase alphabets, numbers, and special characters and be 8–15 characters long.",
      });

    let hashing = bcrypt.hashSync(password, 8);
    data.password = hashing;

    if (address) {
      if (typeof address != "object") {
        return res.status(400).send({
          status: false,
          message: "The value of address must be in JSON format.",
        });
      }

      if (!address.shipping)
        return res
          .status(400)
          .send({ status: false, messsage: "Shipping address is mandatory." });

      if (!address.shipping.street)
        return res
          .status(400)
          .send({ status: false, messsage: "Please provide a street" });

      if (!address.shipping.city)
        return res
          .status(400)
          .send({ status: false, messsage: "Please provide a city." });

      if (!validatePlace(address.shipping.city))
        return res
          .status(400)
          .send({ status: false, messsage: "Please enter a valid city." });

      if (!address.shipping.pincode)
        return res
          .status(400)
          .send({ status: false, messsage: "Please provide a pincode." });

      if (!validatePincode(address.shipping.pincode))
        return res
          .status(400)
          .send({ status: false, messsage: "Please enter a valid pincode." });

      let savedata = await userModel.create(data);

      return res.status(201).send({
        status: true,
        message: "User created successfully.",
        data: savedata,
      });
    }
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
}

export const userLogin = async function (req, res) {
  try {
    const data = req.body
    data.password = data.password.trim();
    let { email, password } = data;

    if (Object.keys(data).length == 0) {
      return res
        .status(400)
        .send({ status: false, message: "Please input user Details" });
    }

    if (!email) {
      return res
        .status(400)
        .send({ status: false, message: "EmailId is mandatory" });
    }

    if (!validateEmail(email)) {
      return res
        .status(400)
        .send({ status: false, message: "EmailId should be Valid" });
    }

    if (!password) {
      return res
        .status(400)
        .send({ status: false, message: "Password is mandatory" });
    }

    let verifyUser = await userModel.findOne({ email: email });
    if (!verifyUser) {
      return res
      .status(400)
      .send({ status: false, message: "user not found" });
    }

    let hash = verifyUser.password;

    let isCorrect = bcrypt.compareSync(password, hash);
    if (!isCorrect)
      return res
        .status(400)
        .send({ status: false, message: "Password is incorrect" });

    let payload = { userId: verifyUser["_id"], iat: Date.now() };
    let token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "1h" });

    res.setHeader("x-api-key", token);
    return res.status(200).send({
      status: true,
      message: "User login successfull",
      data: { userId: verifyUser["_id"], token },
    });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

