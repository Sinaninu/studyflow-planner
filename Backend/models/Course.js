import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Course title is required"],
      minlength: [3, "Course title must be at least 3 characters"],
      trim: true,
    },
    code: {
      type: String,
      required: [true, "Course code is required"],
      minlength: [3, "Course code must be at least 3 characters"],
      trim: true,
      uppercase: true,
    },
    semester: {
      type: String,
      required: [true, "Semester is required"],
      trim: true,
    },
    color: {
      type: String,
      required: [true, "Color is required"],
      trim: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "userId is required"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Course", courseSchema);