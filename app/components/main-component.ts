namespace app {
  'use strict'

  export class MainComponentController {
    constructor() {

    }
  }

  export class MainComponent implements angular.IComponentOptions {
    public controller: (new (...args: any[]) => angular.IController) = MainComponentController
    public templateUrl: string = 'components/main.html'
  }
}
