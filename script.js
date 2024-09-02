const itemsPerPage = 20; // Jumlah item per halaman
let currentPage = 1; // Halaman saat ini

async function getData() {
    const response = await fetch('./data.json');
    const data = await response.json();
    return data;
}

function renderData(data, page) {
    const friendList = document.getElementById('friend_list');
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const pageData = data.slice(start, end);

    const lists = `
        ${pageData.map(i => `
            <div class="card">
                <div class="data">
                    <img src="${i.fotoselfie}" alt="I${i.nama}" class="card-image" />
                    <div class="bos">
                        <span>${i.nama}</span>
                        <p>${parseInt(i.nim)}</p>
                    </div>
                </div>
                <div class="card-content">
                    <figcaption>
                        <span>TTL : ${i.ttl}</span><br />
                        <span>Alamat : ${i.alamat}</span><br />
                        <span>No HP : ${i.no}</span>
                    </figcaption>
                </div>
            </div>
        `).join("")}
    `;
    
    friendList.innerHTML = lists;
}

function renderPagination(totalItems) {
    const paginationContainer = document.getElementById('pagination-container');
    const pageCount = Math.ceil(totalItems / itemsPerPage);

    const paginationLinks = Array.from({ length: pageCount }, (_, i) => {
        const pageNumber = i + 1;
        return `
            <a href="#" class="${currentPage === pageNumber ? 'active' : ''}" data-page="${pageNumber}">
                ${pageNumber}
            </a>
        `;
    }).join("");

    paginationContainer.innerHTML = paginationLinks;
}

async function updatePage(page) {
    const data = await getData();
    renderData(data, page);
    renderPagination(data.length);
}

function setupPagination() {
    document.getElementById('pagination-container').addEventListener('click', (event) => {
        if (event.target.tagName === 'A') {
            event.preventDefault();
            currentPage = parseInt(event.target.getAttribute('data-page'));
            updatePage(currentPage);
        }
    });
}

async function init() {
    await updatePage(currentPage);
    setupPagination();
}

init();
