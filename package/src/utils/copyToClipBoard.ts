// クリップボードに作成した構造化データをコピーする
// Clipboard APIはhttp環境下では使えないっぽいです
// http://var.blog.jp/archives/79909512.html
export const copyToClipBoard = (value: string) => {
  if (location.protocol == 'https:') {
    navigator.clipboard.writeText(value).then(function (er) {
      console.error('コピーに失敗しました', er);
    });
    // http環境下でも一応動くようにする
  } else if (location.protocol == 'http:') {
    // テキストコピー用の一時要素を作成
    const pre = document.createElement('pre');

    // テキストを選択可能にしてテキストセット
    pre.style.webkitUserSelect = 'auto';
    pre.style.userSelect = 'auto';
    pre.textContent = value;

    // 要素を追加、選択してクリップボードにコピー
    document.body.appendChild(pre);
    document.getSelection()?.selectAllChildren(pre);

    const result = document.execCommand('copy');

    // 要素を削除
    document.body.removeChild(pre);

    return result;
  }
};
