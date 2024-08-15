import mongoose from 'mongoose';

const userSchema = mongoose.Schema(
	{
		fullName: {
			type: String,
			maxlength: 35,
			minlength: 3,
			trim: true,
			required: true,
		},
		phoneNumber: {
			type: String,
			maxlength: 10,
			unique: true,
			trim: true,
			required: true,
		},
		email: { type: String, unique: true, trim: true, required: true },
		password: { type: String, maxlength: 30, minlength: 4, required: true },
	},
	{ timestamps: true }
);

const User = mongoose.model('User', userSchema);
export default User;
