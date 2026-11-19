import { useEffect, useMemo, useRef, useState, type FormEvent, type ReactNode } from 'react';
import { ArrowRight, CalendarDays, CheckCheck, Mail, MessageCircle, RotateCcw } from 'lucide-react';
import { rooms, sampleEmail, whatsappHref, type EnquiryDraft, type EnquiryTopic } from '../data';
import { todayISO } from '../utils';

interface EnquiryFormProps {
  draft: EnquiryDraft;
  draftNonce: number;
}

type FieldName =
  | 'fullName' | 'email' | 'phone' | 'checkIn' | 'checkOut'
  | 'adults' | 'children' | 'room' | 'topic' | 'message';

type FieldElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
type FormValues = Record<FieldName, string>;
type Errors = Partial<Record<FieldName, string>>;

const EMPTY_VALUES: FormValues = {
  fullName: '',
  email: '',
  phone: '',
  checkIn: '',
  checkOut: '',
  adults: '2',
  children: '0',
  room: 'No preference',
  topic: 'Leisure stay',
  message: '',
};

const FIELD_ORDER: FieldName[] = [
  'fullName', 'email', 'phone', 'checkIn', 'checkOut', 'adults', 'children', 'room', 'topic', 'message',
];

const topics: EnquiryTopic[] = ['Leisure stay', 'Business stay', 'Dining', 'Nearby guide', 'General enquiry'];

function validate(values: FormValues): Errors {
  const errors: Errors = {};
  const today = todayISO();
  const name = values.fullName.trim();

  if (name.length < 2) errors.fullName = 'Enter your name (at least 2 characters).';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) errors.email = 'Enter a valid email address.';
  if (values.phone.trim() && !/^[+()\d\s-]{7,}$/.test(values.phone.trim())) {
    errors.phone = 'Use digits, spaces, +, () or - only (at least 7 characters).';
  }
  if (!values.checkIn) {
    errors.checkIn = 'Choose a check-in date.';
  } else if (values.checkIn < today) {
    errors.checkIn = 'Check-in cannot be in the past.';
  }
  if (!values.checkOut) {
    errors.checkOut = 'Choose a check-out date.';
  } else if (values.checkIn && values.checkOut <= values.checkIn) {
    errors.checkOut = 'Check-out must be after check-in.';
  }

  const adults = Number(values.adults);
  const children = Number(values.children);
  if (!Number.isInteger(adults) || adults < 1 || adults > 6) errors.adults = 'Choose between 1 and 6 adults.';
  if (!Number.isInteger(children) || children < 0 || children > 4) errors.children = 'Choose between 0 and 4 children.';
  if (adults + children > 6) errors.children = 'Sample capacity is 6 guests in total.';
  if (values.message.length > 500) errors.message = 'Keep the message under 500 characters.';
  return errors;
}

interface FieldShellProps {
  label: string;
  htmlFor: string;
  error?: string;
  hint?: string;
  children: ReactNode;
}

function FieldShell({ label, htmlFor, error, hint, children }: FieldShellProps) {
  return (
    <div className={error ? 'field has-error' : 'field'}>
      <label htmlFor={htmlFor}>{label}</label>
      {children}
      {hint && !error && <span className="field-hint" id={`${htmlFor}-hint`}>{hint}</span>}
      {error && <span className="form-error" id={`${htmlFor}-error`} role="alert">{error}</span>}
    </div>
  );
}

