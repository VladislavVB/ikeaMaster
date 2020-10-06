const PARAM = {
    cat: 'category',
    subcat: 'subcategory',
    search: ['name', 'description', 'category', 'subcategory']
};

// Fetch call to server
export const getData = {
    url: 'database/dataBase.json',

    async getData(url) {

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Ошибка по адресу ${url}, статус ошибки ${response}');
        }
        return await response.json();
    },

    get(process) {
        this.getData(this.url)
            .then(process)
            .catch((err) => console.error(err));
    },
    // Get wishlist data from database by id
    wishList(list, callback) {
        this.get((data) => {
            const result = data.filter((item) => list.includes(item.id));
            callback(result);
        })
    },
    // Search item by id
    item(value, callback) {
        this.get((data) => {
            const result = data.find(item => item.id === value);
            callback(result);
        })
    },
    // Get cart items
    cart(list, callback) {
        this.get((data) => {
            const result = data.filter(item => list.
                some(obj => obj.id === item.id));
            callback(result);
        })
    },
    // Get items by category
    category(prop, value, callback) {
        this.get((data) => {
            const result = data.filter(item =>
                item[PARAM[prop]].toLowerCase() === value.toLowerCase());
            callback(result);
        })
    },
    // Search items
    search(value, callback) {
        this.get((data) => {
            const result = data.filter(item => {
                for (const prop in item) {
                    if (PARAM.search.includes(prop) && item[prop].toLowerCase().includes(value.toLowerCase())) {
                        return true;
                    }
                }
            })
            callback(result);
        })
    },
    // Get categories
    catalog(callback) {
        this.get((data) => {
            const result = data.reduce((arr, item) => {
                if (!arr.includes(item.category)) {
                    arr.push(item.category);
                }
                return arr;
            }, []);
            callback(result);
        })
    },
    // Get subcategories
    subcatalog(value, callback) {
        this.get((data) => {
            const result = data
                .filter(item => item.category === value)
                .reduce((arr, item) => {
                    if (!arr.includes(item.subcategory)) {
                        arr.push(item.subcategory);
                    }
                    return arr;
                }, []);
            callback(result);
        })
    }
};

