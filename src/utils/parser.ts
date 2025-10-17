export function parsedMark(markString: string): { text: string }[] {
  const parsed: { text: string }[] = markString
    .split(';')
    .map(s => s.trim())
    .filter(Boolean)
    .map(text => ({text}));
  return parsed
}

export function stringifyMark(parsed: { text: string }[]): string {
	return parsed.map(item => item.text).join('; ')
}