export const getRandomWord = async () => {
  const url = ` https://adivina-palabra.fly.dev/new`;
  const options = {
    method: "POST",
  };

  const response = await fetch(url, options);
  const newWord = await response.json();
  const wordId = newWord.id || null;

  if (!wordId) {
    throw new Error(newWord.error || "Error initializing game: 404");
  }

  return newWord.id;
};

export const checkLettersWithGameId = async (letter, position, gameId) => {
  const url = `https://adivina-palabra.fly.dev/guess/${gameId}`;
  //  const url = `https://adivina-palabra.fly.dev/guess/WHATEVER/adios`;


  const data = { position: position, letter: letter };

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  const haveStatus = result.status || null;

  if (result.error || null) {
    throw new Error(result.error);
  }

  if (!haveStatus) {
    throw new Error(result.error || "desconozco este error");
  }
  return result.status;
};

// curl -x POST https://adivina-palabra.fly.dev/guess/$game_id \
// 		--header 'content-type: application/json' \
// 		--data '{
// 			'position' :0,
// 			'letter'	: 'a'
// 			}'
