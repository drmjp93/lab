document.addEventListener("DOMContentLoaded", () => {
  const categories = [
    { id: "chest", en: "Chest & Respiratory", gu: "છાતી અને શ્વાસ" },
    { id: "gen", en: "General & Vitals", gu: "સામાન્ય અને વાઈટલ્સ" },
    { id: "neuro", en: "Brain & Nerves", gu: "મગજ અને ચેતા" },
    { id: "gastro", en: "Stomach & Digestion", gu: "પેટ અને પાચન" },
    { id: "ortho", en: "Injuries & Ortho", gu: "ઈજા અને હાડકાં" },
    { id: "other", en: "Other Specialties", gu: "અન્ય વિભાગો" }
  ];

  const symptoms = [
    // Chest
    { id: "s1", cat: "chest", gu: "છાતીમાં દુખાવો", en: "Chest Pain", dept: "EMERGENCY ROOM", isEr: true },
    { id: "s15", cat: "chest", gu: "શ્વાસ લેવામાં તકલીફ", en: "Difficulty Breathing", dept: "EMERGENCY ROOM", isEr: true },
    { id: "s17", cat: "chest", gu: "ચાલવામાં છાતીમાં દુખે", en: "Chest Pain on Walking", dept: "EMERGENCY ROOM", isEr: true },
    { id: "s2", cat: "chest", gu: "શરદી", en: "Cold", dept: "General Medicine", isEr: false },
    { id: "s3", cat: "chest", gu: "ખાંસી", en: "Cough", dept: "General Medicine", isEr: false },

    // Gen & Vitals
    { id: "s14", cat: "gen", gu: "બહુ વધારે તાવ", en: "High Fever", dept: "EMERGENCY ROOM", isEr: true },
    { id: "s4", cat: "gen", gu: "તાવ", en: "Fever", dept: "General Medicine", isEr: false },
    { id: "s8", cat: "gen", gu: "બ્લડ પ્રેશર", en: "Blood Pressure", dept: "General Medicine", isEr: false },
    { id: "s5", cat: "gen", gu: "ડાયાબિટીસ", en: "Diabetes", dept: "General Medicine", isEr: false },
    { id: "s9", cat: "gen", gu: "થાઈરોઈડ", en: "Thyroid", dept: "General Medicine", isEr: false },
    { id: "s16a", cat: "gen", gu: "પગમાં સોજા (અચાનક)", en: "Leg Swelling (Acute)", dept: "EMERGENCY ROOM", isEr: true },
    { id: "s16b", cat: "gen", gu: "પગમાં સોજા (લાંબા સમયથી)", en: "Leg Swelling (Chronic)", dept: "General Medicine", isEr: false },
    { id: "s29a", cat: "gen", gu: "પેશાબ ઓછો (અચાનક)", en: "Low Urine (Acute)", dept: "EMERGENCY ROOM", isEr: true },
    { id: "s29b", cat: "gen", gu: "પેશાબ ઓછો (લાંબા સમયથી)", en: "Low Urine (Chronic)", dept: "General Medicine", isEr: false },

    // Neuro
    { id: "s18", cat: "neuro", gu: "અંધારા આવે / ચક્કર", en: "Dizziness", dept: "EMERGENCY ROOM", isEr: true },
    { id: "s19", cat: "neuro", gu: "લકવા જેવી અસર", en: "Paralysis Symptoms", dept: "EMERGENCY ROOM", isEr: true },
    { id: "s20", cat: "neuro", gu: "બોલવામાં તકલીફ", en: "Difficulty Speaking", dept: "EMERGENCY ROOM", isEr: true },

    // Gastro
    { id: "s10", cat: "gastro", gu: "પેટમાં દુખાવો", en: "Stomach Ache", dept: "General Surgery", isEr: false },
    { id: "s6", cat: "gastro", gu: "ઝાડા", en: "Diarrhea", dept: "General Medicine", isEr: false },
    { id: "s7", cat: "gastro", gu: "ઉલટી", en: "Vomiting", dept: "General Medicine", isEr: false },

    // Ortho & Injuries
    { id: "s24", cat: "ortho", gu: "માથામાં વાગ્યું", en: "Head Injury", dept: "Surgery / Orthopedics", isEr: false },
    { id: "s25", cat: "ortho", gu: "ફ્રેક્ચર", en: "Fracture", dept: "Orthopedics", isEr: false },
    { id: "s23", cat: "ortho", gu: "પડી ગયા", en: "Fall", dept: "Surgery / Orthopedics", isEr: false },
    { id: "s11", cat: "ortho", gu: "વાગ્યું / લોહી / સોજો", en: "Injury/Bleeding", dept: "General Surgery", isEr: false },
    { id: "s12", cat: "ortho", gu: "ઘા થયો છે", en: "Wound", dept: "General Surgery", isEr: false },
    { id: "s22", cat: "ortho", gu: "સાંધામાં દુખાવો", en: "Joint Pain", dept: "Surgery / Orthopedics", isEr: false },
    { id: "s26", cat: "ortho", gu: "હાથમાં એક જગ્યાએ સોજો", en: "Hand Swelling (Local)", dept: "Surgery / Orthopedics", isEr: false },
    { id: "s13", cat: "ortho", gu: "જીવજંતુ કરડ્યું / સોજો", en: "Insect Bite/Swelling", dept: "General Surgery", isEr: false },

    // Other
    { id: "s21", cat: "other", gu: "< ૧૪ વર્ષથી નાના દર્દી", en: "Patient < 14 Years", dept: "Pediatrics", isEr: false },
    { id: "s27", cat: "other", gu: "ચામડીના રોગ / ખંજવાળ", en: "Skin Rash / Itching", dept: "Dermatology", isEr: false },
    { id: "s28", cat: "other", gu: "સ્ત્રી રોગ / સગર્ભા", en: "Women's Health/Pregnancy", dept: "OBGY", isEr: false }
  ];

  let currentLang = localStorage.getItem("triage-lang") || "en";
  let selectedIds = new Set();

  const langToggle = document.getElementById("lang-toggle");
  const langLabel = document.getElementById("lang-label");
  const pillsContainer = document.getElementById("pills-container");
  const resultCard = document.getElementById("result-card");
  const resultDept = document.getElementById("result-dept");
  const resultSymptoms = document.getElementById("result-symptoms");

  function updateLanguage() {
    langLabel.classList.add("fade");
    
    setTimeout(() => {
      langLabel.textContent = currentLang === "en" ? "ENG / ગુજ" : "ગુજ / ENG";
      document.getElementById("page-title").textContent = currentLang === "en" ? "OPD Triage System" : "ઓપીડી વર્ગીકરણ";
      document.getElementById("page-subtitle").textContent = currentLang === "en" ? "Tap symptoms to assign department" : "વિભાગ નક્કી કરવા માટે લક્ષણો પસંદ કરો";
      
      renderPills();
      updateResult();
      langLabel.classList.remove("fade");
    }, 150);
  }

  langToggle.addEventListener("click", () => {
    currentLang = currentLang === "en" ? "gu" : "en";
    localStorage.setItem("triage-lang", currentLang);
    updateLanguage();
  });

  function renderPills() {
    pillsContainer.innerHTML = "";
    
    categories.forEach(cat => {
      const catSymptoms = symptoms.filter(s => s.cat === cat.id);
      if (catSymptoms.length === 0) return;

      const groupDiv = document.createElement("div");
      groupDiv.className = "category-card";
      
      const title = document.createElement("div");
      title.className = "category-title";
      title.textContent = currentLang === "en" ? cat.en : cat.gu;
      groupDiv.appendChild(title);

      const pillWrap = document.createElement("div");
      pillWrap.className = "pill-wrap";

      catSymptoms.forEach(sym => {
        const pill = document.createElement("div");
        pill.className = `symptom-pill ${selectedIds.has(sym.id) ? "selected" : ""}`;
        pill.textContent = currentLang === "en" ? sym.en : sym.gu;
        
        pill.addEventListener("click", () => {
          if (selectedIds.has(sym.id)) {
            selectedIds.delete(sym.id);
            pill.classList.remove("selected");
          } else {
            selectedIds.add(sym.id);
            pill.classList.add("selected");
          }
          updateResult();
        });
        pillWrap.appendChild(pill);
      });

      groupDiv.appendChild(pillWrap);
      pillsContainer.appendChild(groupDiv);
    });
  }

  function updateResult() {
    if (selectedIds.size === 0) {
      resultDept.textContent = currentLang === "en" ? "Select Symptoms" : "લક્ષણો પસંદ કરો";
      resultSymptoms.textContent = currentLang === "en" ? "No symptoms selected." : "કોઈ લક્ષણ પસંદ કરેલ નથી.";
      resultCard.classList.remove("emergency", "standard");
      return;
    }

    let isEmergency = false;
    let isPediatric = false;
    let departments = new Set();
    let selectedTexts = [];

    selectedIds.forEach(id => {
      const sym = symptoms.find(s => s.id === id);
      selectedTexts.push(currentLang === "en" ? sym.en : sym.gu);
      
      if (sym.isEr) isEmergency = true;
      if (sym.id === "s21") isPediatric = true;
      departments.add(sym.dept);
    });

    let finalDept = "";
    if (isEmergency) {
      finalDept = isPediatric ? "PEDIATRIC EMERGENCY ROOM" : "EMERGENCY ROOM";
      resultCard.classList.remove("standard");
      resultCard.classList.add("emergency");
    } else {
      resultCard.classList.remove("emergency");
      resultCard.classList.add("standard");
      
      if (isPediatric && departments.size === 1) {
          finalDept = "Pediatrics";
      } else {
          const deptArray = Array.from(departments).filter(d => d !== "EMERGENCY ROOM");
          finalDept = deptArray.join(" + ");
      }
    }

    resultDept.textContent = finalDept;
    resultSymptoms.textContent = selectedTexts.join(", ");
  }

  updateLanguage();
});
