document.addEventListener("DOMContentLoaded", () => {
  // Simple print handler
  const printBtn = document.getElementById("print-btn");
  if (printBtn) {
    printBtn.addEventListener("click", () => {
      window.print();
    });
  }
});
