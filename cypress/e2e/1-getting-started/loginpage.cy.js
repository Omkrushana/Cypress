describe("Lighthouse Login Page", () => {
  beforeEach(() => {
    // Visit the login page
    cy.visit("https://es.lighthouse-learning.com/");
  });
  // ------------------------1------------------------ Login page elements test
  it("should display the login page correctly", () => {
    // Logo
    cy.get(".responsive-img").should("be.visible");

    cy.get("h6").should("have.text", "Please select your role");
    // Check elements student, staff, parent present
    cy.get(".role-type-wrapper > :nth-child(1)").should("be.visible");
    cy.get(".role-type-wrapper > :nth-child(1)").should("have.class", "active");
    cy.get(".role-type-wrapper > :nth-child(2)").should("be.visible");
    cy.get(".role-type-wrapper > :nth-child(3)").should("be.visible");

    cy.get('input[placeholder="Please enter any of the above"]').should(
      "be.visible"
    ); //Enrolment input
    cy.get('input[placeholder="Please enter your password"]').should(
      "be.visible"
    ); //password input
    cy.contains("Forgot Password?").should("be.visible"); //Forget password link
    cy.get('button:contains("Proceed")').should("be.visible"); //Proceed button
    cy.get(".ant-btn-block").should("be.visible"); //Login using otp btn
    cy.contains("Privacy").should("be.visible");
    cy.contains("Terms").should("be.visible");
    cy.contains("support.argus@lighthouse-learning.com").should("be.visible");
  });
  // Changes in form according to  User role start
  // ------------------------2------------------------
  it('should display "Enrollment Number / Phone Number / User ID" for Student', () => {
    // Click on Student button
    cy.get(".role-type-wrapper > :nth-child(1)").click();

    // Check the placeholder text for the Student role
    cy.get('.ant-form-item-is-validating > .ant-form-item-label > .ant-form-item-required').should(
      "have.text",
      "Enrollment Number / Phone Number / User ID"
    );
  });
// ------------------------3------------------------
  it('should change to "Email Address / Phone Number / User ID" for Staff', () => {
    // Click on Staff button
    cy.get(".role-type-wrapper > :nth-child(2)").click();

    // Check the placeholder text for the Staff role
    cy.get('.ant-form-item-is-validating > .ant-form-item-label > .ant-form-item-required').should(
      "have.text",
      "Email Address / Phone Number / User ID"
    );
  });
// ------------------------4------------------------
  it('should change to "Email Address / Phone Number / User ID" for Parent', () => {
    // Click on Parent button
    cy.get(".role-type-wrapper > :nth-child(3)").click();

    // Check Text
    cy.get('.ant-form-item-is-validating > .ant-form-item-label > .ant-form-item-required').should(
      "have.text",
      "Email Address / Phone Number / User ID"
    );
  });
// ------------------------5------------------------
  it("should allow typing into the Enrollment Number/User ID field", () => {
    const username = Cypress.env("username");
    cy.get(".role-type-wrapper > :nth-child(1)").should("have.class", "active");
    cy.get(".ant-form-item-control-input-content > .ant-input").type(username);
    cy.get(".ant-form-item-control-input-content > .ant-input").should(
      "have.value",
      username
    );
  });
// ------------------------6------------------------
  it("should allow slow typing into the Enrollment Number/User ID field", () => {
    const username = Cypress.env("username");

    cy.get(".ant-form-item-control-input-content > .ant-input").type(username, {
      delay: 100,
    }); //delay 0.1 sec
    cy.get(".ant-form-item-control-input-content > .ant-input").should(
      "have.value",
      username
    );
  });
  // ------------------------7------------------------
  it("should allow typing into the password field", () => {
    const password = Cypress.env("password");
    cy.get('input[placeholder="Please enter your password"]').type(password);
  });
  // ------------------------8------------------------
  it("should allow the user to log in using the provided credentials", () => {
    const username = Cypress.env("username");
    const password = Cypress.env("password");
    cy.get('input[placeholder="Please enter any of the above"]').type(username);

    cy.get('input[placeholder="Please enter your password"]').type(password);

    // Click the login button
    cy.get("button").contains("Proceed").click();

    //  verify successful login
    // cy.url().should("include", "/dashboard");
  });
// ------------------------9------------------------
  it("should hide the password field when a valid phone number is entered", () => {
    cy.get(".ant-form-item-control-input-content > .ant-input").type(
      "9611118310"
    );

    // the password field is hidden
    cy.get("#normal_login_password").should("not.exist");
  });
// ------------------------10------------------------
  it("should display validation errors for empty fields", () => {
    // Click the Proceed Btn
    cy.get("button").contains("Proceed").click();

    // Assert Error message
    cy.get(
      ":nth-child(1) > .ant-form-item-control > .ant-form-item-explain > div"
    ).should(
      "contain",
      "Please enter a valid enrollment number, phone number or user id"
    );

    // Assert Error Message
    cy.get(
      ".form_item_password > .ant-form-item-control > .ant-form-item-explain > div"
    ).should("contain", "Please enter password!");
  });
// ------------------------11------------------------
  it("should display validation error when enrollment number/phone number/user id is empty", () => {
    // Only enter password, leave the enrollment number/user ID field blank
    cy.get("#normal_login_password").type("Password123");

    // Click Proceed
    cy.get("button").contains("Proceed").click();

    // Assert 
    cy.get(
      ":nth-child(1) > .ant-form-item-control > .ant-form-item-explain > div"
    ).should(
      "contain",
      "Please enter a valid enrollment number, phone number or user id"
    );
  });
// ------------------------12------------------------
  it("should display validation error when password is empty", () => {
    // Only enter enrollment number/user ID, leave the password field blank
    cy.get('input[placeholder="Please enter any of the above"]').type(
      "12345678"
    );

    // Click Proceed
    cy.get("button").contains("Proceed").click();

    // Assert the error message for empty password
    cy.get(
      ".form_item_password > .ant-form-item-control > .ant-form-item-explain > div"
    ).should("contain", "Please enter password!");
  });
// ------------------------13------------------------
  it("should display validation error for invalid username in OTP login", () => {
    // Click LoginBtn
    cy.get(".ant-btn-block").click();

    // Assert
    cy.get(".ant-message-custom-content > :nth-child(2)") 
      .should("be.visible");
  });
// ------------------------14------------------------
  it("should allow the user to login using OTP", () => {
    const username = Cypress.env("username");
    cy.get('input[placeholder="Please enter any of the above"]').type(username);

    // Click the 'Login Using OTP' button
    cy.get(".ant-btn-block").click();

    // Assertions  
    // cy.url().should("include", "/otp-login"); //need proper username to test otp sent successfully 
  });
// ------------------------15------------------------
  it("should redirect to the Forgot Password page when clicked", () => {
    cy.contains("Forgot Password?").click();
    cy.url().should("include", "/forget-password");
  });
});
