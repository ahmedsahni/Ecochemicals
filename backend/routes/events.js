import express from 'express';
import Event from '../models/Event.js';

const router = express.Router();

// POST /api/events — Log a click event (public, no auth needed)
router.post('/', async (req, res) => {
  try {
    const { eventType, source, meta } = req.body;

    const validEventTypes = ['call_click', 'whatsapp_click', 'contact_click', 'form_submit'];
    if (!eventType || !validEventTypes.includes(eventType)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or missing eventType. Must be one of: ' + validEventTypes.join(', '),
      });
    }

    const newEvent = new Event({
      eventType,
      source: source || 'unknown',
      meta: meta || {},
    });

    await newEvent.save();
    return res.status(201).json({ success: true, message: 'Event logged.' });
  } catch (error) {
    console.error('POST Event Error:', error);
    return res.status(500).json({ success: false, message: 'Server error logging event.' });
  }
});

// GET /api/events — View all events (Protected by admin token)
router.get('/', async (req, res) => {
  try {
    const adminToken = process.env.ADMIN_TOKEN || 'admin-secret-key';
    const authHeader = req.headers['x-admin-token'] || req.headers['authorization'];
    const queryToken = req.query.token;

    let providedToken = queryToken;
    if (authHeader) {
      providedToken = authHeader.startsWith('Bearer ') ? authHeader.substring(7) : authHeader;
    }

    if (providedToken !== adminToken) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized: Invalid or missing authentication token',
      });
    }

    // Optional date filter: last N days
    const days = parseInt(req.query.days) || 30;
    const since = new Date();
    since.setDate(since.getDate() - days);

    const events = await Event.find({ timestamp: { $gte: since } })
      .sort({ timestamp: -1 })
      .limit(500);

    // Summary counts by eventType
    const summary = {
      call_click: 0,
      whatsapp_click: 0,
      contact_click: 0,
      form_submit: 0,
    };
    events.forEach((e) => {
      if (summary[e.eventType] !== undefined) summary[e.eventType]++;
    });

    // Events per day breakdown (last N days)
    const perDay = {};
    events.forEach((e) => {
      const dayKey = e.timestamp.toISOString().split('T')[0];
      perDay[dayKey] = (perDay[dayKey] || 0) + 1;
    });

    return res.json({
      success: true,
      count: events.length,
      summary,
      perDay,
      data: events,
    });
  } catch (error) {
    console.error('GET Events Error:', error);
    return res.status(500).json({ success: false, message: 'Server error retrieving events.' });
  }
});

export default router;
