// ==UserScript==
// @name         Feedly Title View Font Size
// @namespace    https://github.com/zzznu/feedly-titleview-fontsize
// @version      1.1.0
// @description  Feedlyリストのタイトル・説明フォントサイズ統一、隙間ゼロ、高さ抑え
// @author       zzznu
// @license      MIT
// @match        https://feedly.com/*
// @match        https://*.feedly.com/*
// @grant        none
// @run-at       document-end
// @noframes
// @homepageURL  https://github.com/zzznu/feedly-titleview-fontsize
// @supportURL   https://github.com/zzznu/feedly-titleview-fontsize/issues
// @downloadURL  https://raw.githubusercontent.com/zzznu/feedly-titleview-fontsize/main/feedly-titleview-fontsize.js
// @updateURL    https://raw.githubusercontent.com/zzznu/feedly-titleview-fontsize/main/feedly-titleview-fontsize.js
// ==/UserScript==

(function () {
    'use strict';

    // ここを好きな数字に変えてください！
    // 例: 18 → 18px、20 → 20px、19.5 → 19.5px など
    const TITLE_FONT_SIZE = 18;     // タイトルと説明のフォントサイズ（px）
    const TAG_FONT_SIZE   = 14;     // タグ・時間などの小さめ文字サイズ（px）

    // 以下は触らなくてOK
    const STYLE_ID = 'feedly-titleview-fontsize-style';

    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = `
        /* タイトルと説明（同じサイズ） */
        article.entry .EntryTitleLink,
        article.entry a[class*="title" i],
        article.entry h2, article.entry h3,
        article.entry [class*="Title" i],
        article.entry [class*="snippet" i],
        article.entry [class*="description" i],
        article.entry .u-line-clamp,
        article.entry p:not([class*="title" i]) {
            font-size: ${TITLE_FONT_SIZE}px !important;
            line-height: 1.35 !important;
            margin: 2px 0 2px !important;
        }

        /* タグ・時間など */
        article.entry [class*="tag" i],
        article.entry [class*="meta" i],
        article.entry .ROOMIE,
        article.entry .timeago {
            font-size: ${TAG_FONT_SIZE}px !important;
            line-height: 1.3 !important;
        }

        /* 枠の高さ（フォントサイズに合わせて自動調整） */
        article.entry,
        article.entry.titleOnly,
        article.entry.main {
            max-height: ${TITLE_FONT_SIZE * 4.5}px !important;  /* 目安：タイトル+説明+タグで収まるくらい */
            padding: 8px 12px !important;
            margin: 0 !important;
            overflow: hidden !important;
            box-sizing: border-box !important;
        }

        /* 隙間完全ゼロ */
        .feed__items,
        .streamPage,
        div[class*="items" i],
        .listView,
        .cardsView,
        .magazineView,
        .stream,
        .stream-content,
        [class*="stream" i] {
            gap: 0 !important;
            row-gap: 0 !important;
            margin: 0 !important;
            padding: 0 !important;
        }

        /* 背景透け防止（ダークテーマ時のみ。
           ライトテーマまで黒く塗ると文字が読めなくなるためスコープを限定する） */
        .theme--dark body,
        body.theme--dark,
        .theme--dark .fx {
            background: #000 !important;
        }

        /* 内部余白ゼロ */
        article.entry > * {
            margin: 0 !important;
            padding: 0 !important;
        }
    `;

    (document.head || document.documentElement).appendChild(style);

    // 動的追加対応：FeedlyがSPA遷移でheadを差し替えてもスタイルを復活させる。
    // 変更のたびに走ると重いため requestAnimationFrame で1フレーム1回に間引く
    let scheduled = false;
    const observer = new MutationObserver(() => {
        if (scheduled) return;
        scheduled = true;
        requestAnimationFrame(() => {
            scheduled = false;
            if (!document.getElementById(STYLE_ID)) {
                (document.head || document.documentElement).appendChild(style);
            }
        });
    });
    observer.observe(document.body, { childList: true, subtree: true });
})();
