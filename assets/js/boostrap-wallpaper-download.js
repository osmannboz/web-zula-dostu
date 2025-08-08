const downloadLinks = document.querySelectorAll("[data-download]");

downloadLinks.forEach(button => {
    const id = button.dataset.download;
    const image = document.getElementById(id);

    button.addEventListener("click", () => {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", image.src, true);
        xhr.responseType = "blob"; // Resmi Blob olarak al
        xhr.onload = function() {
            if (xhr.status === 200) {
                const blob = xhr.response;
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = "wallpaper_5.png"; // Dosya adını burada belirleyin
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url); // URL'yi bellekten temizle
                document.body.removeChild(a);
            }
        };
        xhr.send();
    });
});
