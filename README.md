# freshthought-ui
Angular Material Design Functional Components

Generate new library

```ts
ng generate library cdk 
```

Generate new componant

```ts
ng generate component ActionMenu --standalone --flat --path projects/material/action-menu
ng generate service  --path projects/cdk/device
```

## References

1. [Create Standalone Components](https://sandroroth.com/blog/angular-library)
2. [Create Angular Schematics](https://blog.angular.io/schematics-an-introduction-dc1dfbc2a2b2)
3. [Angular 17 Control Flow (for, if)](https://www.techiediaries.com/angular-17-new-control-flow-examples/)

## Todo:

1. Husky setup
2. Publish to npm registry pipeline in github packages - Done
3. Create custome Schematics
4. Setup the pipeline for CI and Publish the components and schematics to npm registry - Done
5. Create Action Bar component - Manikandan
6. Create Breadcremp Component - Manikandan
7. Create JsonForm Component - Manikandan
8. Create Theme / Load dynamic theme  - Manikandan
8. Create Grid Component
9. Create popup Component
10. Create Button with waiting for response
11. prettier --write setup


## HUSKY setup

1. install husky dotnet tool
2. run `husky install` command
3. add pre-commit commands.
    ex. `husky add pre-commit -c "npm run doctor"`


## VSCode Plugins
1. Angular Language Service >= v17.0.3
2. ESLint >= v2.4.2
3. JavaScript and TypeScript Nightly >= v5.4.20231217
4. 