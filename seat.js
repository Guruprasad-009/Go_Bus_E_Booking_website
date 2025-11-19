

const seatPrice = 450;
const selected = [];
const bookedSeats = [];

const lowerLeftSeats = ["L1", "L2", "L3", "L4", "L5"];
const lowerRightSeats = ["R1", "R2", "R3", "R4", "R5", "R6", "R7", "R8", "R9", "R10"];
const upperLeftSeats = ["U1", "U2", "U3", "U4", "U5"];
const upperRightSeats = ["U6", "U7", "U8", "U9", "U10", "U11", "U12", "U13", "U14", "U15"];

function createSeats(seats, containerId, className = "berth") {
  const container = document.getElementById(containerId);
  seats.forEach(seatNum => {
    const row = document.createElement("div");
    row.classList.add("row");

    const seat = document.createElement("div");
    seat.classList.add(className);
    seat.setAttribute("data-seat", seatNum);
    seat.innerText = seatNum;

    if (Math.random() < 0.2) {
      seat.classList.add("booked");
      seat.innerHTML = Math.random() < 0.5 ? "👩" : "🧑";
      seat.onclick = null;
      bookedSeats.push(seatNum);
    } else {
      seat.onclick = () => toggleSeat(seat);
    }

    row.appendChild(seat);
    container.appendChild(row);
  });
}

// Generate all seat layouts
createSeats(lowerLeftSeats, "lower-left", "berth");
createSeats(lowerRightSeats, "lower-right", "seat");
createSeats(upperLeftSeats, "upper-left", "berth");
createSeats(upperRightSeats, "upper-right", "berth");

function toggleSeat(seat) {
  const seatNum = seat.getAttribute("data-seat");

  if (seat.classList.contains("selected")) {
    seat.classList.remove("selected");
    const index = selected.indexOf(seatNum);
    if (index !== -1) selected.splice(index, 1);
  } else {
    seat.classList.add("selected");
    selected.push(seatNum);
  }

  document.getElementById("selectedSeats").textContent = selected.length ? selected.join(", ") : "None";
  document.getElementById("totalAmount").textContent = selected.length * seatPrice;
}

function confirmBooking() {
  if (selected.length === 0) {
    alert("Please select at least one seat.");
    return;
  }

  localStorage.setItem("selectedSeats", JSON.stringify(selected));
  localStorage.setItem("totalFare", selected.length * seatPrice);
  localStorage.setItem("farePerSeat", seatPrice);

  alert(`✅ ${selected.length} seat(s) booked !`);
  window.location.href = "booking_success.html";
}
