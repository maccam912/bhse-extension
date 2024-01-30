function hashCode(str) {
    let hash = 0;
    for (let i = 0, len = str.length; i < len; i++) {
        let chr = str.charCodeAt(i);
        hash = (hash << 5) - hash + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
}

const body = document.querySelector("body");

if (!(window.location.href.includes("127.0.0.1") || window.location.href.includes("localhost") || window.location.href.includes("meilisearch.k3s.koski.co"))) {
    fetch("https://meilisearch.k3s.koski.co/indexes/bhse/documents", {
        method: "post",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer <meilisearch-api-token>"
        },
        body: JSON.stringify([{
            "id": hashCode(window.location.href),
            "title": document.title,
            "url": window.location.href,
            "text": body.outerText,
            "visit_date": (new Date()).toString()
        }])
    });