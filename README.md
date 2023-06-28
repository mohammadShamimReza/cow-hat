# Project Name

Short description of your project.

## Live Link

[https://digital-cat-hut.vercel.app/](https://digital-cat-hut.vercel.app/)

## Application Routes

### User

- `POST` https://digital-cat-hut.vercel.app/api/v1/auth/signup
- `GET` https://digital-cat-hut.vercel.app/api/v1/users
- `GET` https://digital-cat-hut.vercel.app/api/v1/users/64957b5d516f178cdfef1906 (Single GET, include an ID saved in your database)
- `PATCH` https://digital-cat-hut.vercel.app/api/v1/users/64957b5d516f178cdfef1906 (include an ID saved in your database)
- `DELETE` https://digital-cat-hut.vercel.app/api/v1/users/64957b5d516f178cdfef1906 (include an ID saved in your database)

### Cows

- `POST` https://digital-cat-hut.vercel.app/api/v1/cows
- `GET` https://digital-cat-hut.vercel.app/api/v1/cows
- `GET` https://digital-cat-hut.vercel.app/api/v1/cows/6495ba7ac960573243f7e551 (Single GET, include an ID saved in your database)
- `PATCH` https://digital-cat-hut.vercel.app/api/v1/cows/6495ba7ac960573243f7e551 (include an ID saved in your database)
- `DELETE` https://digital-cat-hut.vercel.app/api/v1/cows/6495ba7ac960573243f7e551 (include an ID saved in your database)

### Pagination and Filtering routes of Cows

- `GET` https://digital-cat-hut.vercel.app/api/v1/cows?pag=1&limit=10
- `GET` https://digital-cat-hut.vercel.app/api/v1/cows?sortBy=price&sortOrder=asc
- `GET` https://digital-cat-hut.vercel.app/api/v1/cows?minPrice=1000&maxPrice=70000
- `GET` https://digital-cat-hut.vercel.app/api/v1/cows?location=Chattogram
- `GET` https://digital-cat-hut.vercel.app/api/v1/cows?searchTerm=Cha

### Orders

- `POST` https://digital-cat-hut.vercel.app/api/v1/orders
- `GET` https://digital-cat-hut.vercel.app/api/v1/orders

## Installation

Use the package manager [npm](https://www.npmjs.com/) to install the project.

```bash
npm install
