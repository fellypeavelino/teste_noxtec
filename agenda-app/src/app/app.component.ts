import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { LoguinComponent } from './components/loguin/loguin.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LoguinComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit  {
  
  usarLogout!: boolean;

  constructor(
    private router: Router
  ) {}

  ngOnInit() {
    const vm = this;
    vm.router.events.subscribe((event: any) => {
      vm.usarLogout = (vm.router.url !== '/loguin'); 
    });
  }

}
