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
  usernameTooltip = 'Имя пользователя должно содержать от 5 до 30 символов';

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
      const data = {
        username: this.registerForm.value.username,
        email: this.registerForm.value.email,
        number: this.registerForm.value.number,
        password: this.registerForm.value.password
      };

      const role = this.registerForm.value.role;

      this.authService.register(data, role).subscribe({
        next: (res) => {

          console.log(res);
          alert(res);

          if(res == "Регистрация прошла успешно !")
          {
              this.registerForm.reset();
          }
        },
        error: (e) => {
          console.error();
        }
      });
    } else
    {
      console.error('Форма не валидна', this.registerForm.errors);
    }
  }
}
