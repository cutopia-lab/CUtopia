const addOpacity = (rgbString: string, opacity: number) => {
  if (rgbString.startsWith('#')) {
    const hexOpacity = Math.round(Math.min(Math.max(opacity || 1, 0), 1) * 255);
    return rgbString + hexOpacity.toString(16).toUpperCase();
  }
  if (rgbString.startsWith('rgba')) {
    return rgbString.replace(/[^,]+(?=\))/, opacity as any);
  }
  return rgbString.replace(')', `, ${opacity})`).replace('rgb', 'rgba');
};
export default addOpacity;