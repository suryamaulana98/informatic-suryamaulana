function getData() {
    const data = fetch('./data.json').then(res => res.json())
    return data
}

async function friendListElemet() {
    const friendList = document.getElementById('friend_list');
    const data = await getData()

    const lists  = `
        ${data.map(i => `
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

    return friendList.innerHTML = lists
}

friendListElemet()