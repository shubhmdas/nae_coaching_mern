import bcrypt from 'bcrypt';
import { User } from '../models/User.js';
import { createSecretToken } from '../utils/SecretToken.js';

export const userSignUp = async (req, res) => {
	try {
		const { fullName, phoneNumber, email, password, role } = req.body;

		// Check if all required fields are provided
		if (!fullName) {
			return res.status(400).json({ error: 'Full name is required' });
		}
		if (!phoneNumber) {
			return res.status(400).json({ error: 'Phone number is required' });
		}
		if (!email) {
			return res.status(400).json({ error: 'Email is required' });
		}
		if (!password) {
			return res.status(400).json({ error: 'Password is required' });
		}
		if (!role) {
			return res.status(400).json({ error: 'Role is required' });
		}

		// Check if user with this phone number already exists
		const existingUser = await User.findOne({ phoneNumber });
		if (existingUser) {
			return res.status(400).json({
				error: 'A user with this phone number already exists.',
			});
		}

		// Create a new user and generate a token
		const user = new User({ fullName, phoneNumber, email, password, role });
		await user.save();

		const token = createSecretToken(user._id);

		// Add token to cookie in the resposne
		res.cookie('token', token, {
			withCredentials: true,
			httpOnly: false,
		});

		user = user.toObject;
		delete user.password;
		return res.status(201).json({
			message: 'User created successfully',
			user,
		});
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

export const userLogin = async (req, res) => {
	try {
		const { phoneNumber, password } = req.body;

		// Check if all required fields are provided
		if (!phoneNumber) {
			return res.status(400).json({ error: 'Phone number is required' });
		}
		if (!password) {
			return res.status(400).json({ error: 'Password is required' });
		}

		// Check if user exists with this phone number
		const user = await User.findOne({ phoneNumber });
		if (!user) {
			return res.status(400).json({
				error: 'User with this phone number does not exist.',
			});
		}

		// Compare the password provide in the request
		const auth = bcrypt.compare(password, user.password);
		console.log('Auth: ', auth);
		if (!auth) {
			return res.status(400).json({
				error: 'Incorrect password. Please try again.',
			});
		}

		// Generate a token and send in the response
		const token = createSecretToken(user._id);
		return res
			.status(201)
			.json({ message: 'Logged in successfully.', token });
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

export const logout = (req, res) => {
	res.cookie('token', '', { maxAge: 1 });
	return res.status(201).json({ message: 'Logged out successfully.' });
};
