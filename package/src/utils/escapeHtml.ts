// 置換対象の文字列
// keyが置換前、valueが置換後
const matchPattern = {
  '&': '&amp;',
  "'": '&#x27;',
  '`': '&#x60;',
  '"': '&quot;',
  '<': '&lt;',
  '>': '&gt;',
};

/**
 * html文字列をエスケープする
 * @param htmlText {string} - 置換対象のHTML文字列
 */
export const escapeHtml = (htmlText: string) => {
  let result = htmlText;
  for (const [key, value] of Object.entries(matchPattern)) {
    const reg = new RegExp(key, 'g');
    result = result.replace(reg, value);
  }
  return result;
};
