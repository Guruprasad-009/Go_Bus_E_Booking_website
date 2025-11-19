const busData = [
  { name: "Morya Travels", type: "AC Sleeper", departure: "06:00 AM", arrival: "10:30 AM", price: 450 },
  { name: "Sai Travels", type: "Non-AC Seater", departure: "07:30 AM", arrival: "11:45 AM", price: 420 },
  { name: "Shivam Tours", type: "AC Sleeper", departure: "09:00 AM", arrival: "01:15 PM", price: 490 },
  { name: "SG Travels", type: "AC Sleeper", departure: "10:15 AM", arrival: "02:30 PM", price: 510 },
  { name: "Pavan Travels", type: "Non-AC Sleeper", departure: "11:45 AM", arrival: "04:00 PM", price: 440 },
  { name: "GP Express", type: "AC Seater", departure: "01:00 PM", arrival: "05:15 PM", price: 470 },
  { name: "Swami Travels", type: "AC Sleeper", departure: "02:30 PM", arrival: "06:45 PM", price: 499 },
  { name: "Krishna Travels", type: "AC Sleeper", departure: "04:00 PM", arrival: "08:15 PM", price: 540 },
  { name: "Indumati Travels", type: "AC Seater", departure: "05:15 PM", arrival: "09:30 PM", price: 460 },
  { name: "Mahalakshi Travels", type: "Non-AC Sleeper", departure: "06:30 PM", arrival: "10:45 PM", price: 430 },
  { name: "National Travels", type: "AC Sleeper", departure: "08:00 PM", arrival: "12:30 AM", price: 550 },
  { name: "Greenline Travels", type: "AC Seater", departure: "09:30 PM", arrival: "01:45 AM", price: 480 },
  { name: "Samarth Travels", type: "Non-AC Seater", departure: "10:00 PM", arrival: "03:00 AM", price: 400 },
  { name: "Kolhapur Express", type: "AC Sleeper", departure: "11:00 PM", arrival: "04:00 AM", price: 520 }
];

const urlParams = new URLSearchParams(window.location.search);
const from = urlParams.get("from") || localStorage.getItem("from") || "-";
const to = urlParams.get("to") || localStorage.getItem("to") || "-";
const date = urlParams.get("date") || localStorage.getItem("date") || new Date().toISOString().split("T")[0];

// document.getElementById("route-subheading").textContent = `Showing buses from ${from} → ${to} on ${date}`;
// localStorage.setItem("from", from);
// localStorage.setItem("to", to);
// localStorage.setItem("date", date);

const container = document.getElementById("busCardsContainer");
const filterOptions = document.querySelectorAll(".filter-option");

function renderBuses(filterType = null) {
  container.innerHTML = "";

  const filtered = busData.filter(bus => {
    if (!filterType) return true;
    return bus.type.toUpperCase().includes(filterType.toUpperCase());
  });

  if (filtered.length === 0) {
    container.innerHTML = "<p>No buses found for selected filters.</p>";
    return;
  }

  filtered.forEach(bus => {
    const card = document.createElement("div");
    card.className = "bus-card";
    card.innerHTML = `
      <div class="bus-info">
        <h3>${bus.name}</h3>
        <p><i class="fa-solid fa-bus"></i> ${bus.type}</p>
        <p><i class="fa-regular fa-clock"></i> ${bus.departure} → ${bus.arrival}</p>
      </div>
      <div class="bus-actions">
        <h4>₹${bus.price}</h4>
        <button class="view-seats">View Seats</button>
      </div>
    `;
    card.querySelector(".view-seats").addEventListener("click", () => {
      localStorage.setItem("selectedBus", JSON.stringify(bus));
      window.location.href = "seat.html";
    });

    container.appendChild(card);
  });
}

renderBuses();

filterOptions.forEach(option => {
  option.addEventListener("click", () => {
   
    filterOptions.forEach(opt => opt.classList.remove("active"));
    option.classList.add("active");

    const filter = option.getAttribute("data-filter");
    renderBuses(filter);
  });
});




