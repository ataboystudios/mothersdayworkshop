# Ataboy Mother’s Day Workshop Landing Page

This package includes:

- `index.html` — landing page and form
- `styles.css` — Ataboy-inspired visual styling
- `script.js` — sends registrations to Google Sheets
- `google-apps-script.js` — backend for Google Sheets

## Fast setup

### 1. Edit event details

In `index.html`, replace:

- `May XX`
- `XX:XX AM – XX:XX PM`
- `Ataboy Studios / TBD`
- Any copy you want to tweak

### 2. Replace images

The page currently uses Unsplash placeholders inside `styles.css`:

- `.photo-a`
- `.photo-b`
- `.photo-c`

Replace those background-image URLs with your own hosted images.

### 3. Set up the live spreadsheet backend

1. Create a new Google Sheet called `Ataboy Mothers Day Registrations`.
2. Rename the first tab to `Registrations`.
3. Go to `Extensions > Apps Script`.
4. Delete the starter code.
5. Paste the contents of `google-apps-script.js`.
6. Click `Deploy > New deployment`.
7. Select `Web app`.
8. Set:
   - Execute as: `Me`
   - Who has access: `Anyone`
9. Click Deploy.
10. Copy the Web App URL.
11. In `script.js`, replace:

```js
const GOOGLE_APPS_SCRIPT_URL = "PASTE_YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE";
```

with your Web App URL.

### 4. Upload the site

You can upload these files to:

- Webflow custom code/embed page
- Netlify
- Vercel
- Squarespace custom code
- Any basic web host

For Webflow, the easiest method is:

1. Create a blank page.
2. Add an Embed element.
3. Paste the body content from `index.html`.
4. Add the CSS from `styles.css` inside Page Settings > Custom Code > Head Code using `<style>...</style>`.
5. Add the JavaScript from `script.js` before `</body>` using `<script>...</script>`.

For cleaner Webflow editing, rebuild the sections visually using the structure in the HTML and keep only the form JavaScript as custom code.

## HubSpot live sync options

### Recommended: Google Sheets to HubSpot using Zapier or Make

Trigger:

- New Spreadsheet Row in Google Sheets

Action:

- Create or Update Contact in HubSpot

Suggested field mapping:

| Google Sheet Column | HubSpot Property |
|---|---|
| full_name | First Name / Last Name, or Full Name custom property |
| email | Email |
| phone | Phone Number |
| coming_with | Custom property: Coming With |
| doing_this_for | Custom property: Workshop Note |
| notes | Notes / Custom property |
| workshop | Custom property: Workshop Name |
| source | Original Source Drill-Down / Custom property |
| utm_source | UTM Source |
| utm_medium | UTM Medium |
| utm_campaign | UTM Campaign |

After the Zap/Scenario succeeds, optionally update `hubspot_sync_status` to `synced`.

### Alternative: HubSpot native form

If you want HubSpot to be the source of truth, create a HubSpot form with matching fields and embed it in place of this form. That is the cleanest CRM-native route, but gives you less control over the custom Ataboy form styling.

## Notes

- Google Sheets can be downloaded as Excel anytime.
- If you need a literal `.xlsx` file staying current, use Microsoft Forms + Excel Online + Power Automate instead of Google Apps Script.
- This version prioritizes simple deployment and reliable live collection.
