# Slush Angular Components

Build Angular.js apps in a structured (component-based) way.

# Benefits

- Simple, high performance
- Production ready (used in production by a few large organizations)
- Fast development
- Component based structured
- Uses [John Papa](https://github.com/johnpapa/angular-styleguide) conventions

# Features

- Live reload development web server (browserSync)
- Babel (es2015) javascript compilation
- SCSS (node-sass)
- ESLint (recommended settings)
- Preprocessing HTML and Javascript (by using ```.env``` file)
- Iconfont pipeline (just put .svg's in ```icons``` directory, automatically creates iconfont)
- Use node_modules for frontend dependency management

# Installation

```
sudo npm install slush -g
sudo npm install slush-angular-components -g
```

# Usage

- Create a new folder for your project i.e. "my-todo-app"
- Run the following command:

```
slush angular-components
```

- Then run:

```
npm install
npm run dev
```

# Components?
Components are small, reusable parts of your application.

## Development components
All component files *DO NOT* need angular module definition, it happens for you!!

So you don't ever have to write this:

```javascript
angular.module('myApp').directive('myAwesomeDirective', myAwesomeDirective);
angular.module('myApp').controller('MyAwesomeController', MyAwesomeController);
```

Instead, the type is defined in the filename i.e. `dashboard.directive.js`, `dashboard.controller.js`

### Why?
I fucking hated the time it took to create the files alone, then always the same code repeating, fuck that shit,
so again: declare the type in the file.

### Directives
file name: `dashboard.directive.js`

```javascript
function dashboard () {
  return {
    restrict: 'E',
    templateUrl: 'dashboard/dashboard.html',
    controller: 'DashboardController',
    controllerAs: 'vm',
    bindToController: true,
    scope: {}
  }
}
```

### Controllers
file name: `dashboard.controller.js`

```javascript
function DashboardController () {
  var vm = this;
}
```

### Factories / services
file name: `users.factory.js`

```javascript
function users ($q, $http) {
  var getUser = function (userId) {
    return $http.get('/users/' + userId);
  }

  return {
    getUser: getUser
  }
}
```

### More (filters, config, run, constant)
check the demo content in the scaffolded version
