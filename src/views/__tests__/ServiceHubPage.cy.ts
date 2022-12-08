import { mount } from "cypress/vue";
import ServiceHub from "../ServiceHubPage.vue";
import Kongponents from "@kong/kongponents";
import { setActivePinia, createPinia } from "pinia";

describe("ServiceHubPage", async () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("shows a search input", async () => {
    cy.intercept(
      {
        method: "GET",
        url: "/api/services",
      },
      []
    );
    mount(ServiceHub, {
      global: {
        plugins: [Kongponents],
      },
    });

    cy.get("input[type='search']")
      .should("be.visible")
      .invoke("attr", "placeholder")
      .should("eq", "Search");
  });
});
