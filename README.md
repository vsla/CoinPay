# Coinpay

A sleek, modern fintech onboarding and account setup flow. The app guides users from sign-up through verification with an intuitive, mobile-first UI—buttons, loaders, forms, and navigation are designed to feel clear and responsive.

## Screens showcased

- **Sign up & Create account** – Entry point with primary/secondary actions, then phone + password form with validation, password requirements, and navigation to the next step.
- **Personal info** – Full name, username, and date of birth with a date picker, inline validation, and back/continue navigation.
- **Welcome** – Post-setup congratulations screen with illustration and a primary “Continue” CTA.

Additional flows (verification code, country, address, email, ID scan, selfie, passcode) are implemented so you can walk the full journey; the three above highlight how UI components and navigation are used.

## UI components demonstrated

- **Buttons** – Primary, secondary, and outline variants; loading state (“Loading…”) on submit.
- **Loaders** – Spinner on verification-code send and during “Setting up account”.
- **Forms** – Formik + Yup validation, inline errors, touch-on-submit, and disabled/enabled submit based on flow.
- **Navigation** – Back arrow and step titles (e.g. “Account setup”, “Set pin”), progress bar on verification steps.

## Running the app

**Requirements:** Node 18+

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:5173)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

To test on a real device (e.g. phone) on the same network:

```bash
npm run dev:network
```

Then open the URL shown (e.g. `http://192.168.x.x:5173`) on the device. Camera on the selfie step requires HTTPS or `localhost`.

## Tech stack

- React 19, TypeScript, Vite  
- Tailwind CSS, Framer Motion  
- Formik, Yup  
- react-icons  

## Project structure

- `src/screens/` – Screen components (SignUp, AccountSetup, Verification, etc.)
- `src/components/ui/` – Reusable UI (Button, Input, PhoneInput, DatePickerModal, etc.)
- `src/components/layout/` – FormLayout, PageHeader, MobileContainer
- `src/routes.tsx` – Screen flow and layout wiring
- `src/utils/validationSchemas.ts` – Yup schemas for forms

## Tests

```bash
npm test
```

See `src/**/*.test.ts` and `src/**/*.test.tsx` for unit tests (validation, Button, routes).
