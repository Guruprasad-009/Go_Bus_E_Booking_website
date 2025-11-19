const cities = [
   "Kolhapur", "Pune", "Mumbai", "Nashik", "Amravati", "Solapur", "Nanded", "Sangli", "Satara", "Goa",
   "Karnataka","Raigad", "Akola", "Wardha", "Bhandara", "Latur", "Hingoli", "Bengaluru", "Chennai", 
   "Kolkata", "Hyderabad", "Ahmedabad", "Jaipur", "Lakhnow", "Chandigarh", "Jammu-Kashmir", "Chennai", 
   "Kochi", "Vijaywada", "Surat", "Rajkot", "Jodhpur", "Durgapur", "Ranchi", "Patna", "Gaya", "Bhopal", 
   "Indore", "Raipur", "Guwahati", "Shillong", "Imphal", "Manipur", "Assam", "Manipur", "Mizoram", "Tripura", 
   "Nagaland", "Dehradun", "Haridwar", "Nagpur", "Thane", "PCMC", "Gargoti", "Aajra", "Vasai", "Panvel", 
   "Dhule", " ichalkaranji", "Shivajinagar", "Swargate", "Gadinglaj", "Nigdi", "Diva", "Katraj", "Ghatkopar",
   "Kalyan", "Bhakti-Shakti", "Delhi", "Gujrat", "Sambhajinagar", "Sikkim", "Kothrudh", "Mudal", "Rameswaram",
   "Belgaon", "Faridabad", "Hubli", "Indore", "Jaipur", "Jabalpur", "Kanpur", "Lucknow", "Ludhiana", "Noida", 
   "Ongole", "Orai", "Panaji", "Bihar", "Qadian", "Raipur", "Rajkot", "Surat", "Solapur", "Srinagar", "Tirupati",
   "Thrissur", "Ujjain", "Udaipur", "Vadodara", "Yavatmal", "Yamunanagar", "Nagaland", "Telangana" 
  ];

function showSuggestions(inputId, suggestionBoxId) {
  const inputElem = document.getElementById(inputId);
  const suggestionBox = document.getElementById(suggestionBoxId);
  const inputValue = inputElem.value.trim().toLowerCase();

  suggestionBox.innerHTML = '';

  if (inputValue.length === 0) return;

  const filteredCities = cities
    .filter(city => city.toLowerCase().startsWith(inputValue))
    .slice(0, 5); 
  filteredCities.forEach(city => {
    const li = document.createElement('div');
    li.className = 'suggestion-item';
    li.textContent = city;
    li.onclick = () => {
      inputElem.value = city;
      suggestionBox.innerHTML = '';
    };
    suggestionBox.appendChild(li);
  });
}

function searchBus() {
  const from = document.getElementById("fromCity").value.trim();
  const to = document.getElementById("toCity").value.trim();
  const date = document.getElementById("journeyDate").value;

  if (!from || !to || !date) {
    alert("Please fill all the fields!");
    return;
  }

  const query = from=`${encodeURIComponent(from)}&to=${encodeURIComponent(to)}&date=${encodeURIComponent(date)}`;
  window.location.href = `buslist.html?${query}`;
}



const bus = JSON.parse(localStorage.getItem("selectedBus"));
const from = localStorage.getItem("from");
const to = localStorage.getItem("to");
const date = localStorage.getItem("date");
const price = bus.price;

document.getElementById("busName").textContent = bus.name;
document.getElementById("from").textContent = from;
document.getElementById("to").textContent = to;
document.getElementById("date").textContent = date;
document.getElementById("fare").textContent = price;

const seatLayout = document.getElementById("seatLayout");
const selectedSeatsDisplay = document.getElementById("selectedSeats");
const totalFareDisplay = document.getElementById("totalFare");

const selectedSeats = [];

const rows = 4;
const cols = 4;
const seatLetters = ["A", "B", "C", "D"];

for (let row = 1; row <= rows; row++) {
  for (let col = 0; col < cols; col++) {
    const seatNo = seatLetters[col] + row;
    const seat = document.createElement("div");
    seat.classList.add("seat");
    seat.textContent = seatNo;

    const isOccupied = ["A1", "B2", "C3"].includes(seatNo);
    if (isOccupied) {
      seat.classList.add("occupied");
    }

    seat.addEventListener("click", () => {
      if (seat.classList.contains("occupied")) return;

      seat.classList.toggle("selected");

      if (seat.classList.contains("selected")) {
        selectedSeats.push(seatNo);
      } else {
        const index = selectedSeats.indexOf(seatNo);
        if (index !== -1) selectedSeats.splice(index, 1);
      }

      selectedSeatsDisplay.textContent = selectedSeats.join(", ") || "None";
      totalFareDisplay.textContent = selectedSeats.length * price;
    });

    seatLayout.appendChild(seat);
  }
}

function proceed() {
  if (selectedSeats.length === 0) {
    alert("Please select at least one seat.");
    return;
  }

  localStorage.setItem("selectedSeats", selectedSeats.join(", "));
  localStorage.setItem("totalFare", selectedSeats.length * price);
  window.location.href = "booking.html";
}


