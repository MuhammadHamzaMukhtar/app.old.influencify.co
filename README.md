# Getting Started with Influencify

This project using following technologies

- React Js
- Redux for state management
- Axios for api calling
- Tailwind css for css classes
- Headless ui npm package for dropdowns and popups

These are main technologies used in our app

**Influencify**

We have main route files in our project in following locations

- route/index.js

- route/brand/index.js

- route/influencer/index.js

If we want to search for specific component in our project we can do as follows

- Find url for specific page in your browser if your url contains word brand then search for specific url in this location **route/brand/index.js** \*\*

> example url

**http://localhost:3000/brand/dashboard**

- If your url contains word Influencer then search for specific url in this location **route/influencer /index.js**

> example url

**http://localhost:3000/influencer/dashboard**

- If your url contains nor Influencer or not brand then search for specific url in this location **route/index.js**

> example url

**http://localhost:3000/discovery**

When we refactor our project we find some components their urls are not used anywhere in our app so instead of deleting those components we save those components in this folder **src/unusedcomponents**

So in future if we find any component that are used in our project but its located in unusedcomponents folder

In that case we move that component to its original location

These are main structure of our project that are needed to know to start working on this project **Influencify**
