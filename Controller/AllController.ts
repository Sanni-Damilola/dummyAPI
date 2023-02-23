import UserModel from "../Model/UserModel";
import ProductsModel from "../Model/ProductsModel";
import express, { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const router = express.Router();

//get all users
router.get("/users", async (req: Request, res: Response) => {
  try {
    const fetchUser = await UserModel.find();
    return res.status(200).json({
      message: "success",
      data: fetchUser,
    });
  } catch (err) {
    res.status(404).json({
      message: "an error occured",
    });
  }
});

//get all product
router.get("/allproducts", async (req: Request, res: Response) => {
  try {
    const getAllProduct = await ProductsModel.find();
    return res.status(200).json({
      message: "success",
      data: getAllProduct,
    });
  } catch (err) {
    res.status(404).json({
      message: "an error occured",
    });
  }
});

//get one user
router.get("/product/:id", async (req: Request, res: Response) => {
  try {
    const grtOneProduct = await ProductsModel.findById(req.params.id);
    return res.status(200).json({
      message: "success",
      data: grtOneProduct,
    });
  } catch (err) {
    res.status(404).json({
      message: "an error occured",
    });
  }
});

// register a user
router.post("/register", async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const createUser = await UserModel.create({
      name,
      email,
      password,
    });
    return res.status(200).json({
      message: "success",
      data: createUser,
    });
  } catch (err) {
    res.status(404).json({
      message: "an error occured",
    });
  }
});

router.post("/register", async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    // const salt = await bcrypt.genSalt(10);
    // const hash = bcrypt.hash(password, salt);
    const createUser = await UserModel.create({
      name,
      email,
      password,
      isAdmin: false,
    });
    return res.status(200).json({
      message: "success",
      data: createUser,
      // token: jwt.sign(
      // 	{ _id: createUser._id },
      // 	"Ths-57aenrn-53q4yhnae-05q3ujn",
      // 	{ expiresIn: "1d" },
      // ),
    });
  } catch (err) {
    res.status(404).json({
      message: "an error occured",
    });
  }
});

router.post("/login", async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    const checkUser = await UserModel.findOne({ email: email });

    if (checkUser) {
      return res.status(200).json({
        message: "success",
        data: checkUser,
      });
    } else {
      return res.status(200).json({
        message: "user not found",
      });
    }
  } catch (err) {
    res.status(404).json({
      message: "an error occured",
    });
  }
});

// create produt

router.post("/createProduct", async (req: Request, res: Response) => {
  try {
    const { title, desc, price, category, quantity, status } = req.body;

    const creating = await ProductsModel.create({
      title,
      desc,
      price,
      category,
      quantity,
      status: true,
    });

    res.status(200).json({
      message: "successfully created",
      data: creating,
    });
  } catch (err) {
    res.status(404).json({
      message: "an error occured",
    });
  }
});

//puschasing product
router.patch(
  "/purchaseProduct/:productID",
  async (req: Request, res: Response) => {
    try {
      const { qty } = req.body;

      // const getUser = await UserModel.findById(req.params.userID);
      const getProducts = await ProductsModel.findById(req.params.productID);
      console.log(getProducts);

      if (getProducts!.quantity == 0) {
        await ProductsModel.findByIdAndUpdate(getProducts!._id!, {
          status: false,
        });
      } else {
        await ProductsModel.findByIdAndUpdate(getProducts!._id!, {
          quantity: getProducts?.quantity! - qty,
        });
      }
    } catch (err) {
      res.status(404).json({
        message: "an error occured",
      });
    }
  }
);

export default router;
