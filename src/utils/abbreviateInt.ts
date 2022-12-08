const SUFFIXES = ["", "k", "m", "b", "t"];
export function abbreviateInt(value: number) {
  const suffixNum = Math.floor(String(value).length / 3);
  const shortValue = parseFloat(
    (suffixNum !== 0 ? value / Math.pow(1000, suffixNum) : value).toPrecision(2)
  );

  return (
    (shortValue % 1 === 0
      ? String(shortValue)
      : String(shortValue.toFixed(1))) + SUFFIXES[suffixNum]
  );
}
