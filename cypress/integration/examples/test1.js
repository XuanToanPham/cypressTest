describe("Emty Test", () => {
  beforeEach(() => {
    cy.viewport(1920, 900);
    cy.visit("https://test.shinhansec.com.vn/");
  });
  it("test one", () => {
    cy.get('.ant-modal-content button[type = "button"]', {
      timeout: 30 * 1000,
    }).should("be.visible");
    cy.get('.ant-modal-content button[type = "button"]').click();
    cy.get('.ant-modal-content button[type = "button"]').click();
    cy.get('.header-bar-col-action a[href = "/login"]').should("exist");
    cy.contains("Đăng nhập").click();
    cy.get("#id_username").type("001460");
    cy.get("#id_pass").type("Hello01!");
    cy.get(".login-form-button").click();
  });
});
