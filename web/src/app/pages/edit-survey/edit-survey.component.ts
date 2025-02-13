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

import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {Subscription, filter, startWith} from 'rxjs';

import {Job} from 'app/models/job.model';
import {Survey} from 'app/models/survey.model';
import {DraftSurveyService} from 'app/services/draft-survey/draft-survey.service';
import {JobService} from 'app/services/job/job.service';
import {NavigationService} from 'app/services/navigation/navigation.service';
import {SurveyService} from 'app/services/survey/survey.service';
import {environment} from 'environments/environment';

import {
  DialogData,
  DialogType,
  JobDialogComponent,
} from './job-dialog/job-dialog.component';

@Component({
  selector: 'edit-survey',
  templateUrl: './edit-survey.component.html',
  styleUrls: ['./edit-survey.component.scss'],
})
export class EditSurveyComponent implements OnInit {
  private subscription = new Subscription();

  surveyId?: string;
  survey?: Survey;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  production = !!(environment as any)['production'];
  sectionTitle?: string = '';

  constructor(
    public dialog: MatDialog,
    private surveyService: SurveyService,
    private jobService: JobService,
    private draftSurveyService: DraftSurveyService,
    private navigationService: NavigationService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    navigationService.init(this.route);
  }

  ngOnInit(): void {
    this.subscription.add(
      this.navigationService.getSurveyId$().subscribe(async surveyId => {
        if (surveyId) {
          this.surveyId = surveyId;
          this.surveyService.activateSurvey(surveyId);
          await this.draftSurveyService.init(surveyId);
          this.draftSurveyService
            .getSurvey$()
            .subscribe(survey => (this.survey = survey));
        }
      })
    );

    this.subscription.add(
      this.router.events
        .pipe(
          filter((e): e is NavigationEnd => e instanceof NavigationEnd),
          startWith(this.router)
        )
        .subscribe(event => {
          if (event.url.endsWith('share')) this.sectionTitle = 'Sharing';
          else this.sectionTitle = '';
        })
    );
  }

  jobs(): Job[] {
    // TODO: sort by id or remove sort call when task editor is fixed
    return Array.from(this.survey?.jobs.values() ?? []).sort(
      ({id: id1}, {id: id2}) => id1.localeCompare(id2)
    );
  }

  addJob(): void {
    this.openDialog(DialogType.AddJob, this.jobService.createNewJob());
  }

  jobRouterLink(jobId: string): string[] {
    return [`./job/${jobId}`];
  }

  onMenu(e: Event): void {
    e.preventDefault();
    e.stopImmediatePropagation();
  }

  renameJob(job: Job): void {
    this.openDialog(DialogType.RenameJob, job);
  }

  async duplicateJob(job: Job): Promise<void> {
    const newJob = this.jobService.createNewJob();
    this.draftSurveyService.addOrUpdateJob(
      job.copyWith({id: newJob.id, name: 'Copy of ' + job.name})
    );
  }

  deleteJob(job: Job): void {
    this.openDialog(DialogType.DeleteJob, job);
  }

  openDialog(dialogType: DialogType, job: Job): void {
    const dialogRef = this.dialog.open(JobDialogComponent, {
      data: {dialogType, jobName: job.name ?? ''},
    });

    dialogRef.afterClosed().subscribe(async (result: DialogData) => {
      if (!result) {
        return;
      }
      switch (result.dialogType) {
        case DialogType.AddJob:
        case DialogType.RenameJob:
          this.draftSurveyService.addOrUpdateJob(
            job.copyWith({name: result.jobName})
          );
          break;
        case DialogType.DeleteJob:
          this.draftSurveyService.deleteJob(job);
          break;
        default:
          break;
      }
    });
  }

  selectSurvey(id: string) {
    this.navigationService.selectSurvey(id);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
