  const clientId = "TU_CLIENT_ID";      // 🔑 poné el tuyo
  const clientSecret = "TU_CLIENT_SECRET"; // 🔑 poné el tuyo

  async function getToken() {
    const result = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": "Basic " + btoa(clientId + ":" + clientSecret)
      },
      body: "grant_type=client_credentials"
    });
    const data = await result.json();
    return data.access_token;
  }

  async function searchArtist(artistName) {
    const token = await getToken();
    const response = await fetch(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(artistName)}&type=artist`,
      {
        headers: {
          "Authorization": "Bearer " + token
        }
      }
    );
    const data = await response.json();
    return data.artists.items;
  }

  async function showArtists() {
    const artistName = document.getElementById("artistInput").value;
    const artists = await searchArtist(artistName);

    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "";

    artists.forEach(artist => {
      const div = document.createElement("div");
      div.classList.add("artist");

      const img = document.createElement("img");
      img.src = artist.images.length > 0 ? artist.images[0].url : "https://via.placeholder.com/200";

      const name = document.createElement("p");
      name.textContent = artist.name;

      div.appendChild(img);
      div.appendChild(name);
      resultsDiv.appendChild(div);
    });
  }