class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    }
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }
  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  /**
   * Добавление новой записи
   * @param code
   */
  onAddItemToCart(code) {
    const check = this.checkIfItemExistInCart(code);
    const nItem = this.state.list ? this.state.list.find(item => item.code === code) : null;
    if(check && nItem) {
      this.updateQty(code);
    }
    else if (nItem) {
      this.setState({
        ...this.state,
        cart: [...this.state.cart, { code: nItem.code, title: nItem.title, price: nItem.price, qty: 1 }]
      });
    }
  }

  /**
   * Удаление записи по коду
   * @param code
   */
  onDeleteItem(code) {
    this.setState({
      ...this.state,
      cart: this.state.cart.filter(item => item.code !== code)
    });
  }

  /**
   * update qty
   * @param code
   */
  updateQty(code) {
    const checkItem = this.state.cart ? this.state.cart.find((item) => item.code === code) : null;
    if(!checkItem) return this.onAddItemToCart(code);
    this.setState({
      ...this.state,
      cart: this.state.cart.map((item) => {
        if (item.code === code) {
          item.qty += 1;
        }
        return item;
      })
    });
  }

  /**
   * Выделение записи по коду
   * @param code
   */
  selectItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        if (item.code === code) {
          return {
            ...item,
            selected: !item.selected,
            count: item.selected? item.count: item.count+1 || 1
          };
        }
        return item.selected? {...item, selected: false} : item;
      })
    });
    this.updateQty(code);
  }
  /**
   * check if item exist or not in cart
   * @param code
   */
  checkIfItemExistInCart(code) {
    const checkItem = this.state.cart ? this.state.cart.find((item) => item.code === code) : null;
    if(checkItem) return true;
    return false; 
  }
  /**
   * Гарантировать уникальный ключ.
   * @param code
   * @returns {Number} Новый ключ.
   */
  generateKey(code) {
    let key, check = false;
    do {
      key = Math.floor((Math.random() * 10000000) + 1);
      check = this.state.list.some(item => key === item.code);
    } while (check);
    return key;
  }
}

export default Store;