# OmniTech Vercel Deployment & Production Runbook

## 1. Live Production Details
- **Production URL**: `https://omni-tech-three.vercel.app/`
- **GitHub Remote**: `git@github.com:SirTebz/OmniTech.git`
- **Branch**: `main`

## 2. Environment Variables Configuration
To enable full email dispatch via Resend on production, set the following environment variables in the Vercel Project Dashboard:

| Variable Name | Required | Description | Default Fallback |
| :--- | :--- | :--- | :--- |
| `NEXT_PUBLIC_SITE_URL` | Optional | Canonical site base URL | `https://omni-tech-three.vercel.app` |
| `RESEND_API_KEY` | Optional | Resend API Key for dispatching email | Server-side safe fallback logging |
| `CONTACT_RECEIVER_EMAIL` | Optional | Destination email for contact enquiries | `sirtebz.z@gmail.com` |
| `EMAIL_FROM` | Optional | Verified sender email address in Resend | `OmniTech Inquiries <inquiries@omnitech.dev>` |

## 3. Production Build Command
- **Framework Preset**: Next.js
- **Build Command**: `next build`
- **Output Directory**: `.next`
- **Node.js Version**: 20.x or 22.x
