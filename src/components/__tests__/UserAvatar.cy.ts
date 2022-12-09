import { mount } from "cypress/vue";
import UserAvatar from "../UserAvatar.vue";

describe("UserAvatar", async () => {
  it("should load image", async () => {
    mount(UserAvatar, {
      props: {
        name: "Anonymous",
        avatar:
          "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/170.jpg",
      },
    });

    cy.get("img")
      .should("be.visible")
      .invoke("attr", "src")
      .should(
        "eq",
        "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/170.jpg"
      );
  });

  it("should fallback to team icon when avatar can't load", async () => {
    mount(UserAvatar, {
      props: {
        avatar: "file:///tmp/does.not.exist.png",
      },
    });

    cy.get("KIcon")
      .should("be.visible")
      .invoke("attr", "icon")
      .should("eq", "teamMember");
  });

  it("should render team member icon when no avatar", async () => {
    mount(UserAvatar);

    cy.get("KIcon")
      .should("be.visible")
      .invoke("attr", "icon")
      .should("eq", "teamMember");
  });
});
