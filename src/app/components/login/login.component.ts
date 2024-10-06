import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    HttpClientModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  redirectToSimpleUserPage() {
    this.router.navigate(['/simpleUserPage']);
  }

  redirectToModerUserPage() {
    this.router.navigate(['/moderUserPage']);
  }

  getRoleFromToken(token: string): string {
    try {
      const payload = token.split('.')[1];
      const decodedPayload = JSON.parse(atob(payload));
      return decodedPayload.role;
    } catch (error) {
      console.error(error);
      return "Ошибка!";
    }
  }

  signIn(): void {
    if (this.loginForm.valid) {
      const data = {
        username: this.loginForm.value.username,
        password: this.loginForm.value.password
      };
    this.authService.login(data).subscribe({
      next: (res) => {

        const token = res.token;
        const role = this.getRoleFromToken(token);

        if (role) {
          console.log('Role:', role);

          if(role == "SIMPLE_USER") {
            this.redirectToSimpleUserPage();
          } else {
            this.redirectToModerUserPage();
          }

        }

      },
      error: (e) => {
        console.error();
      }
    });
  }
  }
}
