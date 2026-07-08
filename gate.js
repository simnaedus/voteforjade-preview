// Simple review gate - keeps casual visitors out; not real security.
(function () {
  var HASH = "86de846f9009b629cae1705c4ef32e290094f9e43a3de501ba02189e2ca437a8";
  async function sha256(s) {
    var buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s));
    return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, "0")).join("");
  }
  if (sessionStorage.getItem("jc_gate") === HASH) return;
  document.documentElement.style.visibility = "hidden";
  window.addEventListener("DOMContentLoaded", async function () {
    var ok = false;
    while (!ok) {
      var input = prompt("This draft is for campaign review only.\nEnter the review password:");
      if (input === null) { document.body.innerHTML = "<p style='font-family:sans-serif;text-align:center;margin-top:20vh'>Access restricted.</p>"; document.documentElement.style.visibility = "visible"; return; }
      if (await sha256(input.trim()) === HASH) ok = true;
    }
    sessionStorage.setItem("jc_gate", HASH);
    document.documentElement.style.visibility = "visible";
  });
})();
