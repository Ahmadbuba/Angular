import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('f') signupForm: NgForm;
  subs = ['Basic', 'Advanced', 'Pro'];
  defaultSub = 'Advanced'
  submitted = false;
  message = ''

  user = {
    email: '',
    subscription:''
  }

  onSubmit() {
    this.user.email = this.signupForm.value.email;
    this.user.subscription = this.signupForm.value.subscription;
    console.log(this.user)
    this.message = "User credentials are: "+ "email:"+this.user.email + " " + "subscription: " + this.user.subscription
    this.signupForm.form.patchValue({
      email: '',
      password: ''
    })
  }

}
