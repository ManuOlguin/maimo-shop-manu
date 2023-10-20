import mongoose, { mongo } from "mongoose";
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    Total: {type: Number}, 
    products: {type: Array}, 
    ClientId: {type: String},
},
{timestamps: true}
);
export default mongoose.model("Order", orderSchema, "Orders");