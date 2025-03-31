# Hotel Admin - for mobile

This is a tourism web / mobile application built with **Angular v19.2.4**. The application allows administrators to list their hotels, view detailed information about their hotels, delete, and edit their hotels.

You can test the deployed application [here](https://tourism-angular.web.app/)

<div align="center">
  <img alt="Application image" src="https://vargaae.hu/images/projects/szallashu-2025-03-31_1.png" height="600" />
</div>

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Development](#development)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [License](#license)

## Features

- Mobile first responsive design (for mobile and desktop)
- View detailed information about hotels (name, description/city, price, opening date, closing date, image)
- Authentication
- Allows administrators to list their hotels
- Allows administrators to edit or delete hotels

<div align="center">
  <img alt="Application image" src="https://vargaae.hu/images/projects/szallashu-2025-03-31_2.png" height="600" />
</div>

## Technologies

- [Angular v19](https://angular.io/) - Frontend framework
- [RxJS](https://rxjs.dev/) - Reactive programming
- [TypeScript](https://www.typescriptlang.org/) - Strongly typed programming language
- [Angular Material](https://material.angular.io/) - UI component library
- [Firebase](https://firebase.google.com/) - Backend as a service
- [Sass](https://sass-lang.com/) - Styling
- [ngx-infinite-scroll](https://www.npmjs.com/package/ngx-infinite-scroll) - Angular Infinite Scroll

## Installation

To run this application locally, you need to have [Node.js](https://nodejs.org/) installed.

1. Clone the repository:

   ```bash
   git clone https://github.com/vargaae/szallashu-admin.git
   cd szallashu-admin
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   - Create an `environment.ts` file in the `src/environments` folder and configure the necessary API keys for Firebase Authentication.

   Example `environment.ts` / `environment.development.ts`:

   ```bash
   export const environment = {
   production: true,
   firebase : {
    apiKey: "your-firebase-api-key",
    authDomain: "fir-demo-57c5b.firebaseapp.com",
    databaseURL: "https://fir-demo-57c5b-default-rtdb.firebaseio.com",
    projectId: "fir-demo-57c5b",
    storageBucket: "fir-demo-57c5b.appspot.com",
    messagingSenderId: "324370600645",
    appId: "1:324370600645:web:372ec77189de0da28756ac",
    measurementId: "G-DVJBQPJX6L"
   }
   };
   ```

## Running the Application

After installing the dependencies, you can start the development server:

```bash
ng serve
```

Open your browser and navigate to `http://localhost:4200`. The app will automatically reload if you make any changes to the source files.

## Development - Tests with [Karma Jasmine HTML Reporter](https://github.com/dfederm/karma-jasmine-html-reporter)

### Running Unit Tests

#### AdminListComponent
  - should load initial hotels on init
  - should append new hotels on appendData
  - should increase page number and call appendData on scroll
#### HotelService
  - should return a specific hotel by ID
  - should update a hotel correctly
  - should delete a hotel correctly

<div align="center">
  <img alt="Application image" src="https://vargaae.hu/images/projects/szallashu-test-2025-03-31-git.png" width="700" />
</div>

You can run unit tests using the following command:

```bash
ng test
```

## Folder Structure

The key folders of the project are as follows:

```
src/
│
├── app/                  # Main Angular app module and components
│   ├── admin/            # Hotel ADMIN modules/standalone components
│       ├── components/   # Reusable components: hotel-list, hotel-detail
│       ├── services/     # Services for API interactions
│       └── models/       # TypeScript interfaces and models
│   ├── auth/             # AUTHENTICATION modules/standalone components
│       └── components/   # Reusable components: dashboard, login, registration, user
│   ├── core/             # CORE modules
│       └── components/   # Reusable components: navbar
│   └── shared/           # SHARED
│       ├── services/     # Services for AUTH, USER interactions
│       ├── models/       # TypeScript interfaces and models
│       └── components/   # Reusable components: shared -> ViewEncapsulation.None -> for global styling
│
├── assets/               # Static assets such as images and icons
├── environments/         # Environment configurations (development, production)
```

## License

This project is licensed under the MIT License.
