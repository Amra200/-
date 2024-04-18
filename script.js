function displayCurrentDate() {
  const today = new Date();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  document.getElementById("currentDate").textContent = today.toLocaleDateString(
    "ar-EG",
    options
  );
}

async function getPrayerTimes() {
  const selectedCity = document.getElementById("city").value;
  const apiUrl = `http://api.aladhan.com/v1/timingsByCity?city=${selectedCity}&country=EG&method=8`;

  try {
    const response = await axios.get(apiUrl);
    const timings = response.data.data.timings;

    const prayerTimesHTML = `
                     <h2>مواقيت الصلاة في ${selectedCity}</h2>
                     <p>الفجر: ${timings.Fajr}</p>
                     <p>الشروق: ${timings.Sunrise}</p>
                     <p>الظهر: ${timings.Dhuhr}</p>
                     <p>العصر: ${timings.Asr}</p>
                     <p>المغرب: ${timings.Maghrib}</p>
                     <p>العشاء: ${timings.Isha}</p>
               `;
    document.getElementById("prayerTimes").innerHTML = prayerTimesHTML;
    displayCurrentDate();
  } catch (error) {
    console.log("Error fetching prayer times:", error);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  getPrayerTimes();
});

// const images = [
//   "./imags/35.jpg",
//   "./imags/36.jpg",
//   "./imags/38.jpg",
//   "./imags/background.jpg",
// ];
// let currentIndex = 0;
// const backgroundImageDiv = document.getElementById("backgroundImage");

// function changeBackgroundImage() {
//   const imageUrl = images[currentIndex];
//   backgroundImageDiv.style.backgroundImage = `url(${imageUrl})`;
//   currentIndex = (currentIndex + 1) % images.length;
// }

// setInterval(changeBackgroundImage, 5000);
