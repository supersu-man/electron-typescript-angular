import { Component } from '@angular/core';

@Component({
    selector: 'app-home',
    imports: [],
    templateUrl: './home.component.html',
    styles: ``
})
export class HomeComponent {
  title = 'electron-typescript-angular';
  hello = ''

  constructor() {
    this.getHello()
  }

  async getHello() {
    //Acessing ipcRenderer.invoke apis from preload
    const data = await (window as any).api.sayHello("World!!")
    this.hello = data
    console.log(data)
  }
}
