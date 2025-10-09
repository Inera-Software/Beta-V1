
export interface Slide {
  title: string;
  content: string[];
}

export function parsePresentationText(text: string): Slide[] {
  if (!text) return [];
  const slides: Slide[] = [];
  const slideTexts = text.trim().split(/Slide \d+:/).slice(1);

  slideTexts.forEach((slideText) => {
    const lines = slideText.trim().split('\n');
    const titleLine = lines.shift() || '';
    const title = titleLine.replace(/Title: /, '').trim();
    const content = lines.map(line => line.trim()).filter(line => line);
    slides.push({ title, content });
  });

  return slides;
}

export const generatedText = ``;
