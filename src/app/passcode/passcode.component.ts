import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-passcode',
  standalone: true,
  imports: [ CommonModule  , ReactiveFormsModule],
  templateUrl: './passcode.component.html',
  styleUrl: './passcode.component.scss'
})
export class PasscodeComponent implements OnInit {


  currentRoute!: string;  

  constructor(private router  : ActivatedRoute) {

  }

  ngOnInit(): void {
   this.currentRoute = this.router.snapshot.routeConfig?.path || ''; 
  }

  forgotPasswordForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  });

  get forgotPasswordFields() {
    return this.forgotPasswordForm.controls; 
  }

}
