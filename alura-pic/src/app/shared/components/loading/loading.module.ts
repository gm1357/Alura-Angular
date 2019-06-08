import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoadingInterceptor } from './loading.interceptor';
import { LoadingComponent } from './loading.component';

@NgModule({
    declarations: [ LoadingComponent ],
    exports: [ LoadingComponent ],
    imports: [ CommonModule ],
    providers: [{
        provide: HTTP_INTERCEPTORS,
        useClass: LoadingInterceptor,
        multi: true
    }] 
})
export class LoadingModule {}