describe('Capturing data sent by the form via POST method', () => {
	const dataXhr = [];
	beforeEach(() => {
		cy.viewport(1920, 900);
		cy.intercept({
			method: '+(POST|GET)',
			url: '/market/?*'
		}).as('wssMarket');
		cy.intercept({
			method: '+(POST|GET)',
			url: '/services/?*'
		}).as('wssServices');
		cy.visit('https://test.shinhansec.com.vn/');
	});
	it('Check connection wssMarket adn wssServices', () => {
		cy.get('.ant-modal-content button[type = "button"]', {
			timeout: 30 * 1000
		}).should('be.visible');
		cy.get('@wssMarket.all').then(xhrs => {
			xhrs.forEach(xhr => {
				cy.log('Method : ', xhr.request.method);
				cy.log('URL:', xhr.request.url);
				expect(xhr.response.statusCode).to.eq(200);
			});
		});
		cy.get('@wssServices.all').then(xhrs => {
			xhrs.forEach(xhr => {
				cy.log('Method : ', xhr.request.method);
				cy.log('URL:', xhr.request.url);
				expect(xhr.response.statusCode).to.eq(200);
			});
		});
	});
	it('Check Login Handler', () => {
		cy.get('.ant-modal-content button[type = "button"]', {
			timeout: 30 * 1000
		}).should('be.visible');
		cy.get('.ant-modal-content button[type = "button"]').click();
		cy.get('.ant-modal-content button[type = "button"]').click();
		cy.get('.header-bar-col-action a[href = "/login"]').should('exist');
		cy.contains('Đăng nhập').click();
		cy.get('#id_username').type('001460');
		cy.get('#id_pass').type('Hello01!');
		cy.intercept({
			method: 'POST',
			url: '/file/nameavatar'
		}).as('AvatarUser');
		cy.get('.login-form-button').click();

		cy.wait('@AvatarUser').then(xhr => {
			console.log(xhr);
		});
	});
});
