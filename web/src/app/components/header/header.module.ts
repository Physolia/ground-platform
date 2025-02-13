/**
 * Copyright 2020 The Ground Authors.
 *
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

import {CurrentUserWidgetModule} from './current-user-widget/current-user-widget.module';
import {HeaderComponent} from './header.component';

@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    CurrentUserWidgetModule,
    MatButtonModule,
    MatIconModule,
  ],
  exports: [HeaderComponent],
})
export class HeaderModule {}
