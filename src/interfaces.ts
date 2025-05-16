import { ObjectId } from "mongodb";

export interface UserDocument {
    userAddress: string;
    paymentIds?: Array<string>;
    trees: Array<ObjectId>; // array of tree ids
}


export interface TreeDocument {
    position_x: string;
    position_y: string;
    handle: string;
    description: string;
    link: string;
    size: string;
    type: string;
}




// payloads

export interface CreateUserPayload {
    userAddress: string;
}

export interface CreateTreePayload {
    userAddress: string;
    position_x: string;
    position_y: string;
    handle: string;
    description: string;
    link: string;
    size: string;
    type: string;
}




