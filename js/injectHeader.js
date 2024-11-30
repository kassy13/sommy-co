document.addEventListener("DOMContentLoaded", () => {
    const headerPlaceholder = document.getElementById("header-placeholder");

    // Fetch the header HTML file
    fetch("header.html")
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text();
        })
        .then((html) => {
            // Inject the header HTML into the placeholder div
            headerPlaceholder.innerHTML = html;
        })
        .catch((error) => {
            console.error("Error loading header:", error);
        });
});
