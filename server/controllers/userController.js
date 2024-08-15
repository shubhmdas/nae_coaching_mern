import User from '../models/userModel.js';

export const signUp = async (req, res) => {
	try {
		const { fullName, phoneNumber, email, password } = req.body;
		const existingUser = User.findOne({ phoneNumber });
		if (existingUser) {
			return res
				.status(400)
				.json({
					message: 'A user with this phone number already exists.',
				});
		}
		const user = new User({ fullName, phoneNumber, email, password });
		await user.save();
		return res.status(201).json({
			message: 'User created successfully',
			user,
		});
	} catch (err) {
		res.status(400).json({ error: `Error: ${err}` });
	}
};
