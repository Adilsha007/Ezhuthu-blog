import { Component, ViewChild, ElementRef, AfterViewInit, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { isAuthenticated } from '../auth/state/auth.select';
import { AuthService } from '../services/auth.service';
import { AppState } from '../store/app.state';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit, OnInit {

  @ViewChild('typingText', { static: false }) typingText!: ElementRef;

  isAuthenticated !: Observable<boolean>
  quote!: string 

  constructor(private store: Store<AppState>, private authService: AuthService){}

  ngOnInit(): void {
    this.isAuthenticated = this.store.select(isAuthenticated);

    this.isAuthenticated.subscribe(authenticated => {
      if (!authenticated) {
        this.quote = "This is your Blog Site. Please log in and create a new blog...!";
      } else {
        const user = this.authService.getUserFromLocalStorage();
        this.quote = `Hi ${user?.userName}, Welcome to your Dashboard..!`;
      }
    });
  }

  ngAfterViewInit() {
    this.typeQuote();
  }

  typeQuote() {
    let i = 0;
    const speed = 50;
    const textElement = this.typingText.nativeElement;

    const type = () => {
      if (i < this.quote.length) {
        textElement.innerHTML += this.quote.charAt(i);
        i++;
        setTimeout(type.bind(this), speed);
      }
    }

    type.bind(this)();
  }

}
