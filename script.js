// 1) Deploy the included google-apps-script.js as a Web App.
// 2) Paste the Web App URL below.
const GOOGLE_APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxEhPaDPDoWdMYCOyCS2-5TgsuyZqO5GYkzllQ3bf8QRAQvoA7BKwQXW6088guiRqdN/exec";

const form = document.getElementById("workshopForm");
const statusEl = document.getElementById("formStatus");

const params = new URLSearchParams(window.location.search);
["utm_source", "utm_medium", "utm_campaign"].forEach((key) => {
  const input = document.getElementById(key);
  if (input) input.value = params.get(key) || "";
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  statusEl.textContent = "Saving your spot…";

  if (!GOOGLE_APPS_SCRIPT_URL || GOOGLE_APPS_SCRIPT_URL.includes("PASTE_YOUR")) {
    statusEl.textContent = "Form is designed, but the backend URL still needs to be added in script.js.";
    return;
  }

  const submitButton = form.querySelector("button[type='submit']");
  submitButton.disabled = true;

  const data = Object.fromEntries(new FormData(form).entries());
  data.submitted_at = new Date().toISOString();
  data.page_url = window.location.href;

  try {
    const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(data),
    });

    form.reset();
    statusEl.textContent = "You’re in. Good call. We’ll send the details shortly.";
  } catch (error) {
    statusEl.textContent = "Something glitched. Please try again or email us directly.";
  } finally {
    submitButton.disabled = false;
  }
});
