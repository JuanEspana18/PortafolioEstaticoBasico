(function () {
  "use strict";

  const THEME_KEY = "portfolio-theme";
  const LANG_KEY = "portfolio-lang";

  const translations = {
    es: window.PORTFOLIO_LANG_ES || {},
    en: window.PORTFOLIO_LANG_EN || {},
  };

  function getStoredTheme() {
    return localStorage.getItem(THEME_KEY);
  }

  function updateThemeIcon() {
    const lang = localStorage.getItem(LANG_KEY) === "en" ? "en" : "es";
    const dict = translations[lang];
    const btn = document.getElementById("theme-toggle");
    const icon = document.getElementById("theme-toggle-icon");
    if (!btn || !icon || !dict) return;

    const isDark = document.body.classList.contains("dark-theme");
    if (isDark) {
      icon.className = "bi bi-sun-fill";
      btn.setAttribute("aria-label", dict.theme_aria_to_light);
    } else {
      icon.className = "bi bi-moon-fill";
      btn.setAttribute("aria-label", dict.theme_aria_to_dark);
    }
  }

  function setTheme(dark) {
    if (dark) {
      document.body.classList.add("dark-theme");
    } else {
      document.body.classList.remove("dark-theme");
    }
    localStorage.setItem(THEME_KEY, dark ? "dark" : "light");
    updateThemeIcon();
  }

  function initTheme() {
    const stored = getStoredTheme();
    if (stored === "dark") {
      setTheme(true);
    } else if (stored === "light") {
      setTheme(false);
    } else {
      // Tema por defecto: oscuro la primera vez
      setTheme(true);
    }
  }

  function toggleTheme() {
    setTheme(!document.body.classList.contains("dark-theme"));
  }

  function applyLanguage(lang) {
    const dict = translations[lang];
    if (!dict) return;

    document.documentElement.lang = dict.html_lang;

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      const key = el.getAttribute("data-i18n");
      if (dict[key] !== undefined) {
        el.textContent = dict[key];
      }
    });

    const cvBtn = document.getElementById("btn-cv");
    if (cvBtn && dict.cv_href) {
      cvBtn.setAttribute("href", dict.cv_href);
      if (dict.cv_download) {
        cvBtn.setAttribute("download", dict.cv_download);
      }
    }

    document.getElementById("lang-es").classList.toggle("active", lang === "es");
    document.getElementById("lang-en").classList.toggle("active", lang === "en");
    document.getElementById("lang-es").setAttribute("aria-pressed", lang === "es" ? "true" : "false");
    document.getElementById("lang-en").setAttribute("aria-pressed", lang === "en" ? "true" : "false");

    localStorage.setItem(LANG_KEY, lang);
    updateThemeIcon();
  }

  function initLanguage() {
    const stored = localStorage.getItem(LANG_KEY);
    const lang = stored === "en" ? "en" : "es";
    applyLanguage(lang);
  }

  document.getElementById("theme-toggle").addEventListener("click", toggleTheme);
  document.getElementById("lang-es").addEventListener("click", function () {
    applyLanguage("es");
  });
  document.getElementById("lang-en").addEventListener("click", function () {
    applyLanguage("en");
  });

  initTheme();
  initLanguage();
})();
