export const setFirsLetterUpperCase = (word: string) => {
 return word.charAt(0).toUpperCase() + word.slice(1);
};

export const formatCamelCaseWord = (word: string) => {
 const splitWord = word
  .split(/(?=[A-Z])/g)
  .map((word) => word.toLowerCase())
  .join(" ");

 return setFirsLetterUpperCase(splitWord);
};
