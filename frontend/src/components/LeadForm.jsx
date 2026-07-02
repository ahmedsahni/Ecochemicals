import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, CheckCircle2, MessageSquare, PhoneCall, ArrowRight, User, MapPin, Building, Hash, FileText } from 'lucide-react';

const pkPhoneRegex = /^(?:\+92|92|0)?3[0-9]{9}$/;

const leadSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters long' }).trim(),
  phone: z.string().refine((val) => pkPhoneRegex.test(val.replace(/\s+/g, '')), {
    message: 'Enter a valid Pakistani mobile number (e.g., 03226057885 or +923226057885)',
  }),
  city: z.string().min(2, { message: 'City/District must be at least 2 characters long' }).trim(),
  farmSize: z.enum(['Small', 'Medium', 'Large'], {
    errorMap: () => ({ message: 'Please select your farm size' }),
  }),
  padCount: z.preprocess((val) => {
    if (val === '' || val === undefined || val === null) return undefined;
    const num = Number(val);
    return isNaN(num) ? undefined : num;
  }, z.number().min(0, { message: 'Number of pads cannot be negative' }).optional()),
  message: z.string().trim().optional(),
});

const LeadForm = ({ prefilledMessage }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      name: '',
      phone: '',
      city: '',
      farmSize: 'Small',
      padCount: '',
      message: '',
    }
  });

  // Watch for external prefill message from Calculator
  useEffect(() => {
    if (prefilledMessage) {
      setValue('message', prefilledMessage);
    }
  }, [prefilledMessage, setValue]);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // POST lead data to serverless backend API
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const resData = await response.json();

      if (response.ok && resData.success) {
        setSubmitSuccess(true);
        reset();
      } else {
        throw new Error(resData.message || 'Failed to submit inquiry.');
      }
    } catch (err) {
      console.error('Submission Error:', err);
      setSubmitError(err.message || 'Network error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact-form" className="py-20 bg-white dark:bg-darkCard transition-colors duration-300 relative overflow-hidden">
      
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 dark:bg-primary/5 rounded-full filter blur-[120px] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Form Box */}
        <div className="rounded-3xl glass-card p-6 sm:p-10 border-2 border-primary/10 shadow-2xl relative">
          
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-accent bg-accent/10 mb-3">
              <PhoneCall className="w-3.5 h-3.5" />
              Easy Inquiry
            </span>
            <h2 className="text-3xl font-extrabold text-textDark dark:text-darkText leading-tight">
              Get a Free Quote — We'll Call You Back
            </h2>
            <p className="text-sm text-textDark/70 dark:text-darkText/60 mt-2 font-semibold">
              Fill out the form below, and our poultry chemical experts will call you within 24 hours to discuss custom solutions for your farm.
            </p>
          </div>

          {submitError && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/30 text-accent text-sm font-bold text-center">
              {submitError}
            </div>
          )}

          {/* Actual Lead Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Full Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-textDark dark:text-darkText flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-primary" /> Full Name <span className="text-accent">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Muhammad Ahmed"
                  {...register('name')}
                  className={`w-full px-4 py-3 rounded-xl border ${errors.name ? 'border-accent' : 'border-blue-100 dark:border-darkBorder'} bg-white dark:bg-darkCard text-sm text-textDark dark:text-darkText focus:ring-2 focus:ring-primary focus:outline-none transition-all`}
                />
                {errors.name && (
                  <p className="text-xs font-semibold text-accent">{errors.name.message}</p>
                )}
              </div>

              {/* Phone Number */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-textDark dark:text-darkText flex items-center gap-1.5">
                  <PhoneCall className="w-3.5 h-3.5 text-primary" /> Phone Number <span className="text-accent">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. 03226057885 or +923226057885"
                  {...register('phone')}
                  className={`w-full px-4 py-3 rounded-xl border ${errors.phone ? 'border-accent' : 'border-blue-100 dark:border-darkBorder'} bg-white dark:bg-darkCard text-sm text-textDark dark:text-darkText focus:ring-2 focus:ring-primary focus:outline-none transition-all`}
                />
                {errors.phone && (
                  <p className="text-xs font-semibold text-accent">{errors.phone.message}</p>
                )}
              </div>

              {/* City / District */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-textDark dark:text-darkText flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-primary" /> City / District <span className="text-accent">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Sargodha"
                  {...register('city')}
                  className={`w-full px-4 py-3 rounded-xl border ${errors.city ? 'border-accent' : 'border-blue-100 dark:border-darkBorder'} bg-white dark:bg-darkCard text-sm text-textDark dark:text-darkText focus:ring-2 focus:ring-primary focus:outline-none transition-all`}
                />
                {errors.city && (
                  <p className="text-xs font-semibold text-accent">{errors.city.message}</p>
                )}
              </div>

              {/* Farm Size */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-textDark dark:text-darkText flex items-center gap-1.5">
                  <Building className="w-3.5 h-3.5 text-primary" /> Farm Size (Capacity) <span className="text-accent">*</span>
                </label>
                <select
                  {...register('farmSize')}
                  className={`w-full px-4 py-3 rounded-xl border ${errors.farmSize ? 'border-accent' : 'border-blue-100 dark:border-darkBorder'} bg-white dark:bg-darkCard text-sm text-textDark dark:text-darkText focus:ring-2 focus:ring-primary focus:outline-none font-semibold`}
                >
                  <option value="Small">Small (under 10,000 birds)</option>
                  <option value="Medium">Medium (10,000–50,000 birds)</option>
                  <option value="Large">Large (50,000+ birds)</option>
                </select>
                {errors.farmSize && (
                  <p className="text-xs font-semibold text-accent">{errors.farmSize.message}</p>
                )}
              </div>

            </div>

            {/* Number of Pads */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-textDark dark:text-darkText flex items-center gap-1.5">
                <Hash className="w-3.5 h-3.5 text-primary" /> Total Number of Cooling Pads
              </label>
              <input
                type="number"
                placeholder="e.g. 12 (optional)"
                {...register('padCount')}
                className={`w-full px-4 py-3 rounded-xl border ${errors.padCount ? 'border-accent' : 'border-blue-100 dark:border-darkBorder'} bg-white dark:bg-darkCard text-sm text-textDark dark:text-darkText focus:ring-2 focus:ring-primary focus:outline-none transition-all`}
              />
              {errors.padCount && (
                <p className="text-xs font-semibold text-accent">{errors.padCount.message}</p>
              )}
            </div>

            {/* Message / Query */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-textDark dark:text-darkText flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-primary" /> Message / Query
              </label>
              <textarea
                rows="4"
                placeholder="Describe your cooling pad problems, or paste pond calculations here..."
                {...register('message')}
                className="w-full px-4 py-3 rounded-xl border border-blue-100 dark:border-darkBorder bg-white dark:bg-darkCard text-sm text-textDark dark:text-darkText focus:ring-2 focus:ring-primary focus:outline-none transition-all resize-none"
              ></textarea>
            </div>

            {/* Submit button with loader */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary w-full text-base py-3.5 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Processing Submission...
                </>
              ) : (
                <>
                  Send My Inquiry
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>

          </form>

        </div>
      </div>

      {/* Success Modal */}
      {submitSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="bg-white dark:bg-darkCard border border-blue-50 dark:border-darkBorder/40 rounded-3xl p-8 max-w-md w-full shadow-2xl text-center relative animate-scaleUp">
            
            <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <h3 className="text-2xl font-black text-textDark dark:text-darkText mb-3">
              Inquiry Sent!
            </h3>
            
            <p className="text-sm text-textDark/80 dark:text-darkText/70 leading-relaxed mb-6 font-semibold">
              Thank you! We have received your inquiry. Our poultry experts will call you back within <strong>24 hours</strong>.
            </p>

            <div className="space-y-3">
              {/* WhatsApp direct CTA */}
              <a
                href="https://wa.me/923226057885?text=Hi%20ECO%20Chemicals,%20I%20just%20submitted%20a%20quote%20request%20for%20Cleanex%20on%20your%20website.%20Please%20connect%20me."
                target="_blank"
                rel="noreferrer"
                className="w-full btn-accent bg-emerald-500 hover:bg-emerald-600 shadow-emerald-500/10 hover:shadow-emerald-500/30 flex items-center justify-center gap-2 py-3 rounded-xl"
              >
                <MessageSquare className="w-5 h-5 fill-current" />
                Contact on WhatsApp Now
              </a>

              <button
                onClick={() => setSubmitSuccess(false)}
                className="w-full py-3 rounded-xl border-2 border-gray-200 dark:border-darkBorder text-sm font-bold text-textDark/70 dark:text-darkText/75 hover:bg-gray-50 dark:hover:bg-darkCard transition-all"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};

export default LeadForm;
