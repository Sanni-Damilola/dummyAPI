import mongoose from "mongoose";


// object struture
interface Iprod {
	name: string;
	email: string;
	password: string;
	cart: any[];
	isAdmin: boolean;
}

// extends to mongodb
interface UserData extends Iprod, mongoose.Document {}

// schema
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

// model
export default mongoose.model<UserData>("users", UserSchema);
