import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private router:Router,
              private auhtService: AuthService) { }

  ngOnInit(): void {
  }


  logout(){
    this.auhtService.logout();
    this.router.navigateByUrl('/auth/login')
  }
}
