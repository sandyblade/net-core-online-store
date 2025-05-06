import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from '../../services/profile.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';



@Component({
  selector: 'app-profile-page',
  standalone: false,
  templateUrl: './profile-page.component.html',
  styles: ``
})
export class ProfilePageComponent implements OnInit {

  loading: boolean = true
  submit: boolean = false
  upload: boolean = false
  private readonly router = inject(Router);
  nowYear: number = new Date().getFullYear()
  errorResponse: string | null = null
  successResponse: string | null = null
  formGroup!: FormGroup;
  user: any = {}
  activities: Array<any> = []
  image: string = ""

  constructor(private profileService: ProfileService, private formBuilder: FormBuilder) { }

  loadContent(): void {
    this.loading = true
    this.profileService.detail()
      .subscribe({
        next: (response) => {
          const usr = response.user
          setTimeout(() => {
            this.formGroup.controls['address'].setValue(usr.address)
            this.formGroup.controls['email'].setValue(usr.email)
            this.formGroup.controls['firstName'].setValue(usr.firstName)
            this.formGroup.controls['lastName'].setValue(usr.lastName)
            this.formGroup.controls['gender'].setValue(usr.gender)
            this.formGroup.controls['phone'].setValue(usr.phone)
            this.formGroup.controls['country'].setValue(usr.country)
            this.formGroup.controls['zipCode'].setValue(usr.zipCode)
            this.formGroup.controls['city'].setValue(usr.city)
            this.activities = response.activities
            this.user = usr
            this.loading = false
            this.image = usr.image ? this.profileService.getImage(usr.image) : ""
          }, 2000)
        },
        error: (e) => {
          setTimeout(() => {
            this.loading = false
            this.errorResponse = e.error?.message
          }, 2000)
        }
      });
  }

  ngOnInit(): void {

    let form = {
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      country: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      zipCode: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email])
    }

    this.formGroup = this.formBuilder.group(form)
    const logged = localStorage.getItem('auth_token') !== undefined && localStorage.getItem('auth_token') !== null
    if (!logged) {
      this.router.navigate(['/auth/login']);
    } else {
      this.loadContent()
    }
  }

  onSubmit() {
    if (this.formGroup.valid) {
      this.successResponse = ''
      this.errorResponse = ''
      this.submit = true
      this.profileService.update(this.formGroup.value)
        .subscribe({
          next: (response) => {
            setTimeout(() => {
              this.successResponse = response.message
              this.submit = false
              this.loadContent()
            }, 2000)
          },
          error: (e) => {
            setTimeout(() => {
              this.submit = false
              this.errorResponse = e.error?.message
            }, 2000)
          }
        });
    } else {
      this.successResponse = ''
      this.errorResponse = ''
      this.formGroup.get('email')?.markAsTouched({ onlySelf: true })
      this.formGroup.get('phone')?.markAsTouched({ onlySelf: true })
      this.formGroup.get('firstName')?.markAsTouched({ onlySelf: true })
      this.formGroup.get('lastName')?.markAsTouched({ onlySelf: true })
      this.formGroup.get('gender')?.markAsTouched({ onlySelf: true })
      this.formGroup.get('country')?.markAsTouched({ onlySelf: true })
      this.formGroup.get('city')?.markAsTouched({ onlySelf: true })
      this.formGroup.get('zipCode')?.markAsTouched({ onlySelf: true })
      this.formGroup.get('address')?.markAsTouched({ onlySelf: true })
    }
  }



  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    this.upload = true
    this.profileService.upload(file)
      .subscribe({
        next: (response) => {
          this.upload = false
          this.successResponse = response.message
          this.loadContent()
        },
        error: (e) => {
          setTimeout(() => {
            this.upload = false
            this.errorResponse = e.error?.message
          }, 2000)
        }
      });
  }

}
