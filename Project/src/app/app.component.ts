import { Component } from '@angular/core';
import { AuthenticationService } from './authentication/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'BEST PHONES';

  constructor(
    private authService : AuthenticationService,
    private toastr: ToastrService
  ) { }
  
  showSuccess() {
    this.toastr.success('Hello world!', 'Toastr fun!');
  }
}
