// ハンバーガーメニュー
document.addEventListener("DOMContentLoaded", function () {
    const hamburger = document.querySelector(".hamburger");
    const nav = document.querySelector("nav");
    hamburger.addEventListener("click", function () {
        this.classList.toggle("active");    // ハンバーガーアイコンの変化
        nav.classList.toggle("open");       // ナビゲーションメニューの開閉
    });
});

document.addEventListener("contextmenu", (e) => {
    if (e.target.tagName.toLowerCase() === "a") {
        e.preventDefault();  // 右クリック/長押しメニューを無効化
    }
});


// 共通の音声再生関数
function speakEnglish(text, element = null) {
    if (!text) return;

    // (sth),(sb)を変換
    // text = text.replace(/\(sth\)/gi, "something").replace(/\(sb\)/gi, "someone")

    // (sth),(sb)以外の不要な部分を削除
    text = text.replace(/(\(.*?\)|\[.*?\])/g, "").trim();

    // 以前のハイライトを解除
    document.querySelectorAll(".speaking").forEach(el => {
        el.classList.remove("speaking");
    });

    speechSynthesis.cancel();

    setTimeout(() => {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = localStorage.getItem("selectedCountry") || "en-US";
        utterance.rate = 1.0;

        // 読み上げ開始
        utterance.onstart = () => {
            if (element) {
                element.classList.add("speaking");
            }
        };

        // 読み上げ終了
        utterance.onend = () => {
            if (element) {
                element.classList.remove("speaking");
            }
        };

        // エラー時もハイライト解除
        utterance.onerror = () => {
            if (element) {
                element.classList.remove("speaking");
            }
        };

        speechSynthesis.speak(utterance);
    }, 100);
}
