import express, { Request, Response } from "express";
import cors from "cors";
import { USERS, TREES, connection, PORT, TreeSizePrices } from "../constants";
import { CreateUserPayload, CreateTreePayload } from "../interfaces";
import { checkSolTransfer } from "../helpers/checkSolTransfer"

const app = express();

app.post("/createUser", async (req: Request, res: Response): Promise<any> => {
  const payload: CreateUserPayload = req.body;

  const document = await USERS.findOne({ userAddress: payload.userAddress });

  if(!document) {
    await USERS.insertOne( { userAddress: payload.userAddress, paymentIds: [], trees: [] } );
  }
  return res.status(200).json("user created");
});