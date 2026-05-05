/**
 * Google Sheets backend for the Ataboy Mother’s Day Workshop form.
 *
 * Setup:
 * 1. Create a Google Sheet named Ataboy Mothers Day Registrations.
 * 2. Extensions > Apps Script.
 * 3. Paste this file into Code.gs.
 * 4. Set SHEET_NAME below if needed.
 * 5. Deploy > New deployment > Web app.
 *    Execute as: Me
 *    Who has access: Anyone
 * 6. Copy the Web App URL into script.js.
 *
 * Optional HubSpot live sync:
 * Use Zapier/Make/HubSpot Operations Hub to watch new rows in this Sheet
 * and create/update contacts in HubSpot. Suggested mapping is in README.md.
 */
const SHEET_NAME = 'Registrations';

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);

  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);

    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
    }

    const payload = JSON.parse(e.postData.contents);
    const headers = [
      'submitted_at',
      'full_name',
      'email',
      'phone',
      'coming_with',
      'doing_this_for',
      'notes',
      'workshop',
      'source',
      'utm_source',
      'utm_medium',
      'utm_campaign',
      'page_url',
      'hubspot_sync_status'
    ];

    if (sheet.getLastRow() === 0) {
      sheet.appendRow(headers);
      sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
      sheet.setFrozenRows(1);
    }

    const row = headers.map((header) => header === 'hubspot_sync_status' ? 'pending' : (payload[header] || ''));
    sheet.appendRow(row);

    return ContentService
      .createTextOutput(JSON.stringify({ result: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'error', message: error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function doGet() {
  return ContentService
    .createTextOutput('Ataboy Mother’s Day registration backend is live.')
    .setMimeType(ContentService.MimeType.TEXT);
}
