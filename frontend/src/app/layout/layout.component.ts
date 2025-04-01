import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
  imports: [RouterModule] // 🔹 Adicione essa linha para reconhecer <router-outlet>
})
export class LayoutComponent {}
