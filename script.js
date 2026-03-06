async function fetchData() {
  try {
    const pokemonName = document.getElementById("pokemonName").value.toLowerCase();
    const response   = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);

    if (!response.ok) {
      throw new Error("Could not fetch resource");
    }

    const data          = await response.json();
    const pokemonSprite = data.sprites.front_default;
    const imgElement    = document.getElementById("pokemonSprite");

    imgElement.src           = pokemonSprite;
    imgElement.style.display = "block";
  } catch (error) {
    console.error(error);
  }
}

function handleSearch() {
    const input = document.getElementById("pokemonName");
    const errorMessage = document.getElementById("errorMessage");
    const imgElement = document.getElementById("pokemonSprite");

    errorMessage.textContent = "";
    imgElement.style.display = "none";

    const value = input.value.trim();

    if (value === "") {
        errorMessage.textContent = "Please enter a Pokemon name.";
        return;
    }

    if (!/^[a-zA-Z-]+$/.test(value)) {
        errorMessage.textContent = "Invalid charcters. Only letters and hyphens (-) are allowed.";
        return;
    }

    if (value.length > 30) {
        errorMessage.textContent = "Pokemon name is too long. Maximum 30 charcters allowed."
        return;
    }

    fetchData();
}

document.getElementById("searchButton").addEventListener("click", handleSearch);