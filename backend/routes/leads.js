import express from 'express';
import { z } from 'zod';
import nodemailer from 'nodemailer';
import Lead from '../models/Lead.js';

const router = express.Router();

// Phone validation regex for Pakistani numbers
// Matches: +923XXXXXXXXX, 923XXXXXXXXX, 03XXXXXXXXX, 3XXXXXXXXX
const pkPhoneRegex = /^(?:\+92|92|0)?3[0-9]{9}$/;

// Zod validator for Lead submission
const LeadSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters long' }).trim(),
  phone: z.string().refine((val) => pkPhoneRegex.test(val.replace(/\s+/g, '')), {
    message: 'Invalid Pakistani phone number format. Must be like +923XXXXXXXXX or 03XXXXXXXXX',
  }),
  city: z.string().min(2, { message: 'City/District must be at least 2 characters long' }).trim(),
  farmSize: z.enum(['Small', 'Medium', 'Large'], {
    errorMap: () => ({ message: 'Please select a valid farm size' }),
  }),
  padCount: z.preprocess((val) => {
    if (val === '' || val === undefined || val === null) return undefined;
    const num = Number(val);
    return isNaN(num) ? undefined : num;
  }, z.number().min(0, { message: 'Number of pads cannot be negative' }).optional()),
  message: z.string().trim().optional(),
});

// Helper function to format phone number for WhatsApp wa.me links
// Converts 0322... to 92322... and strips non-digits
function formatForWhatsApp(phone) {
  const cleaned = phone.replace(/\D/g, ''); // strip all non-digits
  if (cleaned.startsWith('0')) {
    return '92' + cleaned.substring(1);
  }
  if (cleaned.startsWith('3')) {
    return '92' + cleaned;
  }
  return cleaned; // already starts with 92 or +92 structure
}

// POST /api/leads - Create new lead
router.post('/', async (req, res) => {
  try {
    // Validate request body
    const validatedData = LeadSchema.parse(req.body);

    // Save lead to database
    const newLead = new Lead(validatedData);
    await newLead.save();

    // Send email alert to owner
    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASS;
    const ownerEmail = process.env.OWNER_EMAIL;

    let emailSent = false;
    let emailError = null;

    if (emailUser && emailPass && ownerEmail) {
      try {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: emailUser,
            pass: emailPass,
          },
        });

        const waPhone = formatForWhatsApp(validatedData.phone);
        const waLink = `https://wa.me/${waPhone}?text=Assalam-o-Alaikum%20${encodeURIComponent(
          validatedData.name
        )},%20this%20is%20ECO%20Chemicals.%20We%20received%20your%20quote%20request%20for%20Cleanex%20Pad%20Cleaner.`;

        const mailOptions = {
          from: `"ECO Chemicals Leads" <${emailUser}>`,
          to: ownerEmail,
          subject: `🚨 NEW LEAD: ${validatedData.name} (${validatedData.city})`,
          html: `
            <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 12px; background-color: #fdfdfd;">
              <h2 style="color: #0066CC; border-bottom: 2px solid #0066CC; padding-bottom: 10px; margin-top: 0;">New Lead Inquiry - ECO Chemicals</h2>
              <p style="font-size: 15px; color: #333;">You have received a new lead inquiry from the website. Details below:</p>
              
              <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
                <tr style="background-color: #f7f9fc;">
                  <td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #eef2f5; width: 160px;">Name:</td>
                  <td style="padding: 10px; border-bottom: 1px solid #eef2f5; color: #111;">${validatedData.name}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #eef2f5;">Phone:</td>
                  <td style="padding: 10px; border-bottom: 1px solid #eef2f5; color: #111;">
                    <a href="tel:${validatedData.phone}" style="color: #0066CC; text-decoration: none; font-weight: 500;">${validatedData.phone}</a>
                  </td>
                </tr>
                <tr style="background-color: #f7f9fc;">
                  <td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #eef2f5;">City/District:</td>
                  <td style="padding: 10px; border-bottom: 1px solid #eef2f5; color: #111;">${validatedData.city}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #eef2f5;">Farm Size:</td>
                  <td style="padding: 10px; border-bottom: 1px solid #eef2f5; color: #111;">${validatedData.farmSize}</td>
                </tr>
                <tr style="background-color: #f7f9fc;">
                  <td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #eef2f5;">No. of Pads:</td>
                  <td style="padding: 10px; border-bottom: 1px solid #eef2f5; color: #111;">${validatedData.padCount || 'Not specified'}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #eef2f5; vertical-align: top;">Message:</td>
                  <td style="padding: 10px; border-bottom: 1px solid #eef2f5; color: #555; white-space: pre-line;">${validatedData.message || 'No additional message.'}</td>
                </tr>
              </table>

              <div style="text-align: center; margin-top: 30px;">
                <a href="${waLink}" target="_blank" style="background-color: #25D366; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block; box-shadow: 0 4px 6px rgba(37, 211, 102, 0.2);">
                  💬 Chat on WhatsApp
                </a>
              </div>
              
              <div style="font-size: 11px; color: #888; text-align: center; margin-top: 40px; border-top: 1px solid #eeeeee; padding-top: 15px;">
                Sent automatically by ECO Chemicals Web System © 2026.
              </div>
            </div>
          `,
        };

        await transporter.sendMail(mailOptions);
        emailSent = true;
      } catch (err) {
        console.error('Nodemailer Error:', err);
        emailError = err.message;
      }
    } else {
      console.warn('Nodemailer: Credentials or Owner Email not set. Skipping lead notification email.');
    }

    return res.status(201).json({
      success: true,
      message: 'Lead saved successfully',
      emailSent,
      ...(emailError && { emailError }),
    });

  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        errors: error.errors.map((err) => ({
          field: err.path.join('.'),
          message: err.message,
        })),
      });
    }
    console.error('Server Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error occurred.',
    });
  }
});

