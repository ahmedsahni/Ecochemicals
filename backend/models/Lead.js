import mongoose from 'mongoose';

const LeadSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true,
  },
  city: {
    type: String,
    required: [true, 'City/District is required'],
    trim: true,
  },
  farmSize: {
    type: String,
    enum: {
      values: ['Small', 'Medium', 'Large'],
      message: 'Farm size must be Small, Medium, or Large',
    },
    required: [true, 'Farm size is required'],
  },
  padCount: {
    type: Number,
    min: [0, 'Number of pads cannot be negative'],
  },
  message: {
    type: String,
    trim: true,
  },
  status: {
    type: String,
    enum: ['new', 'contacted', 'completed'],
    default: 'new',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Lead = mongoose.model('Lead', LeadSchema);

export default Lead;
