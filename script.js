//your JS code here. If required.
const output = document.getElementById("output");

// 1️⃣ Default Loading Row
output.innerHTML = `
  <tr id="loading">
    <td colspan="2">Loading...</td>
  </tr>
`;

// Utility function to create a promise with random delay (1–3 seconds)
function createPromise() {
  return new Promise((resolve) => {
    const delay = Math.random() * 2000 + 1000; // 1000–3000 ms
    const start = performance.now();

    setTimeout(() => {
      const end = performance.now();
      const timeTaken = ((end - start) / 1000).toFixed(3);
      resolve(Number(timeTaken));
    }, delay);
  });
}

// 2️⃣ Create 3 promises
const promises = [createPromise(), createPromise(), createPromise()];

// Start time to calculate total time
const totalStart = performance.now();

// 3️⃣ Promise.all()
Promise.all(promises).then((results) => {
  const totalEnd = performance.now();
  const totalTime = ((totalEnd - totalStart) / 1000).toFixed(3);

  // Remove loading row
  output.innerHTML = "";

  // Populate promise rows
  results.forEach((time, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>Promise ${index + 1}</td>
      <td>${time.toFixed(3)}</td>
    `;
    output.appendChild(row);
  });

  // Total row
  const totalRow = document.createElement("tr");
  totalRow.innerHTML = `
    <td>Total</td>
    <td>${totalTime}</td>
  `;
  output.appendChild(totalRow);
});
