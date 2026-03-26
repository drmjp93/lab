document.addEventListener("DOMContentLoaded", () => {
  const csvInput = document.getElementById("csv-input");
  const jsonOutput = document.getElementById("json-output");
  const convertBtn = document.getElementById("convert-btn");
  const clearBtn = document.getElementById("clear-btn");
  const copyBtn = document.getElementById("copy-btn");
  const headerCheck = document.getElementById("header-check");
  
  // File Upload Elements
  const uploadBtn = document.getElementById("upload-btn");
  const fileInput = document.getElementById("csv-file");

  // --- FILE UPLOAD LOGIC ---
  uploadBtn.addEventListener("click", () => {
    fileInput.click(); // Trigger the hidden file input
  });

  fileInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Read the file securely in the browser
    const reader = new FileReader();
    reader.onload = function(event) {
      csvInput.value = event.target.result; // Put the text in the box
      convertBtn.click(); // Automatically click the convert button for the user!
    };
    reader.readAsText(file);
    
    // Reset the input so the same file can be uploaded again if needed
    fileInput.value = "";
  });

  // --- CONVERT LOGIC ---
  convertBtn.addEventListener("click", () => {
    const rawCSV = csvInput.value.trim();
    
    if (!rawCSV) {
      jsonOutput.value = "Please enter or upload some CSV data first.";
      return;
    }

    // Call PapaParse
    Papa.parse(rawCSV, {
      header: headerCheck.checked,
      skipEmptyLines: true,
      complete: function(results) {
        if (results.errors.length > 0) {
          const errorMsgs = results.errors.map(e => `Row ${e.row}: ${e.message}`).join("\n");
          jsonOutput.value = "Errors encountered parsing CSV:\n" + errorMsgs;
        } else {
          jsonOutput.value = JSON.stringify(results.data, null, 2);
        }
      }
    });
  });

  // --- CLEAR INPUT ---
  clearBtn.addEventListener("click", () => {
    csvInput.value = "";
    jsonOutput.value = "";
    csvInput.focus();
  });

  // --- COPY LOGIC ---
  copyBtn.addEventListener("click", () => {
    if (!jsonOutput.value) return;
    
    navigator.clipboard.writeText(jsonOutput.value).then(() => {
      const originalText = copyBtn.textContent;
      copyBtn.textContent = "Copied!";
      setTimeout(() => { copyBtn.textContent = originalText; }, 2000);
    });
  });
});