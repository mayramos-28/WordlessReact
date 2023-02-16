export const isValidWordApi = async (word) => {
  const url = `https://adivina-palabra.fly.dev/check/${word.trim() || '-'}`;
  const options = {
    method: "GET",   
  };
  const response = await fetch(url, options);

  const result = await response.json();
  const isValid =  result.valid || false; 

  if(result.error || null) {
    throw new Error(result.error);
  }

  if(!isValid) {
    throw new Error("La palabra no es válida");
  }

  return isValid;
};

