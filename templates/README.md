# <%= appName %>
<%= appDescription %>

# Requirements

- Node.js
- Gulp.js

# Installation

```
npm install
```

# Create .env file
Create a ".env" file at the root of your project (do not commit this file). The content of this file can be accessed in HTML / Javascript. For example:

.env
```
MODULE_NAME=myApp
```

```javascript
var moduleName = '/* @echo MODULE_NAME */';
```

```html
<html ng-app="<!-- @echo MODULE_NAME -->">
```

# Development

```
npm run dev
```

# Distribution

```
npm run dist
```
