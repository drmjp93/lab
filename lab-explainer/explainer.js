document.addEventListener("DOMContentLoaded", () => {
  // --- CATEGORIES ---
  const categories = [
    { id: "dm", en: "Diabetes (Known Case)", gu: "ડાયાબિટીસ (જૂની બીમારી)" },
    { id: "thyroid", en: "Thyroid (New Checkup)", gu: "થાઇરોઇડ (નવું ચેકઅપ)" }
  ];

  // --- SCENARIO DATA & LOGIC ---
  const scenarios = [
    // Diabetes
    { 
      id: "dm1", cat: "dm", 
      en_pill: "Pre-Op Fitness + On Meds + RBS > 200", 
      gu_pill: "ઓપરેશન પહેલાનું ચેકઅપ + દવા ચાલુ છે + RBS ૨૦૦ થી વધારે", 
      en_action: "Do HbA1c Report.", 
      gu_action: "HbA1c રિપોર્ટ કરાવો.",
      type: "test" 
    },
    { 
      id: "dm2", cat: "dm", 
      en_pill: "On Meds + RBS < 200", 
      gu_pill: "દવા ચાલુ છે + RBS ૨૦૦ થી ઓછું", 
      en_action: "No reports to do yet. Send to Doctor.", 
      gu_action: "અત્યારે કોઈ રિપોર્ટની જરૂર નથી. પેશન્ટને ડૉક્ટર પાસે મોકલો.",
      type: "doctor" 
    },
    { 
      id: "dm3", cat: "dm", 
      en_pill: "No Medications taken currently", 
      gu_pill: "ડાયાબિટીસ છે પણ હાલ દવા બંધ છે / લેતા નથી", 
      en_action: "Do HbA1c Report.", 
      gu_action: "HbA1c રિપોર્ટ કરાવો.",
      type: "test" 
    },
    { 
      id: "dm4", cat: "dm", 
      en_pill: "Routine Follow-up + On Meds", 
      gu_pill: "રૂટીન ફોલો-અપ + દવા ચાલુ છે", 
      en_action: "Do HbA1c. (Also do Lipid Profile if mentioned by Doctor).", 
      gu_action: "HbA1c રિપોર્ટ કરાવો. (જો ડૉક્ટરે કીધું હોય તો લિપિડ પ્રોફાઇલ પણ કરાવો).",
      type: "test" 
    },

    // Thyroid
    { 
      id: "th1", cat: "thyroid", 
      en_pill: "Wants new Thyroid checkup (Not KCO)", 
      gu_pill: "નવું થાઇરોઇડ ચેકઅપ કરાવવું છે", 
      en_action: "Do TSH, FT3, and FT4.", 
      gu_action: "TSH, FT3, અને FT4 રિપોર્ટ કરાવો.",
      type: "test" 
    },
    { 
      id: "th2", cat: "thyroid", 
      en_pill: "TSH report is LOW", 
      gu_pill: "TSH નો રિપોર્ટ ઓછો (Low) આવ્યો છે", 
      en_action: "Do FT3 and FT4. (Fasting sample is NOT required).", 
      gu_action: "FT3 અને FT4 રિપોર્ટ કરાવો. (ભૂખ્યા પેટે સેમ્પલ આપવું જરૂરી નથી).",
      type: "test" 
    },
    { 
      id: "th3", cat: "thyroid", 
      en_pill: "TSH report is HIGH", 
      gu_pill: "TSH નો રિપોર્ટ વધારે (High) આવ્યો છે", 
      en_action: "No need to do FT3/FT4 at present. Send to Doctor for interpretation.", 
      gu_action: "અત્યારે FT3/FT4 રિપોર્ટ કરવાની જરૂર નથી. રિપોર્ટ ડૉક્ટરને બતાવો.",
      type: "doctor" 
    }
  ];

  let currentLang = localStorage.getItem("explainer-lang") || "en";
  let selectedId = null; // Only one selection allowed at a time

  // --- UI ELEMENTS ---
  const langToggle = document.getElementById("lang-toggle");
  const langLabel = document.getElementById("lang-label");
  const gridContainer = document.getElementById("scenarios-grid");
  const resultCard = document.getElementById("result-card");
  const resultTitle = document.getElementById("result-title");
  const resultAction = document.getElementById("result-action");

  // --- LANGUAGE LOGIC ---
  function updateLanguage() {
    langLabel.classList.add("fade");
    
    setTimeout(() => {
      langLabel.textContent = currentLang === "en" ? "ENG / ગુજ" : "ગુજ / ENG";
      document.getElementById("page-title").textContent = currentLang === "en" ? "Lab Investigation Guide" : "લેબ રિપોર્ટ માર્ગદર્શિકા";
      document.getElementById("page-subtitle").textContent = currentLang === "en" ? "Tap a patient scenario to see next steps" : "દર્દીની પરિસ્થિતિ પસંદ કરી આગળની સૂચના જુઓ";
      
      renderScenarios();
      updateResult();
      langLabel.classList.remove("fade");
    }, 150);
  }

  langToggle.addEventListener("click", () => {
    currentLang = currentLang === "en" ? "gu" : "en";
    localStorage.setItem("explainer-lang", currentLang);
    updateLanguage();
  });

  // --- RENDER SCENARIOS ---
  function renderScenarios() {
    gridContainer.innerHTML = "";
    
    categories.forEach(cat => {
      const catScenarios = scenarios.filter(s => s.cat === cat.id);
      if (catScenarios.length === 0) return;

      const groupDiv = document.createElement("div");
      groupDiv.className = "category-card";
      
      const title = document.createElement("div");
      title.className = "category-title";
      title.textContent = currentLang === "en" ? cat.en : cat.gu;
      groupDiv.appendChild(title);

      const pillWrap = document.createElement("div");
      pillWrap.className = "pill-wrap";

      catScenarios.forEach(scen => {
        const pill = document.createElement("div");
        pill.className = `scenario-pill ${selectedId === scen.id ? "selected" : ""}`;
        pill.textContent = currentLang === "en" ? scen.en_pill : scen.gu_pill;
        
        pill.addEventListener("click", () => {
          // Toggle logic: click again to deselect, or select new
          selectedId = selectedId === scen.id ? null : scen.id;
          renderScenarios(); // Re-render to update classes
          updateResult();
        });
        pillWrap.appendChild(pill);
      });

      groupDiv.appendChild(pillWrap);
      gridContainer.appendChild(groupDiv);
    });
  }

  // --- RESULT LOGIC ---
  function updateResult() {
    if (!selectedId) {
      resultTitle.textContent = currentLang === "en" ? "Select Scenario" : "પરિસ્થિતિ પસંદ કરો";
      resultAction.textContent = currentLang === "en" ? "Tap on a patient situation below to generate instructions." : "સૂચના જોવા માટે નીચેથી કોઈ એક વિકલ્પ પસંદ કરો.";
      resultCard.classList.remove("active-test", "active-doctor");
      return;
    }

    const activeScen = scenarios.find(s => s.id === selectedId);
    
    resultTitle.textContent = currentLang === "en" ? "Instructions / શું કરવું?" : "આગળની સૂચના (Action)";
    resultAction.textContent = currentLang === "en" ? activeScen.en_action : activeScen.gu_action;

    // Change banner color based on action type
    resultCard.classList.remove("active-test", "active-doctor");
    if (activeScen.type === "test") {
      resultCard.classList.add("active-test");
    } else if (activeScen.type === "doctor") {
      resultCard.classList.add("active-doctor");
    }
  }

  // Initialize
  updateLanguage();
});
