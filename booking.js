
const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats")) || [];
const farePerSeat = parseFloat(localStorage.getItem("farePerSeat")) || 450;

document.getElementById("seats").textContent = selectedSeats.join(", ");
document.getElementById("amount").textContent = selectedSeats.length * farePerSeat;

function proceedToPayment() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();

  if (!name || !email || !phone) {
    alert("Please fill in all fields.");
    return;
  }

  localStorage.setItem("passengerName", name);
  localStorage.setItem("passengerEmail", email);
  localStorage.setItem("passengerPhone", phone);

  window.location.href = "payment.html";
}
