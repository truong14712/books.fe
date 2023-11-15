import { ImgDirectiveDirective } from '@core/directive/img-directive.directive';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [ImgDirectiveDirective],
  exports: [ImgDirectiveDirective],
})
export class SharedModule {}
