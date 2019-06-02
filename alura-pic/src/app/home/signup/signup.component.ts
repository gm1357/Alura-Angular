import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { lowerCaseValidator } from 'src/app/shared/validators/lower-case.validator';
import { UserNotTakenValidatorService } from './user-not-taken.validator.service';
import { NewUser } from './new-user';
import { SignUpService } from './signup.service';
import { Router } from '@angular/router';
import { PlataformDetectorService } from 'src/app/core/plataform-detector/plataform-detector.service';

@Component({
    templateUrl: './signup.component.html'
})
export class SignUpComponent implements OnInit {

    signupForm: FormGroup;
    @ViewChild('emailInput') emailInput: ElementRef<HTMLInputElement>;

    constructor(
        private formBuilder: FormBuilder,
        private signupService: SignUpService,
        private router: Router,
        private userNotaTakenValidatorService: UserNotTakenValidatorService,
        private plataformDetectorService: PlataformDetectorService
    ) {}

    ngOnInit(): void {
        this.signupForm = this.formBuilder.group({
            email: ['',
                [
                    Validators.required,
                    Validators.email
                ]
            ],
            fullName: ['',
                [
                    Validators.required,
                    Validators.minLength(2),
                    Validators.maxLength(40)
                ]
            ],
            userName: ['',
                [
                    Validators.required,
                    lowerCaseValidator,
                    Validators.minLength(2),
                    Validators.maxLength(30)
                ],
                this.userNotaTakenValidatorService.checkUserNameTaken()
            ],
            password: ['',
                [
                    Validators.required,
                    Validators.minLength(4),
                    Validators.maxLength(18)
                ]
            ]
        });

        this.plataformDetectorService.isPlataformBrowser() &&
            this.emailInput.nativeElement.focus();
    }

    signup() {
        const newUser = this.signupForm.getRawValue() as NewUser;

        this.signupService
            .signup(newUser)
            .subscribe(
                () => this.router.navigate(['']),
                err => console.log(err)
            );
    }
}