export default function EnquiryForm({ draft, draftNonce }: EnquiryFormProps) {
  const [values, setValues] = useState<FormValues>(EMPTY_VALUES);
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [success, setSuccess] = useState<FormValues | null>(null);
  const fieldRefs = useRef<Partial<Record<FieldName, FieldElement | null>>>({});
  const minDate = todayISO();
  const errors = useMemo(() => validate(values), [values]);

  useEffect(() => {
    if (draftNonce === 0) return;
    setValues({
      ...EMPTY_VALUES,
      fullName: draft.fullName ?? '',
      email: draft.email ?? '',
      phone: draft.phone ?? '',
      checkIn: draft.checkIn ?? '',
      checkOut: draft.checkOut ?? '',
      adults: draft.adults ?? '2',
      children: draft.children ?? '0',
      room: draft.room ?? 'No preference',
      topic: draft.topic ?? 'Leisure stay',
      message: draft.message ?? '',
    });
    setTouched({});
    setSubmitted(false);
    setSuccess(null);
  }, [draft, draftNonce]);

  const setField = (name: FieldName, value: string) => setValues((current) => ({ ...current, [name]: value }));
  const blur = (name: FieldName) => setTouched((current) => ({ ...current, [name]: true }));
  const errorFor = (name: FieldName) => (touched[name] || submitted ? errors[name] : undefined);
  const describedBy = (name: FieldName, hasHint: boolean) => {
    const ids: string[] = [];
    if (hasHint && !errorFor(name)) ids.push(`${name}-hint`);
    if (errorFor(name)) ids.push(`${name}-error`);
    return ids.length ? ids.join(' ') : undefined;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    const currentErrors = validate(values);
    const firstInvalid = FIELD_ORDER.find((name) => currentErrors[name]);
    if (firstInvalid) {
      fieldRefs.current[firstInvalid]?.focus();
      return;
    }
    setSuccess({ ...values });
  };

  const reset = () => {
    setValues(EMPTY_VALUES);
    setTouched({});
    setSubmitted(false);
    setSuccess(null);
    fieldRefs.current.fullName?.focus();
  };

  return (
    <section className="section contact-section" id="contact" aria-labelledby="contact-title">
      <div className="wrap contact-grid">
        <div className="contact-aside">
          <p className="eyebrow"><span className="eyebrow-rule" aria-hidden="true" /> 08 / Contact</p>
          <h2 id="contact-title">Tell us what<br /><span className="display-accent">you have in mind.</span></h2>
          <p className="section-intro">
            Use this sample enquiry to try the validation flow. Nothing is sent anywhere and no booking,
            payment or availability check is performed.
          </p>

          <div className="contact-direct">
            <h3>Direct lines</h3>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Demo WhatsApp link — replace with client number"
            >
              <MessageCircle size={18} aria-hidden="true" />
              <span><strong>WhatsApp</strong><small>Demo link — replace with client number</small></span>
            </a>
            <a href={`mailto:${sampleEmail}`} aria-label="Sample email address — replace with client address">
              <Mail size={18} aria-hidden="true" />
              <span><strong>Email</strong><small>{sampleEmail} · sample</small></span>
            </a>
          </div>

          <div className="contact-note">
            <CheckCheck size={19} aria-hidden="true" />
            <p>Demo concept — sample information. Replace all contact details, rates and policies before launch.</p>
          </div>
        </div>

        <div className="form-card">
          {success ? (
            <div className="success-panel" role="status">
              <span className="success-icon"><CheckCheck size={30} aria-hidden="true" /></span>
              <h3>Enquiry captured in this demo</h3>
              <p className="success-required">
                Demo enquiry received — no real booking/payment is made. Replace this demo flow with your client's confirmed process before launch.
              </p>
              <dl className="success-summary">
                <div><dt>Name</dt><dd>{success.fullName}</dd></div>
                <div><dt>Email</dt><dd>{success.email}</dd></div>
                {success.checkIn && <div><dt>Check in</dt><dd>{success.checkIn}</dd></div>}
                {success.checkOut && <div><dt>Check out</dt><dd>{success.checkOut}</dd></div>}
                <div><dt>Guests</dt><dd>{success.adults} adults, {success.children} children</dd></div>
                <div><dt>Interest</dt><dd>{success.topic}{success.room !== 'No preference' ? ` · ${success.room}` : ''}</dd></div>
              </dl>
              <button type="button" className="btn btn-primary" onClick={reset}>
                <RotateCcw size={17} aria-hidden="true" /> Send another enquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <div className="form-card-head">
                <h3>Enquiry form</h3>
                <p>All fields marked * are required. Sample flow only.</p>
              </div>

              <div className="form-grid">
                <FieldShell label="Full name *" htmlFor="fullName" error={errorFor('fullName')}>
                  <input
                    id="fullName" name="fullName" type="text" autoComplete="name" placeholder="Your name"
                    value={values.fullName} onChange={(e) => setField('fullName', e.target.value)}
                    onBlur={() => blur('fullName')}
                    aria-invalid={Boolean(errorFor('fullName'))}
                    aria-describedby={describedBy('fullName', false)}
                    ref={(element) => { fieldRefs.current.fullName = element; }}
                  />
                </FieldShell>

                <FieldShell label="Email *" htmlFor="email" error={errorFor('email')}>
                  <input
                    id="email" name="email" type="email" autoComplete="email" placeholder="you@example.com"
                    value={values.email} onChange={(e) => setField('email', e.target.value)}
                    onBlur={() => blur('email')}
                    aria-invalid={Boolean(errorFor('email'))}
                    aria-describedby={describedBy('email', false)}
                    ref={(element) => { fieldRefs.current.email = element; }}
                  />
                </FieldShell>

                <FieldShell label="Phone (optional)" htmlFor="phone" error={errorFor('phone')} hint="Digits, spaces and + ( ) - only.">
                  <input
                    id="phone" name="phone" type="tel" autoComplete="tel" placeholder="Optional"
                    value={values.phone} onChange={(e) => setField('phone', e.target.value)}
                    onBlur={() => blur('phone')}
                    aria-invalid={Boolean(errorFor('phone'))}
                    aria-describedby={describedBy('phone', true)}
                    ref={(element) => { fieldRefs.current.phone = element; }}
                  />
                </FieldShell>

                <FieldShell label="Room interest" htmlFor="room">
                  <select
                    id="room" name="room" value={values.room} onChange={(e) => setField('room', e.target.value)}
                    ref={(element) => { fieldRefs.current.room = element; }}
                  >
                    <option>No preference</option>
                    {rooms.map((room) => <option key={room.id}>{room.name}</option>)}
                  </select>
                </FieldShell>

                <FieldShell label="Check in *" htmlFor="checkIn" error={errorFor('checkIn')}>
                  <input
                    id="checkIn" name="checkIn" type="date" autoComplete="off" min={minDate}
                    value={values.checkIn} onChange={(e) => setField('checkIn', e.target.value)}
                    onBlur={() => blur('checkIn')}
                    aria-invalid={Boolean(errorFor('checkIn'))}
                    aria-describedby={describedBy('checkIn', false)}
                    ref={(element) => { fieldRefs.current.checkIn = element; }}
                  />
                </FieldShell>

                <FieldShell label="Check out *" htmlFor="checkOut" error={errorFor('checkOut')}>
                  <input
                    id="checkOut" name="checkOut" type="date" autoComplete="off" min={values.checkIn || minDate}
                    value={values.checkOut} onChange={(e) => setField('checkOut', e.target.value)}
                    onBlur={() => blur('checkOut')}
                    aria-invalid={Boolean(errorFor('checkOut'))}
                    aria-describedby={describedBy('checkOut', false)}
                    ref={(element) => { fieldRefs.current.checkOut = element; }}
                  />
                </FieldShell>

                <FieldShell label="Adults *" htmlFor="adults" error={errorFor('adults')}>
                  <select
                    id="adults" name="adults" value={values.adults} onChange={(e) => setField('adults', e.target.value)}
                    onBlur={() => blur('adults')}
                    aria-invalid={Boolean(errorFor('adults'))}
                    aria-describedby={describedBy('adults', false)}
                    ref={(element) => { fieldRefs.current.adults = element; }}
                  >
                    {[1, 2, 3, 4, 5, 6].map((count) => <option value={count} key={count}>{count}</option>)}
                  </select>
                </FieldShell>

                <FieldShell label="Children" htmlFor="children" error={errorFor('children')} hint="Sample capacity: 6 guests in total.">
                  <select
                    id="children" name="children" value={values.children} onChange={(e) => setField('children', e.target.value)}
                    onBlur={() => blur('children')}
                    aria-invalid={Boolean(errorFor('children'))}
                    aria-describedby={describedBy('children', true)}
                    ref={(element) => { fieldRefs.current.children = element; }}
                  >
                    {[0, 1, 2, 3, 4].map((count) => <option value={count} key={count}>{count}</option>)}
                  </select>
                </FieldShell>

                <div className="field field-full">
                  <label htmlFor="topic">What is this about?</label>
                  <select
                    id="topic" name="topic" value={values.topic} onChange={(e) => setField('topic', e.target.value)}
                    ref={(element) => { fieldRefs.current.topic = element; }}
                  >
                    {topics.map((topic) => <option key={topic}>{topic}</option>)}
                  </select>
                </div>

                <div className={errorFor('message') ? 'field field-full has-error' : 'field field-full'}>
                  <label htmlFor="message">Message (optional)</label>
                  <textarea
                    id="message" name="message" rows={4} maxLength={500}
                    placeholder="Anything we should know for this sample enquiry?"
                    value={values.message} onChange={(e) => setField('message', e.target.value)}
                    onBlur={() => blur('message')}
                    aria-invalid={Boolean(errorFor('message'))}
                    aria-describedby={describedBy('message', false)}
                    ref={(element) => { fieldRefs.current.message = element; }}
                  />
                  {errorFor('message') && <span className="form-error" id="message-error" role="alert">{errorFor('message')}</span>}
                  <span className="field-hint">{values.message.length}/500 characters</span>
                </div>
              </div>

              <div className="form-submit">
                <p><CalendarDays size={16} aria-hidden="true" /> Dates are used for this demo only.</p>
                <button type="submit" className="btn btn-primary">Send demo enquiry <ArrowRight size={18} aria-hidden="true" /></button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
