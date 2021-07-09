import { Component, OnInit } from '@angular/core'
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  form!: FormGroup

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl('', [
        Validators.email,
        Validators.required
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6)
      ]),
      address: new FormGroup({
        country: new FormControl('ua'),
        city: new FormControl('', [Validators.required]),
      }),
      skills:new FormArray([])
    })
  }

  submit() {
    if (this.form.valid) {
      console.log('Form: ', this.form)
      console.log('Form value:', this.form.value)
    }
  }

  setCapital() {
    const cityMap: { [code: string]: string } = {
      ru: 'Москва',
      ua: 'Киев',
      by: 'Минск'
    }
    const cityKey = this.form.controls.address.value.country
    const city = cityMap[cityKey]
    this.form.patchValue({ address: { city } })
  }
  addSkill(){
    const skillControl=new FormControl('', Validators.required);
    (<FormArray>this.form.get('skills')).push(skillControl)
  }
}

AbstractControl