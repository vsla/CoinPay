# CoinPay

A fintech onboarding and account setup flow—sleek, modern, intuitive, and mobile-first. Built as a take-home exercise (React Web, 2–3 screens + navigation, UI components) aligned to the provided Figma design.

---

## Try it (live)

**Live app (mobile-friendly):**  
[https://coin-pay.vercel.app/](https://coin-pay.vercel.app/)

Open the link above to test the flow on any device. Best experienced in a mobile viewport or on a phone.

---

## What’s included

- **2–3 main screens** from the design: Sign up → Create account → Personal info → Welcome (plus supporting steps so you can walk the full journey).
- **Navigation** between multiple pages (back, continue, step-based flow).
- **UI components:** buttons (primary, secondary, outline + loading state), loaders, forms with validation, progress indicator, date picker, country/phone inputs.
- **Mobile-only layout** as per the Figma; desktop is optional and not the focus.
- **React Web** (Vite + TypeScript), pixel-accurate to the design system where applicable.

---

## Screens showcased

| Screen | What you’ll see |
|--------|------------------|
| **Sign up & Create account** | Entry actions, phone + password form, validation, password requirements, navigation to next step. |
| **Personal info** | Full name, username, date of birth (date picker), validation, back/continue. |
| **Welcome** | Post-setup congratulations with illustration and primary CTA. |

Additional steps (verification code, country, address, email, ID scan, selfie, passcode) are implemented so you can test the full flow; the three above are the main showcase.

---

## UI components demonstrated

- **Buttons** – Primary, secondary, outline; loading state (“Loading…”) on submit.
- **Loaders** – Spinner on verification send and on “Setting up account”.
- **Forms** – Formik + Yup, inline errors, touch-on-submit, disabled/enabled submit.
- **Navigation** – Back arrow, step titles (e.g. “Account setup”, “Set pin”), progress bar on verification.

---

## How to run locally

**Requirements:** Node 18+

```bash
# Install dependencies
npm install

# Start dev server → http://localhost:5173
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

**Test on a real device (same network):**

```bash
npm run dev:network
```

Then open the URL shown (e.g. `http://192.168.x.x:5173`) on your phone. Camera on the selfie step needs HTTPS or `localhost`.

---

## Tech stack

- React 19, TypeScript, Vite  
- Tailwind CSS, Framer Motion  
- Formik, Yup  
- react-icons, react-router-dom  

---

## Project structure

| Path | Purpose |
|------|--------|
| `src/screens/` | Screen components (SignUp, AccountSetup, Verification, Welcome, etc.) |
| `src/components/ui/` | Reusable UI (Button, Input, PhoneInput, DatePickerModal, Loader, etc.) |
| `src/components/layout/` | FormLayout, PageHeader, MobileContainer |
| `src/routes.tsx` | Screen flow and layout wiring |
| `src/utils/validationSchemas.ts` | Yup schemas for forms |

---

## Tests

```bash
npm test
```

Unit tests live in `src/**/*.test.ts` and `src/**/*.test.tsx` (validation, Button, routes).
