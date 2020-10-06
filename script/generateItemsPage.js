import generateCatalog from './generateCatalog.js';
import { getData } from './getData.js';
import userData from './userData.js';

const COUNTER = 2

const mainHeader = document.querySelector('.main-header');

const generateItemsPage = () => {

    const generateCards = (data) => {

        const itemsList = document.querySelector('.goods-list');

        itemsList.textContent = '';

        if (!data.length) {
            const goods = document.querySelector('.goods');
            goods.textContent = location.search === '?wishlist' ?
                'Список желаний пуст' :
                'К сожалению, по вашему запросу ничего не найдено';
        }

        // Render item cards
        data.forEach(item => {

            const { id, price, description, img, name, count } = item;

            itemsList.insertAdjacentHTML('afterbegin', `
                <li class="goods-list__item">
                <a class="goods-item__link" href="card.html#${id}">
                    <article class="goods-item">
                        <div class="goods-item__img">
                            <img src=${img[0]} alt="${name}">
                        </div >
                        ${count > COUNTER ? '<p class="goods-item__new">Новинка</p>' : ''}
                        ${!count ? '<p class="goods-item__new">Нет в наличии</p>' : ''}
                        <h3 class="goods-item__header">${name}</h3>
                        <p class="goods-item__description">${description}</p>
                        <p class="goods-item__price">
                            <span class="goods-item__price-value">${price}</span>                                                                   
                            <span class="goods-item__currency"> ₽</span>
                        </p>
                        <button class="btn btn-add-card" aria-label="Добравить в корзину" data-idd="${id}"></button>
                    </article >
                </a >
            </li >
            `);
        })
        itemsList.addEventListener('click', e => {

            const btnAddCard = e.target.closest('.btn-add-card');
            if (btnAddCard) {
                e.preventDefault();
                userData.cartList = btnAddCard.dataset.idd;
                console.log(userData.cartList)
            }
        })
    };

    if (location.pathname.includes('goods') && location.search) {
        const search = decodeURI(location.search);
        const prop = search.split('=')[0].slice(1);
        const value = search.split('=')[1];

        if (prop === 's') {
            getData.search(value, generateCards);
            mainHeader.textContent = `Поиск: ${value} `;
        } else if (prop === 'wishlist') {
            getData.wishList(userData.wishList, generateCards);
            mainHeader.textContent = `Список желаний`;
        } else if (prop === 'cat' || prop === 'subcat') {
            getData.category(prop, value, generateCards);
            mainHeader.textContent = value;
        }
    }

};

export default generateItemsPage;

