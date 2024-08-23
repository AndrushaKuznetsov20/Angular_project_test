import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Register } from '../../models/register.model';
import { ToastrService } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    HttpClientModule,
    ReactiveFormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService
  ) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      number: ['', Validators.required],
      password: ['', Validators.required],
      role: ['', Validators.required]
    });
  }

  newUser(): void {
    if (this.registerForm.valid) {
      const { username, email, number, password, role } = this.registerForm.value;
      const registerData: Register = { username, email, number, password };

      this.authService.register(registerData, role).subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (e) => console.error(e)
      });

      // this.authService.register(registerData, role).subscribe(
      //   (response) => {
      //     this.toastr.success(response.message);
      //     this.registerForm.reset();
      //   },
      //   (error) => {
      //     console.error('Ошибка регистрации:', error);
      //     this.toastr.error('Произошла ошибка при регистрации. Пожалуйста, попробуйте еще раз !');
      //   }
      // );
    }
  }
}