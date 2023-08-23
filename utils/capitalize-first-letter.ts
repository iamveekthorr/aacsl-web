export const capitalizeFirstLetters = (inputString: string) => {
  if (!inputString) return '';
  // Split the string into an array of words
  const words = inputString.split(' ');

  // Iterate through the words and capitalize the first letter of each
  const capitalizedWords = words.map((word) => {
    const wordParts = word.split('-');

    // Capitalize the first letter of each part
    const capitalizedParts = wordParts.map((part) => {
      if (part.length > 0) {
        if (part === part.toUpperCase()) {
          // If the entire part is in uppercase, convert only the first letter to uppercase
          return part[0].toUpperCase() + part.slice(1).toLowerCase();
        } else {
          // If the part has mixed case, capitalize the first letter
          return part[0].toUpperCase() + part.slice(1);
        }
      }
      return part;
    });

    // Join the parts back together with hyphens
    return capitalizedParts.join('-');
  });

  // Join the capitalized words back into a single string
  const capitalizedString = capitalizedWords.join(' ');

  return capitalizedString;
};
