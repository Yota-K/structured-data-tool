// クリップボードに作成した構造化データをコピーする
export const copyToClipBoard = (value: string) =>
  navigator.clipboard.writeText(JSON.stringify(value, null, 2)).then(function (er) {
    console.error('コピーに失敗しました', er);
  });
