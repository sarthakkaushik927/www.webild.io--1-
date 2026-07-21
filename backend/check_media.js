async function checkMedia() {
  try {
    const res = await fetch("http://localhost:8080/api/media");
    const data = await res.json();
    console.log(JSON.stringify(data, null, 2));
  } catch (err) {
    console.error("Error fetching media:", err);
  }
}
checkMedia();
