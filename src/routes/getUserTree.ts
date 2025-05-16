import express, { Request, Response } from "express";
import cors from "cors";
import { USERS, TREES, connection, PORT, TreeSizePrices } from "../constants";
import { CreateUserPayload, CreateTreePayload } from "../interfaces";
import { checkSolTransfer } from "../helpers/checkSolTransfer"

const app = express();

app.get("/getUserTrees", async (req: Request, res: Response): Promise<any> => {
  try {
    const { userAddress } = req.query;

    if (!userAddress) {
      return res.status(400).json({ error: "Missing userAddress" });
    }

    const user = await USERS.findOne({ userAddress });

    if (!user || !user.trees || user.trees.length === 0) {
      return res.status(200).json([]); // return empty list
    }

    const trees = await TREES.find({ _id: { $in: user.trees } }).toArray();

    return res.status(200).json(trees);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});
