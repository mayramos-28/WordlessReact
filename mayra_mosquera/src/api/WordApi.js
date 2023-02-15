export const getRandomWord = async () => {
  const url = ` https://adivina-palabra.fly.dev/new`;
  const options = {
    method: "POST",
  };

  const response = await fetch(url, options);
  const newWord = await response.json();
  return newWord.id;
};
