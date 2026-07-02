import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema({
  eventType: {
    type: String,
    enum: ['call_click', 'whatsapp_click', 'contact_click', 'form_submit'],
    required: [true, 'Event type is required'],
  },
  source: {
    type: String,
    trim: true,
    default: 'unknown',
  },
  meta: {
    type: mongoose.Schema.Types.Mixed,
    default: {},
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Event = mongoose.model('Event', EventSchema);

export default Event;
