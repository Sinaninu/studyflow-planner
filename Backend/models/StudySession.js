import mongoose from "mongoose";

const studySessionSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: [true, "Date is required"]
    },
    durationMinutes: {
      type: Number,
      required:[true, "Time is required"],
      min: 15,
      max: 480,
    },
    topic: {
      type: String,
      required: [true, "Topic is required"],
      trim: true,
    },
    location: {
      type: String,
      required: [true, "Location is required"],
      trim: true,
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: [true, "courseId is required"]
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "userId is required"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("StudySession", studySessionSchema);