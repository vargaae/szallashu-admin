import { NgModule } from '@angular/core';

import { MaterialModule } from '../material-module';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedComponent } from './components/shared/shared.component';

@NgModule({
  declarations: [],
  imports: [MaterialModule, RouterLink, ReactiveFormsModule, SharedComponent],
  exports: [MaterialModule, RouterLink, ReactiveFormsModule, SharedComponent],
  providers: [],
})
export class SharedModule {}
