# leandata-project
The project is inside of LeanData folder. Do actions below in the folder
## Dependencies
First, install Angular:

 npm install -g @angular/cli
See more details here: https://angular.io/guide/setup-local

Secondly, install Ionic:

 npm install -g @ionic/cli
If you have Ionic already, you may have to uninstall and reinstall it.

 npm uninstall -g ionic
 npm install -g @ionic/cli
See more details here: https://ionicframework.com/docs Additionally, download jQuery (https://jquery.com/download/) and verify that the ng2-search-filter is installed as well (https://www.npmjs.com/package/ng2-search-filter).

## Run the project
type following command:
```
 ionic serve
```

## About this project
### brief summary of the project
By using Angular and Ionic, I made two-way binding tables with Observable.
### how you chose which framework/library to use
I used rxjs to make it reactive by using BehaviorSubject and Observable.
### design/implementation tradeoffs made (where applicable)
Instead of using FormArray and FormGroup I made the application only with Observable. The reason I decided to do that is because the use case was simple, lessen overhead, and write the code within the deadline. The deleteUsers operation caused extra runtime because it is needed to run deleteExpense for all expense. If I have more time for the project, I will look into it to make it simpler. I executed totalcost to not doing loop over for each category and each users
