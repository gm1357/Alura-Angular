import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PhotoService } from '../photo/photo.service';
import { Photo } from '../photo/photo';
import { Observable } from 'rxjs';
import { PhotoComment } from '../photo/photo-comment';
import { AlertService } from 'src/app/shared/components/alert/alert.service';
import { UserService } from 'src/app/core/user/user.service';

@Component({
    templateUrl: './photo-details.component.html'
})
export class PhotoDetailsComponent implements OnInit {
    
    photo$: Observable<Photo>;
    photoId: number;

    constructor(
        private route: ActivatedRoute,
        private photoService: PhotoService,
        private router: Router,
        private alertService: AlertService,
        private userService: UserService
    ) {}

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.photoId = params.photoId;

            this.photo$ = this.photoService.findById(this.photoId);
            this.photo$.subscribe(() => {}, err => {
                console.log(err);
                this.router.navigate(['not-found']);
            });
        });
    }

    remove() {
        this.photoService
            .removePhoto(this.photoId)
            .subscribe(() => {
                this.alertService.success('Photo removed', true);
                this.router.navigate(['/user', this,this.userService.getUserName()]);
            },
            err => {
                console.log(err);
                this.alertService.warning('Could not delete the photo');
            });
    }
}