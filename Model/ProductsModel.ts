import mongoose from "mongoose";

interface Iprod {
	title: string;
	desc: string;
	price: number;
	quantity: number;
	category: string;
	status: boolean;
}

interface UserData extends Iprod, mongoose.Document {}

const ProductSchema = new mongoose.Schema(
	{
		title: {
			type: String,
		},
		desc: {
			type: String,
		},

		price: {
			type: Number,
		},

		quantity: {
			type: Number,
		},

		category: {
			type: String,
		},

		status: {
			type: Boolean,
		},
	},
	{ timestamps: true },
);

export default mongoose.model<UserData>("products", ProductSchema);
