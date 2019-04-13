import { Component } from '@angular/core';
import { environment } from 'src/assets/environments/environment';
import { RestService } from './services/rest.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cmPOS';

  constructor(
    public rest:RestService
  ){}
  
}
