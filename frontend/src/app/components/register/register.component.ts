import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true, // Indica que é um Standalone Component
  imports: [CommonModule, FormsModule], // Adicione FormsModule aqui
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerData = { username: '', email: '', password: '' };

  onSubmit() {
    console.log("User registered:", this.registerData);
  }
}
