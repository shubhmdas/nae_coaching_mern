import { model, Schema } from 'mongoose';

// Video schema and model
const videoSchema = new Schema(
	{
		title: { type: String, required: true },
		description: { type: String },
		url: { type: String, required: true },
		course: {
			type: Schema.Types.ObjectId,
			ref: 'Course',
			required: true,
		},
	},
	{ timestamps: true }
);
export const Video = model('Video', videoSchema);

// PDF schema and model
const pdfSchema = new Schema({
	title: { type: String, required: true },
	description: { type: String },
	url: { type: String, required: true },
	course: {
		type: Schema.Types.ObjectId,
		ref: 'Course',
		required: true,
	},
});
export const PDF = model('PDF', pdfSchema);

// Lecture schema and model
const lectureSchema = new Schema(
	{
		title: { type: String, required: true },
		description: { type: String },
		course: {
			type: Schema.Types.ObjectId,
			ref: 'Course',
			required: true,
		},
		order: { type: Number, required: true },
		videos: [{ type: Schema.Types.ObjectId, ref: 'Video' }],
		pdfs: [{ type: Schema.Types.ObjectId, ref: 'PDF' }],
	},
	{ timestamps: true }
);
export const Lecture = model('Lecture', lectureSchema);

// Course schema and model
const courseSchema = newSchema(
	{
		name: { type: String, required: true },
		description: { type: String, required: true },
		teacher: { type: Schema.Types.ObjectId, ref: 'Teacher' },
		class: { type: Number }, // null if it's for all grades
		lectures: [{ type: Schema.Types.ObjectId, ref: 'Lecture' }],
	},
	{ timestamps: true }
);
export const Course = model('Course', courseSchema);
