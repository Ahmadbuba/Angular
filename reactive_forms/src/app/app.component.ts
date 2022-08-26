import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  genders = ['male', 'female'];
  signupForm: FormGroup;
  forbiddenUsernames = ['Chris', 'Anna'];
  //forbiddenEmail = 'test@test.com'

  ngOnInit() {
    this.signupForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl('test', [Validators.required, this.forbiddenNames.bind(this)]),
        'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails)
      }),
      'gender': new FormControl('male'),
      'hobbies': new FormArray([])
    });
    // this.signupForm.valueChanges.subscribe(
    //   (value) => console.log(value)
    // );

    this.signupForm.statusChanges.subscribe(
      (status) => console.log(status)
    );

    this.signupForm.setValue({
      'userData': {
        'username' : 'Ahmad',
        'email': 'ahmad@test.com'
      },
      'gender': 'male',
      'hobbies': []
    });

    this.signupForm.patchValue({
      'userData': {
        'username' : 'Anna'
      }
    });
  }

  onSubmit() {
    console.log(this.signupForm)
    this.signupForm.reset();
  }

  onAddHobby() {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(control);
  }

  get controls() {
    return(this.signupForm.get('hobbies') as FormArray).controls;
  }

 /**
  * 
  * We had to bind(this) when calling it because the forbiddenNames property
  * belongs to the class, hence angular on the forms control would not know
  * forbiddenNames so we bind to 'this' so that it is aware the 'this' is reffering
  * to the forbiddenNames property of the class
  */

  forbiddenNames(control: FormControl): {[s: string]: boolean} {
    if(this.forbiddenUsernames.indexOf(control.value) !== -1) {
      return {'nameIsForbidden': true}
    }
    return null;
  }

  /**
   * 
   * When calling this method in the form control we do not have to bind to this
   * because we are not using any property of this class ie this.forbiddenEmail;
   * with that we would have had to bind to "this" , so that it wont return undefined
   * because it doesnt know any property  'forbiddenEmail'
   *  
   */
  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve,reject) => {
      setTimeout(() => {
        if (control.value === 'test@test.com') {
          resolve({'emailIsForbidden': true})
        } else {
          resolve(null);
        }
      }, 1500);
    });
    return promise;
  }

}
