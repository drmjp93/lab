document.addEventListener("DOMContentLoaded", () => {
  // Simple print handler
  const printBtn = document.getElementById("print-btn");
  if (printBtn) {
    printBtn.addEventListener("click", () => {
      window.print();
    });
  }
});

// Listen for the background print command from the OPD tool
window.addEventListener("message", (event) => {
  // When the secret signal is received, trigger the print!
  if (event.data === "trigger_print") {
    window.print();
  }
});
