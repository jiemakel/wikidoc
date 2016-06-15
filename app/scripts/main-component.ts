namespace app {
  'use strict'

  export class MainComponentController {
    constructor() {
      
    }
  }

  export class MainComponent implements angular.IComponentOptions {
    public controller: Function = MainComponentController
    public templateUrl: string = 'partials/main.html'
  }
}
