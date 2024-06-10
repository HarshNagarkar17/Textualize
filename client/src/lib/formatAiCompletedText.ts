export const formatter = (aiGeneratedText: string, prompt: string) => {
  const promptWords = prompt.split(" ");
  const generatedTextWords = aiGeneratedText.split(" ");
  const startIndex = promptWords.length;
  const cleanedText = generatedTextWords.slice(startIndex).join(" ");

  return cleanedText
};
