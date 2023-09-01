/*
Copyright 2020 Google LLC

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    https://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatLegacyListModule as MatListModule} from '@angular/material/legacy-list';
import {MatIconModule} from '@angular/material/icon';
import {MatLegacyButtonModule as MatButtonModule} from '@angular/material/legacy-button';
import {MatLegacyMenuModule as MatMenuModule} from '@angular/material/legacy-menu';
import {BrowserModule} from '@angular/platform-browser';
import {MatLegacyDialogModule as MatDialogModule} from '@angular/material/legacy-dialog';
import {LocationOfInterestPanelHeaderComponent} from './loi-panel-header.component';

@NgModule({
  declarations: [LocationOfInterestPanelHeaderComponent],
  imports: [
    BrowserModule,
    MatListModule,
    CommonModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatDialogModule,
  ],
  exports: [LocationOfInterestPanelHeaderComponent],
})
export class LocationOfInterestPanelHeaderModule {}