// GET /api/leads/analytics - Aggregated stats for dashboard charts (Protected)
router.get('/analytics', async (req, res) => {
  try {
    const adminToken = process.env.ADMIN_TOKEN || 'admin-secret-key';
    const authHeader = req.headers['x-admin-token'] || req.headers['authorization'];
    const queryToken = req.query.token;

    let providedToken = queryToken;
    if (authHeader) {
      providedToken = authHeader.startsWith('Bearer ') ? authHeader.substring(7) : authHeader;
    }

    if (providedToken !== adminToken) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    // Last 30 days window
    const since = new Date();
    since.setDate(since.getDate() - 30);

    // All leads (for breakdowns)
    const allLeads = await Lead.find();
    // Recent leads for time series
    const recentLeads = await Lead.find({ createdAt: { $gte: since } }).sort({ createdAt: 1 });

    // Leads per day (last 30 days)
    const perDayMap = {};
    recentLeads.forEach((lead) => {
      const dayKey = new Date(lead.createdAt).toISOString().split('T')[0];
      perDayMap[dayKey] = (perDayMap[dayKey] || 0) + 1;
    });
    const leadsPerDay = Object.entries(perDayMap).map(([date, count]) => ({ date, count }));

    // City breakdown (top 10)
    const cityMap = {};
    allLeads.forEach((l) => {
      cityMap[l.city] = (cityMap[l.city] || 0) + 1;
    });
    const cityBreakdown = Object.entries(cityMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([city, count]) => ({ city, count }));

    // Farm size breakdown
    const farmSizeBreakdown = { Small: 0, Medium: 0, Large: 0 };
    allLeads.forEach((l) => {
      if (farmSizeBreakdown[l.farmSize] !== undefined) farmSizeBreakdown[l.farmSize]++;
    });

    // Status counts
    const statusCounts = { new: 0, contacted: 0, completed: 0 };
    allLeads.forEach((l) => {
      if (statusCounts[l.status] !== undefined) statusCounts[l.status]++;
    });

    return res.json({
      success: true,
      totalLeads: allLeads.length,
      leadsPerDay,
      cityBreakdown,
      farmSizeBreakdown,
      statusCounts,
    });
  } catch (error) {
    console.error('Analytics Error:', error);
    return res.status(500).json({ success: false, message: 'Server error fetching analytics.' });
  }
});

// GET /api/leads - View all leads (Protected)
router.get('/', async (req, res) => {
  try {
    const adminToken = process.env.ADMIN_TOKEN || 'admin-secret-key';
    
    // Check token from headers (x-admin-token or Authorization) or query param
    const authHeader = req.headers['x-admin-token'] || req.headers['authorization'];
    const queryToken = req.query.token;

    let providedToken = queryToken;
    if (authHeader) {
      // Handle "Bearer <token>" or raw token
      providedToken = authHeader.startsWith('Bearer ') ? authHeader.substring(7) : authHeader;
    }

    if (providedToken !== adminToken) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized: Invalid or missing authentication token',
      });
    }

    const leads = await Lead.find().sort({ createdAt: -1 });
    return res.json({
      success: true,
      count: leads.length,
      data: leads,
    });
  } catch (error) {
    console.error('GET Leads Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error occurred.',
    });
  }
});

// PATCH /api/leads/:id - Update lead status (Protected)
router.patch('/:id', async (req, res) => {
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
        message: 'Unauthorized',
      });
    }

    const { status } = req.body;
    if (!['new', 'contacted', 'completed'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status value',
      });
    }

    const updatedLead = await Lead.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updatedLead) {
      return res.status(404).json({
        success: false,
        message: 'Lead not found',
      });
    }

    return res.json({
      success: true,
      data: updatedLead,
    });
  } catch (error) {
    console.error('PATCH Lead Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
});

export default router;
