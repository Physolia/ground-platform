/**
 * Copyright 2023 The Ground Authors.
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

import {DragDropModule} from '@angular/cdk/drag-drop';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {AddTaskButtonModule} from './add-task-button/add-task-button.module';
import {TaskDetailsComponent} from './task-details.component';
import {TaskInputModule} from './task-input/task-input.module';

@NgModule({
  declarations: [TaskDetailsComponent],
  imports: [AddTaskButtonModule, TaskInputModule, CommonModule, DragDropModule],
  exports: [TaskDetailsComponent],
})
export class TaskDetailsModule {}
