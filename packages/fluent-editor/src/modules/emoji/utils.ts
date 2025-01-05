export function createEmoji(emojiArr) {
  const emojiList = []
  emojiArr.forEach((emojiItem) => {
    const [name, unicode, shortname, codeDecimal, category, emojiOrder] = emojiItem
    emojiList.push({
      name,
      unicode,
      shortname,
      codeDecimal,
      category,
      emojiOrder,
    })
  })
  return emojiList
}
