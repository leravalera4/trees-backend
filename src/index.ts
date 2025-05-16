import express, { Request, Response } from "express";
import cors from "cors";
import { USERS, TREES, connection, PORT, TreeSizePrices } from "./constants";
import { CreateUserPayload, CreateTreePayload } from "./interfaces";
import { checkSolTransfer } from "./helpers/checkSolTransfer"

const app = express();

// app.use(
//   cors({
//     origin: "https://launchyocoin.com", // or http://localhost:4173, 
//     methods: "GET,POST", // Specify allowed methods
//   })
// );


app.use(express.json());

app.get("/", async (req: Request, res: Response): Promise<any> => {
  return res.status(200).json("healthy");
});




// app.post("/createUser", async (req: Request, res: Response): Promise<any> => {
//   const payload: CreateUserPayload = req.body;

//   const document = await USERS.findOne({ userAddress: payload.userAddress });

//   if(!document) {
//     await USERS.insertOne( { userAddress: payload.userAddress, paymentIds: [], trees: [] } );
//   }
//   return res.status(200).json("user created");
// });


// app.post("/createTree", async (req: Request, res: Response): Promise<any> => {
//   const payload: CreateTreePayload = req.body;

//   const treeType = payload.size;
//   let paymentAmountToCheck = 0;

//   if (treeType == "Small") {
//     paymentAmountToCheck = TreeSizePrices.Small
//   }
//   else if (treeType == "Medium") {
//     paymentAmountToCheck = TreeSizePrices.Medium
//   }
//   else if (treeType == "Big") {
//     paymentAmountToCheck = TreeSizePrices.Big
//   }
//   else if (treeType == "Huge") {
//     paymentAmountToCheck = TreeSizePrices.Huge
//   }


//   // check payment first
//   const checkPayment = await checkSolTransfer(payload.userAddress, paymentAmountToCheck);
//   if (!checkPayment) {
//     return res.status(402).json({ error: "Payment not found" });
//   }

//   const { insertedId } = await TREES.insertOne( { 
//       position_x: payload.position_x,
//       position_y: payload.position_y,
//       handle: payload.handle,
//       description: payload.description,
//       link: payload.link,
//       size: payload.size,
//       type: payload.type
//     } 
//   );


//   // update user tree array
//   await USERS.updateOne(
//     { userAddress: payload.userAddress },    // match the user
//     { $addToSet: { trees: insertedId } }     // push if not already present
//   );

  
//   return res.status(200).json("tree created");
// });



// app.get("/getUserTrees", async (req: Request, res: Response): Promise<any> => {
//   try {
//     const { userAddress } = req.query;

//     if (!userAddress) {
//       return res.status(400).json({ error: "Missing userAddress" });
//     }

//     const user = await USERS.findOne({ userAddress });

//     if (!user || !user.trees || user.trees.length === 0) {
//       return res.status(200).json([]); // return empty list
//     }

//     const trees = await TREES.find({ _id: { $in: user.trees } }).toArray();

//     return res.status(200).json(trees);
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ error: "Internal Server Error" });
//   }
// });



// app.get("/getAllTrees", async (req: Request, res: Response): Promise<any> => {
//   try {
//     const trees = await TREES.find({}).toArray();
//     return res.status(200).json(trees);
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ error: "Internal Server Error" });
//   }
// });



app.listen(PORT, () => {
  console.log(`Server is running`);
});