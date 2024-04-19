let cities = ["القاهره ", " مكه المكرمه ", "الرياض  "];
for (city of cities) {
  const content = `
    <option>${city}</option>
    `;
  document.getElementById("cityes-select").innerHTML += content;
}
let params = {
  country: "EG",
  city: "cairo",
};
axios
  .get("http://api.aladhan.com/v1/timingsByCity", {
    params: params,
  })
  .then(function (response) {
    const timings = response.data.data.timings;
    fillTimeForPrayer("fajr-time", timings.Fajr);
    fillTimeForPrayer("sunrise-time", timings.Sunrise);
    fillTimeForPrayer("dhuhr-time", timings.Dhuhr);
    fillTimeForPrayer("asr-time", timings.Asr);
    fillTimeForPrayer("sunset-time", timings.Sunset);
    fillTimeForPrayer("isha-time", timings.Isha);

    const readableDate = response.data.data.date.readable;
    const weekday = response.data.data.date.hijri.weekday.ar;
    const date = readableDate + " " + weekday;
    document.getElementById("date").innerHTML = date;
  })
  .catch(function (error) {
    console.log(error);
  });

function fillTimeForPrayer(id, time) {
  document.getElementById(id).innerHTML = time;
}
