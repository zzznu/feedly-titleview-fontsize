# feedly-titleview-fontsize

Feedlyのリスト表示をカスタマイズするUserscriptです。  
Userscript to customize Feedly list view font size.

## 機能 / Features

- タイトルと説明文のフォントサイズを統一（スクリプト冒頭の`TITLE_FONT_SIZE`で変更可能）  
  Unified font size for titles and descriptions (editable via `TITLE_FONT_SIZE`)
- カード間の隙間を0に（黒い余白なし）  
  Zero gap between cards
- カードの高さを抑えて表示件数を増加  
  Compact card height

## インストール / Installation

[Violentmonkey](https://violentmonkey.github.io/) や [Tampermonkey](https://www.tampermonkey.net/) を導入した上で、以下を読み込みます。  
Install a userscript manager, then load the script below.

```
https://raw.githubusercontent.com/zzznu/feedly-titleview-fontsize/main/feedly-titleview-fontsize.js
```

## カスタマイズ / Customization

スクリプト冒頭の以下の値を変更してフォントサイズを調整できます。  
Edit these values at the top of the script:

```javascript
const TITLE_FONT_SIZE = 18;
const TAG_FONT_SIZE   = 14;
```

## 備考 / Note

大体全部Grokが作った。  
Mostly written by Grok.

## License

MIT
