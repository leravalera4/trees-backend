import express, { Request, Response } from "express";
import cors from "cors";
import { USERS, TREES, connection, PORT, TreeSizePrices } from "../constants";
import { CreateUserPayload, CreateTreePayload } from "../interfaces";
import { checkSolTransfer } from "../helpers/checkSolTransfer"

const app = express();
app.post("/createTree", async (req: Request, res: Response): Promise<any> => {
  const payload: CreateTreePayload = req.body;

  const treeType = payload.size;
  let paymentAmountToCheck = 0;

  if (treeType == "Small") {
    paymentAmountToCheck = TreeSizePrices.Small
  }
  else if (treeType == "Medium") {
    paymentAmountToCheck = TreeSizePrices.Medium
  }
  else if (treeType == "Big") {
    paymentAmountToCheck = TreeSizePrices.Big
  }
  else if (treeType == "Huge") {
    paymentAmountToCheck = TreeSizePrices.Huge
  }


  // check payment first
  const checkPayment = await checkSolTransfer(payload.userAddress, paymentAmountToCheck);
  if (!checkPayment) {
    return res.status(402).json({ error: "Payment not found" });
  }

  const { insertedId } = await TREES.insertOne( { 
      position_x: payload.position_x,
      position_y: payload.position_y,
      handle: payload.handle,
      description: payload.description,
      link: payload.link,
      size: payload.size,
      type: payload.type
    } 
  );


  // update user tree array
  await USERS.updateOne(
    { userAddress: payload.userAddress },    // match the user
    { $addToSet: { trees: insertedId } }     // push if not already present
  );

  
  return res.status(200).json("tree created");
});