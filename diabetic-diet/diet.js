document.addEventListener("DOMContentLoaded", () => {
  
  // Standard print button logic (for normal visits)
  const printBtn = document.getElementById("print-btn");
  if (printBtn) {
    printBtn.addEventListener("click", () => {
      window.print();
    });
  }

  // ==========================================
  // MAGIC AUTO-PRINT & CLOSE LOGIC
  // ==========================================
  const urlParams = new URLSearchParams(window.location.search);
  
  if (urlParams.get('autoprint') === 'true') {
    // 1. Wait 500ms to ensure the CSS/fonts have fully rendered
    setTimeout(() => {
      window.print();
    }, 500);

    // 2. The moment the user clicks 'Print' or 'Cancel', close this tab
    window.addEventListener('afterprint', () => {
      window.close();
    });
  }

});
