function getPrayerTimes() {
  // Clear previous prayer times (if any)
  const prayerTimesDiv = document.getElementById("prayerTimes");
  prayerTimesDiv.innerHTML = "";

  // Get country and city input values
  const countryInput = document.getElementById("country");
  const cityInput = document.getElementById("city");
  const country = countryInput.value.trim();
  const city = cityInput.value.trim();

  // Check if country and city inputs are not empty
  if (country !== "" && city !== "") {
    // Fetch prayer times data based on country and city
    fetch(
      `https://api.aladhan.com/v1/timingsByCity?city=${city}&country=${country}&method=1`
    )
      .then((response) => response.json())
      .then((data) => {
        // Check if the response contains prayer times data
        if (data["data"]) {
          // Accessing the prayer times object from the data
          const prayerData = data["data"]["timings"];

          // Creating an empty string to store the prayer times
          let prayerTimesHTML = "";

          // Looping through the prayerData object and creating the HTML structure
          for (let time in prayerData) {
            prayerTimesHTML += `<p><strong>${time}:</strong> <span class="time-clock">${prayerData[time]}</span></p>`;
          }

          // Adding the prayer times HTML to the div
          prayerTimesDiv.innerHTML = prayerTimesHTML;
        } else {
          prayerTimesDiv.innerHTML =
            "<p>Sorry, prayer times for the provided location could not be found.</p>";
        }
      })
      .catch((error) => {
        console.log("Error:", error);
        prayerTimesDiv.innerHTML =
          "<p>Sorry, an error occurred while fetching prayer times data. Please try again later.</p>";
      });
  } else {
    prayerTimesDiv.innerHTML = "<p>Please enter both country and city.</p>";
  }
}

// Add event listener to the "Get Prayer Times" button
const getPrayerTimesBtn = document.getElementById("getPrayerTimesBtn");
getPrayerTimesBtn.addEventListener("click", getPrayerTimes);
