# AttendSmart — Public-hosting starter

AttendSmart is a responsive campus attendance UI and Node/Express + MongoDB API starter. This package includes a refreshed midnight-violet/mint design, a same-origin static web server, a Render deployment blueprint, environment templates, and an admin bootstrap script.

## Important deployment status

**This is deployable as a public demo/starter, not yet a production-ready campus records system.** The current browser UI still stores its demo users, students, attendance and sessions in that browser's `localStorage`; it does not automatically call the MongoDB API. Each visitor therefore has a separate local demo workspace. Do not enter real student information, real passwords, biometric data or confidential records in the demo UI. Before a real institution uses it, complete the frontend-to-API integration and the security checklist below.

## Included

- Student directory, student profiles, attendance register, sessions, reports and CSV export (browser demo).
- QR check-in, face verification demo, GPS demo, notification settings and student portal demo.
- Express API routes for staff/student authentication, student records, sessions, attendance, QR token check-in, reports and optional email/SMS.
- Helmet, rate limits on login routes, bcrypt password hashing, JWT authentication, invitation-code protected staff registration, and environment-based secrets.
- Render blueprint (`render.yaml`) to host the frontend and API from one Node service.

## Deploy publicly on Render + MongoDB Atlas

1. Create a MongoDB Atlas cluster and database user. Allow network access from your hosting provider (prefer provider outbound IP restrictions where supported; do not leave the database open to the whole internet for a real deployment). Copy the Atlas connection string.
2. Push the extracted `AttendSmart_Advanced` folder to a new GitHub repository. Do not commit `.env`, database passwords, invite codes or API secrets.
3. In Render, choose **New → Blueprint**, connect the repository, and let Render read `render.yaml`. The blueprint creates a Node web service.
4. Set the service environment variables: `MONGODB_URI`, `CAMPUS_LAT`, and `CAMPUS_LNG`. Render generates `JWT_SECRET` and `STAFF_INVITE_CODE` from the blueprint. Keep the invite code private.
5. Deploy. Open the Render service URL. Check `/api/health` and confirm it returns `{"ok":true,"service":"AttendSmart API"}`.
6. To create the first database administrator, set `ADMIN_NAME`, `ADMIN_EMAIL`, and `ADMIN_PASSWORD` (12+ characters) temporarily in the service shell/environment and run `npm run create-admin` from the `backend` directory. Remove those temporary admin bootstrap variables afterward.

### Manual Render setup (if not using the blueprint)

- Runtime: Node
- Root directory: `backend`
- Build command: `npm install`
- Start command: `npm start`
- Health check path: `/api/health`
- Add all required variables from `backend/.env.example`.

## Local development

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your MongoDB URL, JWT secret, staff invite code and campus coordinates
npm run dev
```

Open `http://localhost:5000`. The API health endpoint is `http://localhost:5000/api/health`. For local browser-only demo use, opening `index.html` through Live Server also works, but its data remains in localStorage.

## Staff registration

`POST /api/auth/register` requires `inviteCode` matching the server-only `STAFF_INVITE_CODE`. Do not expose this code in frontend JavaScript or public documentation. Use the `create-admin` script for the first administrator account.

## Before real campus use — mandatory work

- Replace demo/localStorage UI flows with API calls; store JWTs securely (prefer secure, HttpOnly, SameSite cookies rather than localStorage) and implement logout/session expiry.
- Add role-based permissions at route and record level, institution/tenant isolation, audit logs, password reset, account verification, backups and restore drills. Review every API route and validate/sanitize all request fields.
- Add CSRF protection if cookie authentication is adopted, strict CORS, request limits, monitoring and dependency/security updates.
- Make QR codes use short-lived server-issued tokens only; the current browser demo QR payload is not tamper-proof.
- Face recognition is a demonstration only. Do not make attendance or disciplinary decisions solely from face matching. Obtain informed consent, provide an equivalent non-biometric method, encrypt templates, define retention/deletion policies and complete applicable privacy/legal review.
- GPS is a signal, not proof of presence; it can be spoofed. Combine with appropriate institutional controls and provide a manual exception process.
- Configure and test SMTP/Twilio credentials, message consent, delivery failures and guardian-contact accuracy before enabling notifications.
- Replace example campus coordinates with the actual campus coordinates.

## Environment variables

See `backend/.env.example`. Never commit a real `.env` file.
# attendance
