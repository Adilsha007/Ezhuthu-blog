import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthResData } from 'src/app/models/auth-res-data';
import { User } from 'src/app/models/user-model';
import { AuthService } from 'src/app/services/auth.service';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user! : any 
  constructor(private authService: AuthService, private profileService: ProfileService){}


  ngOnInit(): void {
    this.user = this.authService.getUserFromLocalStorage()
    
  }

}
