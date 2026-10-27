import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth/auth.service';
import { takeUntil, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public isSubmitClicked: boolean = false;
  private unsubscribe: Subject<any>;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { 
    this.unsubscribe = new Subject();
  }

  /**
   * On init
   */
  ngOnInit() {
    this.initLoginForm();
  }

  /**
   * On destroy
   */
  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  initLoginForm() {
    this.loginForm = this.fb.group({
      userId: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100)
        ])
      ],
      password: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100)
        ])
      ]
    });
  }

  get userId() {
    return this.loginForm.get('userId');
  }

  get password() {
    return this.loginForm.get('password');
  }

  submit() {
    const controls = this.loginForm.controls;
    console.log('this.loginForm', this.loginForm)
    if(this.loginForm.invalid) {
      Object.keys(controls).forEach(controlName => 
        controls[controlName].markAsTouched()
      );
      return;
    }

    const authData = {
      userId: controls['userId'].value,
      password: controls['password'].value
    }
    this.isSubmitClicked = true;
    this.authService
        .login(authData.userId, authData.password)
        .pipe(
          tap(authResponce => {
            this.isSubmitClicked = false;
            console.log('authResponce', authResponce)
            if(authResponce && authResponce.status && authResponce.status == 1) {
              localStorage.setItem('sessionData', JSON.stringify(authResponce.userData));
              this.router.navigateByUrl('/');
            } else {
              //console.log('2')
            }
          }),
          takeUntil(this.unsubscribe)
        ).subscribe();
  }
}
