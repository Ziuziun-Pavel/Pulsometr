import data from '/db';
showCards();

function showCards() {
    class MenuCard {
        constructor(img, alt, title, descr, fls_price, tr_price, parentSelector) {
            this.img = img;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.fls_price = fls_price;
            this.tr_price = tr_price;     
            this.parent = document.querySelector(parentSelector);
        }
    
    render() {
        const element = document.createElement('div');
        element.style.cssText = `
            margin-top: 15px;
        `;
        element.innerHTML = `
            <img src=${this.img} alt=${this.alt} class="menu_card_img">
            <h3 class="menu_card_subtitle">${this.title}</h3>
            <div class="menu_card_descr">${this.descr}</div>
            <div class="menu_card_details"><a href="#">ПОДРОБНЕЕ</a></div>
            <div class="menu_card_devider"></div>
            <div class="menu_card_false-price">${this.fls_price}</div>
            <div class="menu_card_true-price">${this.tr_price}</div>
            <button class="button button_catalog">КУПИТЬ</button>
        `;
        this.parent.append(element);
    }
    }
        data.forEach(({img, alt, title, descr, fls_price, tr_price, }) => {
            new MenuCard(img, alt, title, descr,  fls_price, tr_price, ".catalog__menu").render();
    });
        };
    
 