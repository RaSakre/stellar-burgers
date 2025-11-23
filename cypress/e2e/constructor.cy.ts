const API_URL = 'https://norma.nomoreparties.space/api';

const fakeToken = 'fakeToken';

beforeEach(() => {
  window.localStorage.setItem('accessToken', fakeToken);
  window.localStorage.setItem('refreshToken', fakeToken);
  cy.fixture('mockIngredients.json').then((mockIngredients) => {
    cy.intercept('GET', `${API_URL}/ingredients`, {
      statusCode: 200,
      body: mockIngredients
    }).as('getIngredients');
  });

  cy.fixture('mockAuthData.json').then((authData) => {
    cy.intercept('POST', `${API_URL}/auth/login`, {
      statusCode: 200,
      body: authData
    }).as('login');
  });

  cy.fixture('orderMockData.json').then((orderData) => {
    cy.intercept('POST', `${API_URL}/orders`, {
      statusCode: 200,
      body: orderData
    }).as('makeOrder');
  });

  cy.visit('/login');
  cy.get('[name=email]').type('rn@yandex.ru');
  cy.get('[name=password]').type('qwerty123');
  cy.get('button').contains('Войти').click();
  cy.wait('@login');
  cy.wait('@getIngredients');
});

afterEach(() => {
  cy.clearCookies();
  cy.clearLocalStorage();
});

describe('Тесты модальных окон', () => {
  const getBunId = () => {
    return cy.fixture('mockIngredients.json').then(({ data }) => {
      const bun = data.find((item: any) => item.type === 'bun');
      expect(bun).to.exist;
      return bun._id;
    });
  };

  const openModal = (id: string) => {
    cy.get(`[data-cy="burger_ingredient ${id}"]`).click();
    cy.url().should('include', `/ingredients/${id}`);
  };

  const closeModal = () => {
    cy.get('[data-cy="modal_overlay"]').click({ force: true });
    cy.url().should('include', '/');
  };

  const closeModalWithButton = () => {
    cy.get('[data-cy="modal_close-button"]').click();
    cy.url().should('include', '/');
  };

  it('проверка открытия модального окна при клике на булку', () => {
    getBunId().then((id) => {
      openModal(id);
    });
  });

  it('проверка закрытия модального окна при клике на оверлей', () => {
    getBunId().then((id) => {
      openModal(id);
      closeModal();
    });
  });

  it('проверка закрытия модального окна при клике на крестик', () => {
    getBunId().then((id) => {
      openModal(id);
      closeModalWithButton();
    });
  });
});

describe('Создание заказа', () => {
  it('проверка создания заказа', () => {
    cy.fixture('mockIngredients.json').then(({ data }) => {
      const ingredients = {
        bun: data.find((ingr: any) => ingr.type === 'bun'),
        main: data.find((ingr: any) => ingr.type === 'main'),
        sauce: data.find((ingr: any) => ingr.type === 'sauce')
      };

      Object.values(ingredients).forEach((ingredient) => {
        expect(ingredient).to.exist;
      });

      Object.entries(ingredients).forEach(([key, ingredient]) => {
        cy.get(`[data-cy="burger_ingredient ${ingredient._id}"]`)
          .contains('Добавить')
          .click();
      });

      const constructorSelector = "[data-cy='burger_constructor']";
      cy.get(constructorSelector).as('constructor');

      Object.values(ingredients).forEach((ingredient) => {
        cy.get('@constructor').contains(ingredient.name);
      });
    });

    cy.get('button').contains('Оформить заказ').click().wait('@makeOrder');

    cy.fixture('orderMockData.json').then(({ order }) => {
      cy.get('#modals').contains(order.number);
    });

    cy.get('#modals button').click({ multiple: true, force: true });

    cy.url().should('include', '/');
    const constructorSelector = "[data-cy='burger_constructor']";
    cy.get(constructorSelector).contains('Выберите булки');
    cy.get(constructorSelector).contains('Выберите начинку');
  });
});
