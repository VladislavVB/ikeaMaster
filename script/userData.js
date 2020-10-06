import { getLocalStorage, setLocalStorage } from './storage.js';

const userData = {
    wishListData: getLocalStorage('wishlist'),
    get wishList() {
        console.log(this.wishListData);
        return this.wishListData;
    },
    set wishList(id) {
        if (this.wishListData.includes(id)) {
            const index = this.wishListData.indexOf(id);
            this.wishListData.splice(index, 1);
        } else {
            this.wishListData.push(id);
        }
        setLocalStorage('wishlist', this.wishList);
    },
    cartListData: getLocalStorage('cartlist'),
    get cartList() {
        return this.cartListData
    },
    set cartList(id) {
        let obj = this.cartListData.find(item => item.id === id);
        if (obj) {
            obj.count++
        } else {
            obj = {
                id,
                count: 1,
            };
            this.cartListData.push(obj);
        }
        setLocalStorage('cartlist', this.cartList);
    },
    set changeCountCartList(itemCart) {
        let obj = this.cartListData.find(item => item.id === itemCart.id);
        obj.count = itemCart.count;
        setLocalStorage('cartlist', this.cartList);
    },
    set deleteItemCart(idd) {
        let index = -1;
        this.cartList.forEach((item, i) => {
            if (item.id === idd) {
                index = i;
            }
        });
        this.cartList.splice(index, 1);
        setLocalStorage('cartlist', this.cartList);
    }
};

export default userData;