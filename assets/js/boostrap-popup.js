document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
        const popup = document.getElementById('popup');
        popup.style.display = 'flex';
        setTimeout(() => {
            popup.classList.add('show');
        }, 10);
    }, 3000);

    document.querySelector('.popup-button').addEventListener('click', function() {
        const popup = document.getElementById('popup');
        popup.classList.remove('show');
        setTimeout(function() {
            popup.style.display = 'none';
        }, 600);
    });
});
