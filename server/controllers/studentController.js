import { Student, User } from '../models/User.js';

export const getAllStudents = async (req, res) => {
	try {
		// const userId = req.params.userId;
		const students = await Student.find({ user: req.user._id });
		res.status(200).json({ students });
	} catch (error) {
		console.log('Some error: ', error);
		res.status(400).json({ error: error.message });
	}
};

export const addStudent = async (req, res) => {
	try {
		const { fullName, grade } = req.body;

		// Check if all required fields are provided
		if (!fullName) {
			return res.status(400).json({ error: 'Name is required' });
		}
		if (!grade) {
			return res.status(400).json({ error: 'Class is required' });
		}

		const existingStudent = await Student.findOne({
			user: req.user._id,
			fullName: fullName,
		});

		if (existingStudent) {
			res.status(400).json({
				error: 'A student with this name already exists in this account.',
			});
		}

		const student = new Student({
			user: req.user._id,
			fullName,
			grade,
		});
		await student.save();
		res.status(201).json({
			message: 'Student added successfully',
			student,
		});
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};
