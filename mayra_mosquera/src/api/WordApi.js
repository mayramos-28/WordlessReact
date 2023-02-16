export const getRandomWord = async () => {
  const url = ` https://adivina-palabra.fly.dev/new`;
  const options = {
    method: "POST",
  };

  const response = await fetch(url, options);
  const newWord = await response.json();
  const wordId = newWord.id || null;

  if(!wordId) {
    throw new Error(newWord.error || 'Error initializing game: 404');
  }

  return newWord.id;

};


const letterInWord = (gameId, letter, position) => { }
