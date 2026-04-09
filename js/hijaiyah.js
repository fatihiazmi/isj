export const HIJAIYAH = [
  { index: 1, letter: 'ا', name: 'Alif', base: '', fathah: 'a', kasrah: 'i', dammah: 'u' },
  { index: 2, letter: 'ب', name: 'Ba', base: 'b', fathah: 'ba', kasrah: 'bi', dammah: 'bu' },
  { index: 3, letter: 'ت', name: 'Ta', base: 't', fathah: 'ta', kasrah: 'ti', dammah: 'tu' },
  { index: 4, letter: 'ث', name: 'Tha', base: 'th', fathah: 'tha', kasrah: 'thi', dammah: 'thu' },
  { index: 5, letter: 'ج', name: 'Jim', base: 'j', fathah: 'ja', kasrah: 'ji', dammah: 'ju' },
  { index: 6, letter: 'ح', name: 'Ha', base: 'h', fathah: 'ha', kasrah: 'hi', dammah: 'hu' },
  { index: 7, letter: 'خ', name: 'Kha', base: 'kh', fathah: 'kha', kasrah: 'khi', dammah: 'khu' },
  { index: 8, letter: 'د', name: 'Dal', base: 'd', fathah: 'da', kasrah: 'di', dammah: 'du' },
  { index: 9, letter: 'ذ', name: 'Dzal', base: 'dz', fathah: 'dza', kasrah: 'dzi', dammah: 'dzu' },
  { index: 10, letter: 'ر', name: 'Ra', base: 'r', fathah: 'ra', kasrah: 'ri', dammah: 'ru' },
  { index: 11, letter: 'ز', name: 'Zai', base: 'z', fathah: 'za', kasrah: 'zi', dammah: 'zu' },
  { index: 12, letter: 'س', name: 'Sin', base: 's', fathah: 'sa', kasrah: 'si', dammah: 'su' },
  { index: 13, letter: 'ش', name: 'Syin', base: 'sy', fathah: 'sya', kasrah: 'syi', dammah: 'syu' },
  { index: 14, letter: 'ص', name: 'Sad', base: 's', fathah: 'sa', kasrah: 'si', dammah: 'su' },
  { index: 15, letter: 'ض', name: 'Dad', base: 'd', fathah: 'da', kasrah: 'di', dammah: 'du' },
  { index: 16, letter: 'ط', name: 'To', base: 't', fathah: 'to', kasrah: 'ti', dammah: 'tu' },
  { index: 17, letter: 'ظ', name: 'Zo', base: 'z', fathah: 'zo', kasrah: 'zi', dammah: 'zu' },
  { index: 18, letter: 'ع', name: 'Ain', base: "'", fathah: "'a", kasrah: "'i", dammah: "'u" },
  { index: 19, letter: 'غ', name: 'Ghain', base: 'gh', fathah: 'gha', kasrah: 'ghi', dammah: 'ghu' },
  { index: 20, letter: 'ف', name: 'Fa', base: 'f', fathah: 'fa', kasrah: 'fi', dammah: 'fu' },
  { index: 21, letter: 'ق', name: 'Qaf', base: 'q', fathah: 'qa', kasrah: 'qi', dammah: 'qu' },
  { index: 22, letter: 'ك', name: 'Kaf', base: 'k', fathah: 'ka', kasrah: 'ki', dammah: 'ku' },
  { index: 23, letter: 'ل', name: 'Lam', base: 'l', fathah: 'la', kasrah: 'li', dammah: 'lu' },
  { index: 24, letter: 'م', name: 'Mim', base: 'm', fathah: 'ma', kasrah: 'mi', dammah: 'mu' },
  { index: 25, letter: 'ن', name: 'Nun', base: 'n', fathah: 'na', kasrah: 'ni', dammah: 'nu' },
  { index: 26, letter: 'ه', name: 'Ha', base: 'h', fathah: 'ha', kasrah: 'hi', dammah: 'hu' },
  { index: 27, letter: 'و', name: 'Wau', base: 'w', fathah: 'wa', kasrah: 'wi', dammah: 'wu' },
  { index: 28, letter: 'ي', name: 'Ya', base: 'y', fathah: 'ya', kasrah: 'yi', dammah: 'yu' },
]

export const BARIS = [
  { index: 1, name: 'Fathah', diacritic: '\u064E', sound: 'a' },
  { index: 2, name: 'Kasrah', diacritic: '\u0650', sound: 'i' },
  { index: 3, name: 'Dammah', diacritic: '\u064F', sound: 'u' },
]

export function getLetterByIndex(index) {
  return HIJAIYAH.find(h => h.index === index) || null
}

export function getBarisByIndex(index) {
  return BARIS.find(b => b.index === index) || null
}

// Returns letter with baris display and pronunciation
export function getLetterWithBaris(levelIndex, barisIndex) {
  const letter = getLetterByIndex(levelIndex)
  const baris = getBarisByIndex(barisIndex)
  if (!letter || !baris) return null

  const pronunciationMap = { 1: 'fathah', 2: 'kasrah', 3: 'dammah' }
  const pronunciation = letter[pronunciationMap[barisIndex]]

  return {
    ...letter,
    baris,
    display: letter.letter + baris.diacritic,
    pronunciation,
    barisName: baris.name,
  }
}
