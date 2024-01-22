const express = require("express");
const UserModel = require("../model/User");
const ProductsModel = require("../model/Product");

const router = express.Router();

router.get("/getAllCompanys", async (req, res) => {
  try {
    const companies = await UserModel.find({ typeAccount: "colaborator" });
    return res.json({
      error: false,
      data: companies,
    });
  } catch (error) {
    console.error(error);
    return res.status(500);
  }
});

router.post("/filterCompanies", async (req, res) => {
  try {
    const { filter } = req.body;
    const companiesPromise = UserModel.find({
      typeAccount: "colaborator",
      nameCompany: { $regex: filter, $options: "i" },
    });

    const productsPromise = ProductsModel.find({
      $or: [
        { productName: { $regex: filter, $options: "i" } },
        { productDescription: { $regex: filter, $options: "i" } },
      ],
    });

    const [companies, products] = await Promise.all([
      companiesPromise,
      productsPromise,
    ]);

    const companyPromises = products.map(async (product) => {
      const userId = product.userId;
      const company = await UserModel.find(userId);
      return company;
    });

    const companiesFromProducts = await Promise.all(companyPromises);
    const allCompanies = companies.concat(...companiesFromProducts);
    const uniqueCompanies = Array.from(
      new Set(allCompanies.map(JSON.stringify))
    ).map(JSON.parse);

    return res.json({
      error: false,
      data: uniqueCompanies,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: true, message: "Internal Server Error" });
  }
});

router.put("/editProfile", async (req, res) => {
  try {
    const { _id, email, name } = req.body;

    const updateFields = {};
    if (email) {
      updateFields.email = email;
    }
    if (name) {
      updateFields.name = name;
    }

    const existingUser = await UserModel.findOne({ email: email });
    if (existingUser && existingUser._id.toString() !== _id) {
      return res.status(400).json({
        error: true,
        message: "Email already exist",
      });
    }

    if (Object.keys(updateFields).length === 0) {
      return res.status(400).json({
        error: true,
        message: "Nenhum campo fornecido para atualização",
      });
    }

    const result = await UserModel.updateOne(
      { _id: _id },
      { $set: updateFields }
    );

    if (result) {
      return res.json({
        success: true,
        message: "Perfil atualizado com sucesso",
      });
    } else {
      return res
        .status(404)
        .json({ error: true, message: "Usuário não encontrado" });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: true, message: "Internal Server Error" });
  }
});

module.exports = router;
