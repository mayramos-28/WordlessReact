export const getRandomWord = async () => {
  const url = ` https://adivina-palabra.fly.dev/new`;
  const options = {
    method: "POST",
  };

  const response = await fetch(url, options);
  const result = await response.json();
  const gameId = result.id || null;

  if (!gameId) {
    throw new Error(result.error || "Error initializing game: 404");
  }

  return gameId;
};

export const checkLettersWithGameId = async (letter, position, gameId) => {
  const url = `https://adivina-palabra.fly.dev/guess/${gameId}`;
  const data = { position: position, letter: letter };

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (result.error || null) {
    throw new Error(result.error);
  }

  if (!result.status) {
    throw new Error("desconozco este error");
  }
  return result.status;
};

export const isValidWordApi = async (word) => {
  const url = `https://adivina-palabra.fly.dev/check/${word.trim() || "-"}`;
  const options = {
    method: "GET",
  };
  const response = await fetch(url, options);
  const result = await response.json();
  const isValid = result.valid || false;

  if (result.error) {
    throw new Error('No hay suficientes letras');
  }

  if (!isValid) {
    throw new Error("La palabra no es válida");
  }

  return isValid;
};
