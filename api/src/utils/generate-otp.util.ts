export const generateRandomNumbers = (): Set<number> => {
  const randomNumbers = new Set<number>();

  /** We keep adding elements till
   * size of set is equal to n,
   * which in this case is 5.
   */
  while (randomNumbers.size < 5) {
    // Generating random number
    // and adding it
    randomNumbers.add(Math.floor(Math.random() * 10) + 1);
  }

  return randomNumbers;
};
