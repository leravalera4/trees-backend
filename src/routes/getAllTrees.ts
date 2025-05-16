import express, { Request, Response } from "express";
import cors from "cors";
import { USERS, TREES, connection, PORT, TreeSizePrices } from "../constants";

const app = express();

app.get("/getAllTrees", async (req: Request, res: Response): Promise<any> => {
  try {
    const trees = await TREES.find({}).toArray();
    return res.status(200).json(trees);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});