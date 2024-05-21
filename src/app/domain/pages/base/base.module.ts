import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BaseComponent } from './base.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
    imports: [CommonModule, SharedModule, BaseComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [],
    exports: [BaseComponent],
})
export class BaseModule {}
