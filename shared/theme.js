(function () {
  const root = document.documentElement;
  const storageKey = "labs-theme";

  function applyTheme(theme) {
    if (theme === "dark") {
      root.setAttribute("data-theme", "dark");
    } else {
      root.removeAttribute("data-theme");
    }
  }

  function getCurrentTheme() {
    return root.getAttribute("data-theme") === "dark" ? "dark" : "light";
  }

  function getPreferredTheme() {
    const saved = localStorage.getItem(storageKey);
    if (saved) return saved;

    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }

    return "light";
  }

  document.addEventListener("DOMContentLoaded", function () {
    const toggleBtn = document.querySelector(".theme-toggle");
    const label = document.querySelector(".theme-label");

    applyTheme(getPreferredTheme());
    updateLabel();
    
// FIND THIS SECTION IN YOUR theme.js
if (toggleBtn) {
  toggleBtn.addEventListener("click", function () {
    const iconContainer = document.querySelector(".theme-icon-container"); // ADD THIS
    
    label.classList.add("fade");
    if (iconContainer) iconContainer.classList.add("fade"); // ADD THIS

    setTimeout(() => {
      const current = getCurrentTheme();
      const next = current === "dark" ? "light" : "dark";

      localStorage.setItem(storageKey, next);
      applyTheme(next);
      updateLabel();

      label.classList.remove("fade");
      if (iconContainer) iconContainer.classList.remove("fade"); // ADD THIS
    }, 150);
  });
}
    function updateLabel() {
      const current = getCurrentTheme();
      label.textContent = current === "dark" ? "Light" : "Dark";
    }
  });
})();

// ==========================================
// VISITOR COUNT LOGIC (Session-Cached for Labs)
// ==========================================
(async function () {
  const el = document.getElementById("visitCount");
  if (!el) return;

  try {
    // 1. Check if we already fetched and saved the count in this session
    const savedCount = sessionStorage.getItem("labs_visit_count");
    
    if (savedCount) {
      // Instantly show the saved count without talking to the server!
      el.textContent = savedCount;
      return;
    }

    // 2. If no saved count, hit the API to increase and get the new total
    const resp = await fetch("https://api.counterapi.dev/v1/drmjp93in/labs-visits/up");
    const j = await resp.json();

    if (j && j.count !== undefined) {
      let count = j.count;

      // Format large numbers
      if (count >= 1000) {
        count = Math.floor(count / 100) * 100 + "+";
      }

      // 3. Save it to memory so other pages load it instantly
      sessionStorage.setItem("labs_visit_count", count);
      el.textContent = count;
    } else {
      throw new Error("Invalid API response");
    }
  } catch (e) {
    console.error("Visitor count error:", e);
    el.textContent = "—";
  }
})();
