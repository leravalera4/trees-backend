import { Connection, clusterApiUrl } from "@solana/web3.js";
import { MongoClient } from "mongodb";
import { UserDocument, TreeDocument } from "./interfaces";
import dotenv from "dotenv";
// Load environment variables
dotenv.config();

export const PORT = process.env.PORT || 3000;

// web3 consts
export const connection: Connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
export const mainWalletPublicKey = process.env.mainWalletPublicKey || "";

// init DB
const client = new MongoClient(process.env.mongoUri || "");
const dbName = "treessol";
const collectionNameUsers = "users";
const collectionNameTrees = "trees";

export const USERS = client.db(dbName).collection<UserDocument>(collectionNameUsers);
export const TREES = client.db(dbName).collection<TreeDocument>(collectionNameTrees);

export const TreeSizePrices = {
    Small: 1,
    Medium: 2,
    Big: 3,
    Huge: 4
}