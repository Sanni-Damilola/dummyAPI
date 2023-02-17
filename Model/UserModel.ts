import mongoose from "mongoose";

interface Iprod {
	name: string;
	email: string;
	password: string;
	cart: any[];
	isAdmin: boolean;
}

interface UserData extends Iprod, mongoose.Document {}

const UserSchema = new mongoose.Schema(
	{
		name: {
			type: String,
		},
		email: {
			type: String,
		},

		password: {
			type: String,
		},

		isAdmin: {
			type: Boolean,
		},

		cart: [],
	},
	{ timestamps: true },
);

export default mongoose.model<UserData>("users", UserSchema);
