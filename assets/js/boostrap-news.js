document.addEventListener('DOMContentLoaded', function () {
    const filterButtons = document.querySelectorAll('.news-filter-button');
    const newsItems = document.querySelectorAll('.news-item');
    const paginationContainer = document.querySelector('.news-pagination');
    let currentPage = 1;
    const itemsPerPage = 5;

    filterButtons.forEach(button => {
        button.addEventListener('click', function () {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            currentPage = 1; // Reset to the first page when a new filter is applied
            filterNews(this.getAttribute('data-filter'));
        });
    });

    function filterNews(filter) {
        const filteredNews = Array.from(newsItems).filter(item => 
            filter === 'all' || item.getAttribute('data-category') === filter
        );

        renderNews(filteredNews);
    }

    function renderNews(news) {
        newsItems.forEach(item => item.style.display = 'none');
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const paginatedNews = news.slice(start, end);

        paginatedNews.forEach(item => {
            item.style.display = 'block';
        });

        renderPagination(news.length);
    }

    function renderPagination(totalItems) {
        paginationContainer.innerHTML = '';
        const totalPages = Math.ceil(totalItems / itemsPerPage);
        if (totalPages > 1) {
            for (let i = 1; i <= totalPages; i++) {
                const pageButton = document.createElement('button');
                pageButton.classList.add('news-page-button');
                pageButton.textContent = i;
                if (i === currentPage) {
                    pageButton.disabled = true;
                }
                pageButton.addEventListener('click', function () {
                    currentPage = i;
                    const activeFilter = document.querySelector('.news-filter-button.active').getAttribute('data-filter');
                    filterNews(activeFilter);
                });
                paginationContainer.appendChild(pageButton);
            }
        }
    }

    filterNews('all'); // Show all news when the page loads
});
