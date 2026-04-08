export const HIJAIYAH = [
  { index: 1, letter: 'ا', name: 'Alif', transliteration: 'a' },
  { index: 2, letter: 'ب', name: 'Ba', transliteration: 'ba' },
  { index: 3, letter: 'ت', name: 'Ta', transliteration: 'ta' },
  { index: 4, letter: 'ث', name: 'Tha', transliteration: 'tha' },
  { index: 5, letter: 'ج', name: 'Jim', transliteration: 'jim' },
  { index: 6, letter: 'ح', name: 'Ha', transliteration: 'ha' },
  { index: 7, letter: 'خ', name: 'Kha', transliteration: 'kha' },
  { index: 8, letter: 'د', name: 'Dal', transliteration: 'dal' },
  { index: 9, letter: 'ذ', name: 'Dzal', transliteration: 'dzal' },
  { index: 10, letter: 'ر', name: 'Ra', transliteration: 'ra' },
  { index: 11, letter: 'ز', name: 'Zai', transliteration: 'zai' },
  { index: 12, letter: 'س', name: 'Sin', transliteration: 'sin' },
  { index: 13, letter: 'ش', name: 'Syin', transliteration: 'syin' },
  { index: 14, letter: 'ص', name: 'Sad', transliteration: 'sad' },
  { index: 15, letter: 'ض', name: 'Dad', transliteration: 'dad' },
  { index: 16, letter: 'ط', name: 'Ta', transliteration: 'tho' },
  { index: 17, letter: 'ظ', name: 'Dza', transliteration: 'dzo' },
  { index: 18, letter: 'ع', name: 'Ain', transliteration: 'ain' },
  { index: 19, letter: 'غ', name: 'Ghain', transliteration: 'ghain' },
  { index: 20, letter: 'ف', name: 'Fa', transliteration: 'fa' },
  { index: 21, letter: 'ق', name: 'Qaf', transliteration: 'qaf' },
  { index: 22, letter: 'ك', name: 'Kaf', transliteration: 'kaf' },
  { index: 23, letter: 'ل', name: 'Lam', transliteration: 'lam' },
  { index: 24, letter: 'م', name: 'Mim', transliteration: 'mim' },
  { index: 25, letter: 'ن', name: 'Nun', transliteration: 'nun' },
  { index: 26, letter: 'ه', name: 'Ha', transliteration: 'ha' },
  { index: 27, letter: 'و', name: 'Wau', transliteration: 'wau' },
  { index: 28, letter: 'ي', name: 'Ya', transliteration: 'ya' },
]

export function getLetterByIndex(index) {
  return HIJAIYAH.find(h => h.index === index) || null
}
