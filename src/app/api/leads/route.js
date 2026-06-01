import { NextResponse } from 'next/server';
import { z } from 'zod';
import nodemailer from 'nodemailer';
import connectToDatabase from '@/lib/mongodb';
import Lead from '@/models/Lead';

const pkPhoneRegex = /^(?:\+92|92|0)?3[0-9]{9}$/;

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

function formatForWhatsApp(phone) {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.startsWith('0')) return '92' + cleaned.substring(1);
  if (cleaned.startsWith('3')) return '92' + cleaned;
  return cleaned;
}

export async function POST(request) {
  try {
    await connectToDatabase();
    const body = await request.json();
    const validatedData = LeadSchema.parse(body);

    const newLead = new Lead(validatedData);
    await newLead.save();

    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASS;
    const ownerEmail = process.env.OWNER_EMAIL;

    let emailSent = false;
    let emailError = null;

    if (emailUser && emailPass && ownerEmail) {
      try {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: { user: emailUser, pass: emailPass },
        });

        const waPhone = formatForWhatsApp(validatedData.phone);
        const waLink = `https://wa.me/${waPhone}?text=Assalam-o-Alaikum%20${encodeURIComponent(validatedData.name)},%20this%20is%20ECO%20Chemicals.%20We%20received%20your%20quote%20request%20for%20Cleanex%20Pad%20Cleaner.`;

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
    }

    return NextResponse.json({ success: true, message: 'Lead saved successfully', data: newLead, emailSent, emailError }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        success: false,
        errors: error.errors.map(e => ({ field: e.path.join('.'), message: e.message }))
      }, { status: 400 });
    }
    console.error('API Error:', error);
    return NextResponse.json({ success: false, message: 'Server error. Please try again.' }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    await connectToDatabase();
    
    // Auth check
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Basic ')) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }
    
    const base64Credentials = authHeader.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [username, password] = credentials.split(':');

    if (username !== 'admin' || password !== 'hafizMas@2002') {
      return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 });
    }

    const leads = await Lead.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: leads, total: leads.length });
  } catch (error) {
    console.error('GET Leads Error:', error);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}
