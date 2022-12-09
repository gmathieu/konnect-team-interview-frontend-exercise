# Welcome

Please take the time to read through all of the sections below; we want you to do great! :rocket:

Feel free to reach out to your recruiting contact with any questions or concerns.

## Goal

Modify the provided Vue 3 app to match [this mock](https://www.figma.com/file/swzJVL624G434CVdWi3FLv/Core-UI-Team-Project) as closely as possible while utilizing best-practices to improve the codebase and implement the functional requirements outlined below.

- The provided exercise files are a starting point and they have room for improvement; feel free to modify
- Don't treat the mock as gospel -- if you see things that don't make sense, ask questions or implement what you think is right
- In the exercise you are utilizing a local API; however, you should code your submission as if you are using a production API

### Links

- Figma Mock: <https://www.figma.com/file/swzJVL624G434CVdWi3FLv/Core-UI-Team-Project>

## Functional Requirements

- Vue 3 and TypeScript
- User should be able to view the name, a brief description, versions available, and other info shown in the mock for services
- User should be able to search for services ([See search endpoint details below](#searching-the-services-endpoint))
- User should be able to click on a service to view more details
- User should be able to paginate through services (client-side implementation)
- The create Service Package button doesn't have to be operable -- interacting with this elements could do nothing, could be fully implemented (stretch goal), or something in between
- Please update the `README` in the project with a section to describe your design considerations, assumptions, and trade-offs made during this exercise. Also feel free to include any notes about your submission

## Additional Considerations (if applicable)

- Routing and views (e.g. navigating to a given service from its card)
- The UI should be responsive and look great at different browser viewport sizes
- Pixel-perfect implementation
- State management with Pinia
- [Component Tests](#run-component-tests-with-cypress-component-testing) and/or [Unit Tests](#run-unit-tests-with-vitest)
- Other items covered in your Panel 1 interview

## Evaluation

We will review your code for quality and your ability to talk through it, how you approach the UI, and what tradeoffs you make. Specifically we'll be looking at the following:

- How closely your implementation matches the design along with the other [Functional Requirements](#functional-requirements)
- Code quality, including appropriate componentization and modularity
- TypeScript usage
- Coding (and Vue) best-practices
- How you dedicate the allotted time to focus on your strengths
- Code coverage, if applicable

## How to submit the project

You have up to a week to complete the exercise, but we don't expect you to spend more than a few hours on it.

When it's ready, please send your recruiter a link to the source code in a GitHub repository (no Pull Requests).

---

## Project Setup

```sh
yarn install --frozen-lockfile
```

### Compile and Hot-Reload for Development

Start the backend:

```sh
yarn server
```

Separately, start the frontend:

```sh
yarn dev
```

## Searching the services endpoint

The local API is available at `http://localhost:4001` after running `yarn server`.

Searching this endpoint is supported by passing a query string with a value to search with (case-insensitive): `/api/services?q={value}`

**Note**: The search endpoint evaluates all property values as a `string` to determine a match.

### Searchable properties

The search endpoint is configured to search the following fields for each service within the JSON response:

```ts
{
  id: string;
  name: string;
  description: string;
  type: string;
}
```

### Search example

If I wanted to search for a service with "dogs" in the service name, I would pass the name in the query string:

```sh
GET: /api/services?q=dogs
```

### Lint with ESLint

```sh
# Run the linter
yarn lint

# Fix linting errors
yarn lint:fix
```

### Build and Minify for Production

```sh
yarn build
```

### Run Component Tests with [Cypress Component Testing](https://docs.cypress.io/guides/component-testing/introduction)

Component test files must be located in the `/src/` directory and have a filename format of `*.cy.ts`

```sh
# Run component tests
yarn test:component

# or run the component tests in the Cypress UI
yarn test:component:open
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

Unit test files must be located in the `/src/` directory and have a filename format of `*.spec.ts`

```sh
# Run unit tests
yarn test:unit

# or run unit tests and view in the Vitest UI
yarn test:unit:ui

# or view test coverage via Vitest
yarn test:unit:coverage
```

### Committing Changes

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

At Kong, we utilize [Conventional Commits](https://www.conventionalcommits.org/) in all of our repositories. [Commitizen](https://github.com/commitizen/cz-cli) can be used to to help build and enforce commit messages.

If you're unfamiliar, it is **recommended** to use the following command in order to create your commits:

```sh
yarn commit
```

This will trigger the Commitizen interactive prompt for building your commit message.

## Exercise

Let me first state that this is my first time using Vue.js. It took me a little longer to iron out certain details and I'm sure some of my decisions weren't ideal (especially around when to use `setup`, `computed`, and `data`) but overall it was pretty easy to pick. I decided to stick with Vue.js for a couple reasons: I love learning new technologies, everything was already setup and ran perfectly, and it saved me time by leveraging Kongponents.

### DevX

First order or business: Prettier.

- Without a formatter, I spend too much time trying to make my code look pretty
- I didn't study which config would best match the existing codebase (ex. single quote, no semicolons...)
- I added a `.git-blame-ignore-revs` so `git blame` skips over the prettier commit

There's a couple more formatters I like to work with which sort imports, keys, unions, types... Not only is it one less thing to think about, it also reduces merge conflicts and adds consistency. `vue/attributes-order` didn't play nice with the new sorters so I didn't end up introducing them.

The rest of the developer experience was very good! The only thing I would add is husky + commitlint so commit messages are enforced outside of `yarn commit`.

Learnings: Prettier's formatting of Vue templates seems a little odd... Maybe there's some configuration that can be tweaked.

### Designs

I tend to favor design systems as the source of truth over mocks. I'd rather the UI match 90% of a mock using 100% Kongponents than perfect designs with custom components. It's an opportunity to circle back with the design team and move the design system forward (affecting the whole company vs just a page). Some of the most notable differences are: color, spacing, font size, and even functionality.

Before continuing any further, I copied a popular CSS reset to streamline browser defaults. I also set `box-sizing: border-box;` on all elements which makes sizing easier to reason about. Without border-box sizing, Kongponents are bigger than on the docs page. It would be good for the design system to provide its own reset.

Spacing differences are visible around the gutters. The mock's nav has 18px-20px gutter while the main body has 20px-60px gutter. Since neither of these numbers fit the presets, I decided to use a spacing of `5` (16px). I could have gone with `6` (24px) but small gutters helped with mobile. While we're on the subject of the nav, I purposefully omitted the nav items for a couple reasons: they'd point to empty pages, we have no concept of a current user, and the designs lacked relevant states (ex. active, hover, ...).

I had to adjust some of the text colors to fit into color presets. My philosophy there is to set a default color on the body (or a generic Text component) and only override it when absolutely necessary. Knowing where custom colors are applied makes it easier to introduce theming systems (ex. light/dark mode, branding...). Some of the grey text used in the mocks lowered the accessibility score by not providing enough contrast.

To help build a responsive page I added a `respond-to(screenSize)` SCSS mixin. A follow up would be to research a better styling system with mobile first in mind. Ideally such system would also provide type safety between styling and templates (ex. referencing a class name that exists).

#### Service Hub

The `KCatalogue` component provided most of the functionality I needed namely: cards and pagination. It felt a little bit like cheating but that's what a design system is for! You'll notice the `KPagination` component has evolved since the mock was created adding more functionality. I had to provide a few CSS overrides as there was no way to deeply customize this component. Such CSS overrides make me uncomfortable because they're brittle and easy to miss even if the component is fully tested. In this case, it was necessary as the default card size was way too small and neither `KCard` nor `KPagination` were responsive enough to work on mobile.

The `UserAvatar` component isn't part of the design system so I created one. If an avatar is not provided or doesn't load, the `teamMember` icon will be displayed. I also introduced a `UserAvatarGroup` component to group avatars with an overflow count. I like the philosophy YAGNI (You Ain't Gonna Need It) which is why I didn't add a prop to control the overflow count. To prevent avatars from bleeding into one another, I added a 2px border. The mocks had beautiful avatars with distinct backgrounds which isn't the case with User Generated Content. Keep in mind the border trick only works when the background is the same color which breaks when the theme changes.

I wanted to use the following interface but don't know how to access the list of children in Vue so relied on an array prop instead.

```jsx
<UserAvatarGroup>
  <UserAvatar v-for="user in users" :name="user.name" :avatar="user.avatar" />
</userAvatarGroup>
```

Within the card, take a look at the "X versions" button. It looks like a button but the interaction isn't obvious so I disabled it with `aria-disabled` and `tabindex="-1"`. The mock's button style didn't exist in the design system so I picked the one closest adding more contrast in the process. Finally, let's look at the service status. I made the assumption that if the API returned `configured=false` the service was "in progress." It might be a good idea to revisit the `disabled` icon (an X) used with "Not published" as it looks like a close button.

A nice follow up would be to save the state the pagination state (page, pageSize, query). My preference is to save this kind of state in the URL so state can be preserved when the URL is shared (this is a little more reliable with cursor based pagination).

#### Service page

Adding the Service page involved introducing a new route and component. In the process I abstracted the `PageLayout` component to handle title, description, breadcrumbs, and action slots.

The Service page has three states: loading, loaded, and not found.

Once loaded, a service's versions are displayed using `KTable` inside a `KCard`. By default there's no way to fully hide the headers row (even when all headers are marked as hidden). It ultimately provides more clarity so I decided to keep it. I took the liberty to split "Developer" and "Updated at" into two columns. I've learned over the years combined data points always end up being split into two columns. The mocks show two possible version type (HTTP, REST) but it only exists on the service (hence it's always repeated).

Adding the ability to delete a service was easy since Kongcomponents provided all the components: `KDropdown`, `KPrompt`, and `KToast`. I like to add an ellipsis (ex. "Delete service...") to actions that have a subsequent step. This is something operating systems use consistently (ex. "Save" vs "Save As..."). It's a subtle way to set expectations of what will happen.

Back on the service hub page, I updated each card to link to their respective page. Wrapping the whole card with a link would be semantically incorrect so I used a CSS trick which expands the click area to the whole card. Tab through each card to see the outline of the link placed around the title only.

### Data/stores

Working with REST APIs means dealing with lots of `any` types. Given that the BE is written in TypeScript it seemed like an easy win to expose typed API models for the UI to use. This was relatively quick and it gave me more confidence and better visibility. I also updated ESLint to enforce `@typescript-eslint/no-explicit-any`.

The `KCatalogue` component has its own store so all I had to provide was a fetcher function. When I introduced the Service page, I wanted to reuse a service store across both pages so introduced my own. This way, either page would call a `fetchOnce` action to populate the store. I didn't have to introduce a `GET /api/service/:id` because `GET /api/services` isn't paginated. Duplicating stores is typically a bad idea as their states can get out of sync. As a follow up, I would like to stop using `KCatalogue` in favor of `KCard` and `KPagination` and move search/pagination logic to the store.

The `serviceStore` stores services in a lookup by service ID and an array of IDs. This structure allows constant lookups while keeping the order in which services were added. I could have used a `Map` to accomplish the same thing but have learned over the years that stores work best as plain objects.

Finally I moved the fetcher function used by `KCatalogue` to a "fetcher" action with the same interface. I had to be careful to only store the full list of services (when fetcher is called without a query string).

Overall this store does an ok job. If this were a bigger application I would likely have a store for caching normalized data models. We would also introduce a better fetching layer and easier ways to handle async actions.

### Testing

I didn't spend too much time testing my work. One thing missing is the ability to view test coverage across unit and cypress tests.

Here's what I did:

- renamed `ServiceCatalogue.cy.ts` to `ServiceHubPage.cy.ts` and tweaked the test slightly
- added`UserAvatar.cy.ts` to handle img loading/fallback
- added `abbreviateInt.spec.ts` as there were lots of permutations types couldn't catch

### Follow ups

Here's a few follow ups I haven't already addressed above:

- Add document titles
- Add data error handling:
  - `KCatalogue` has that built-in
  - Service page shows "Not found"
  - Deleting a service is optimistic and assumes it was successful
