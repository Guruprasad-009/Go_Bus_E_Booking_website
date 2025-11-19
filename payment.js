
const name = localStorage.getItem("passengerName") || "N/A";
const email = localStorage.getItem("passengerEmail") || "N/A";
const phone = localStorage.getItem("passengerPhone") || "N/A";
const seats = JSON.parse(localStorage.getItem("selectedSeats")) || [];
const farePerSeat = parseFloat(localStorage.getItem("farePerSeat")) || 450;

document.getElementById("passengerName").textContent = name;
document.getElementById("passengerEmail").textContent = email;
document.getElementById("passengerPhone").textContent = phone;
document.getElementById("seats").textContent = seats.join(", ");
document.getElementById("amount").textContent = seats.length * farePerSeat;

function makePayment() {
  alert("Payment Successful!");
  window.location.href = "payment_success.html";
}
