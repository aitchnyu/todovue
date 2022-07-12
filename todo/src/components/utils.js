export class Todo {
  title = "";
  isCompleted = false;
  id = null;

  constructor(title) {
    this.title = title;
    this.id = Date.now(); // This generates monotonically increasing id
  }
}

export function escapeXss(untrustedString) {
  // From https://cheatsheetseries.owasp.org/cheatsheets/DOM_based_XSS_Prevention_Cheat_Sheet.html#rule-6-populate-the-dom-using-safe-javascript-functions-or-properties
  const elem = document.createElement("span");
  elem.textContent = untrustedString;
  return elem.innerHTML;
}
