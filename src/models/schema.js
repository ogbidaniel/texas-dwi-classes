import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  role: { 
    type: String, 
    enum: ['student', 'instructor', 'admin'], 
    default: 'student' 
  },
  createdAt: { type: Date, default: Date.now },
});

const CourseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { 
    type: String, 
    enum: ['AEPM', 'DWI-E', 'DWI-I', 'DOEP', 'VIP', 'SAE'], 
    required: true 
  },
  duration: { type: Number, required: true }, // hours
  price: {
    min: { type: Number, required: true },
    max: { type: Number, required: true }
  },
  description: String,
});

const SessionSchema = new mongoose.Schema({
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
  instructorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  maxStudents: { type: Number, default: 20 },
  enrolledStudents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  status: {
    type: String,
    enum: ['scheduled', 'in-progress', 'completed', 'cancelled'],
    default: 'scheduled'
  }
});

export const User = mongoose.models.User || mongoose.model('User', UserSchema);
export const Course = mongoose.models.Course || mongoose.model('Course', CourseSchema);
export const Session = mongoose.models.Session || mongoose.model('Session', SessionSchema);