import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styles: [],
})
export class AppComponent {
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
