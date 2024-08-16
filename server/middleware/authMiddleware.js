import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';

const authMiddleware = async (req, res, next) => {
	try {
		// Get the token from the Authorization header
		const token = req.header('Authorization')?.replace('Bearer ', '');
		if (!token) {
			res.status(401).json({
				error: 'No authentication token provided. Access denied.',
			});
		}

		// Verify the token
		const decoded = jwt.verify(token, process.env.TOKEN_KEY);

		// Find user by ID
		const user = await User.findById(decoded.userId).select('-password');
		if (!user) {
			res.status(401).json({
				error: 'Invalid token provided.',
			});
		}

		// Attach the user to the request object
		req.user = user;
		next();
	} catch (error) {
		res.status(401).json({ error: 'Token is not valid' });
	}
};

export default authMiddleware;
