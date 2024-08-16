import { model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';

// User schema and model
const userSchema = new Schema(
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
		role: {
			type: String,
			enum: ['student', 'parent', 'teacher', 'admin'],
			default: 'student',
		},
	},
	{ timestamps: true }
);

userSchema.pre('save', async function () {
	this.password = await bcrypt.hash(this.password, 12);
});

export const User = model('User', userSchema);

// Student schema and model
const studentSchema = new Schema(
	{
		user: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		fullName: {
			type: String,
			maxlength: 35,
			minlength: 3,
			trim: true,
			required: true,
		},
		grade: { type: Number },
	},
	{ timestamps: true }
);

export const Student = model('Student', studentSchema);

// Teacher schema and model
const teacherSchema = new Schema(
	{
		user: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		specialization: { type: String, required: true },
	},
	{ timestamps: true }
);

export const Teacher = model('Teacher', teacherSchema);
