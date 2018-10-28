# Building type-safe applications with Flow and GraphQL

We are going to build a React application that has extensive type-checking starting from the data fetching all the way to the individual UI components. We will learn how to marry together different type systems: GraphQL and Flow and how to use them in a context of a React application.

## How to run this project

```
npm install
npm start
```

## What we are going to do

1. Initialize flow and add flow npm script ([5b419d8](https://github.com/Showmax/type-safe-react-app-workshop/commit/5b419d856d7c20f1d897b46cf4dfcf3c983e9d79))	
2. Add flow-coverage-report and setup an npm script for it ([06e5987](https://github.com/Showmax/type-safe-react-app-workshop/commit/06e59871db8de053ae2a8f2b2072c4269b31eee2))
3. Add flow typing to the existing code ([7dd49fb](https://github.com/Showmax/type-safe-react-app-workshop/commit/7dd49fb198aae77c0cc3a94baa90f23b1205e0a8))
4. Fetch data on the Home page with react-apollo ([3a88636](https://github.com/Showmax/type-safe-react-app-workshop/commit/3a886368420dcaf94269ef45cf661c5863882146))
5. Add code generation with apollo-cli ([c9dc73a](https://github.com/Showmax/type-safe-react-app-workshop/commit/c9dc73a9026798c31380a30d7e8a24c844c03107))
6. Add favorites toggle to the Home page films ([b769f24](https://github.com/Showmax/type-safe-react-app-workshop/commit/b769f24b4a9bfc5232b707532a9f247f086a58dd))
7. Extract Film component and use fragment for data co-location ([94df6c3](https://github.com/Showmax/type-safe-react-app-workshop/commit/94df6c3e4e177148898b4ee4905c956d926e36e9))
8. Extract Home page data loading into HomePageData component ([7c1e5e3](https://github.com/Showmax/type-safe-react-app-workshop/commit/7c1e5e343464b9365cbed28c8c746f621c6fc12c))
