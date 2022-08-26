import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, retry } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  projectForm: FormGroup;
  forbiddenName = 'test'
  state = ['Stable','Critical','Finished'];

  ngOnInit() {
    this.projectForm = new FormGroup({
      projectName: new FormControl('', [Validators.required, this.checkForbiddenName.bind(this)]),
      mail: new  FormControl('', [Validators.required, Validators.email]),
      projectStatus: new FormControl(),
    })
  }

  onSubmit() {
    console.log(this.projectForm.value);
    this.projectForm.reset();
  }

  checkForbiddenName(control: FormControl): {[s: string]: boolean} {
    if(control.value === this.forbiddenName) {
      return {'nameIsForbidden': true}
    }
    return null;
  }

  checkForbiddenNameAsyncV2(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise((resolve,reject)=> {
      setTimeout(() => {
        if (control.value === this.forbiddenName) {
          resolve({'nameIsForbidden': true})
        } else {
          resolve(null);
        }
      },1000);
    });
    return promise;
  }
}
