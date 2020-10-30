import { Component, VERSION } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  name = 'Angular ' + VERSION.major;

  Users=[];
  pushUsers(data){
    this.Users.push(data)
  }

  onRemoveUsers(item){
    this.Users.splice(item, 1)
  }

  Admins=[];
  pushAdmins(admin){
    this.Admins.push(admin)
  }

  onRemoveAdmins(item){
    this.Admins.splice(item, 1);
  }
}
