document.addEventListener('contextmenu', event => event.preventDefault());

document.addEventListener('keydown', function(event) {
    if (
        event.key === "F12" || 
        (event.ctrlKey && (event.key === "u" || event.key === "U")) ||
        (event.ctrlKey && (event.key === "i" || event.key === "I")) ||
        (event.ctrlKey && (event.key === "j" || event.key === "J"))
    ) {
        event.preventDefault();
    }
});