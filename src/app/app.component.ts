import { Component } from '@angular/core';
import { faCalendarCheck, faUserNurse, faUser, faGears, faUserDoctor, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = '.:Medici:.';

  public faCalendarCheck = faCalendarCheck;
  public faUserNurse = faUserNurse;
  public faUser = faUser;
  public faGears = faGears;
  public faUserDoctor = faUserDoctor;
  public faRightFromBracket = faRightFromBracket;
}
