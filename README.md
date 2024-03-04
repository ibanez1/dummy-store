
# Project Title

DUMMY SHOP

An Nx and Angular project 

    username: kminchelle
    pw: 0lelplR

# Description

Aa sign-in page to gain access to the list of products where only authorised user
has access to this content.

The product list page is the homepage and displays a list of
products. Every product preview contains the thumbnail, the title, the description,
and the price. Also, a button to toggle the product as favorite or not favorite.

The favorite products page displays a list of favorite products for the current user. Every product preview contains the thumbnail, the title, the description, and the price of the product. Also, a button to toggle it as favorite (or not favorite).

- Angular 17
- Nx monorepo
- SSR: Native Angular server side rendering for First Contentful Paint (FCP) 
- Netlify deployment
- Login /Logout
- Pagination
- Ngrx Store for managing app state
- Use of signals for better performance
- Standalone components
- SCSS for styles
- Rxjs
- On-Push strategy
- Centralized service for app requests
- Unit testing with Jest
- Guard routes for unauthorixed users

    


## Demo

https://dummyshopping.netlify.app


## Tech Stack

**Client:** Angular 17, Nx, SCSS, NGRX, Rxjs

**Server:** https://dummyjson.com


## Authors

- [@ibanez1](https://github.com/ibanez1)


## API Reference
https://dummyjson.com

#### Login Access

```http
  POST /auth/login
```

fetch('https://dummyjson.com/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    
    username: 'kminchelle',
    password: '0lelplR',
    // expiresInMins: 60, // optional
  })
})
.then(res => res.json())
.then(console.log);

#### Get all products

```http
  GET /auth/products
```

| header    | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `token  ` | `string` | **Required**. Your token   |

Limit and skip products:

ex: 'https://dummyjson.com/products?limit=10&skip=10&select=title,price'

#### More endpoints

Add Product → https://dummyjson.com/auth/products/add
● Update Product → https://dummyjson.com/auth/products/{id}
● Delete Product → https://dummyjson.com/auth/products/{id}

## Running Tests

To run tests, run the following command

```bash
  npx nx run dummyshop:test
```


## Screenshots

![App Login] 
https://ibb.co/tK4wH4t

![App Porducts]
https://ibb.co/cxm6LYn

![App Porducts]
https://ibb.co/6JSxHbR



## Nx

# DummyshopWorkspace

<a alt="Nx logo" href="https://nx.dev" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="45"></a>

✨ **This workspace has been generated by [Nx, Smart Monorepos · Fast CI.](https://nx.dev)** ✨


## Start the app

To start the development server run `nx serve dummyshop`. Open your browser and navigate to http://localhost:4200/. Happy coding!


## Generate code

If you happen to use Nx plugins, you can leverage code generators that might come with it.

Run `nx list` to get a list of available plugins and whether they have generators. Then run `nx list <plugin-name>` to see what generators are available.

Learn more about [Nx generators on the docs](https://nx.dev/features/generate-code).

## Running tasks

To execute tasks with Nx use the following syntax:

```
nx <target> <project> <...options>
```

You can also run multiple targets:

```
nx run-many -t <target1> <target2>
```

..or add `-p` to filter specific projects

```
nx run-many -t <target1> <target2> -p <proj1> <proj2>
```

Targets can be defined in the `package.json` or `projects.json`. Learn more [in the docs](https://nx.dev/features/run-tasks).

## Want better Editor Integration?

Have a look at the [Nx Console extensions](https://nx.dev/nx-console). It provides autocomplete support, a UI for exploring and running tasks & generators, and more! Available for VSCode, IntelliJ and comes with a LSP for Vim users.

## Ready to deploy?

Just run `nx build demoapp` to build the application. The build artifacts will be stored in the `dist/` directory, ready to be deployed.

## Set up CI!

Nx comes with local caching already built-in (check your `nx.json`). On CI you might want to go a step further.

- [Set up remote caching](https://nx.dev/features/share-your-cache)
- [Set up task distribution across multiple machines](https://nx.dev/nx-cloud/features/distribute-task-execution)
- [Learn more how to setup CI](https://nx.dev/recipes/ci)

## Explore the Project Graph
Run `nx graph` to show the graph of the workspace.
It will show tasks that you can run with Nx.
