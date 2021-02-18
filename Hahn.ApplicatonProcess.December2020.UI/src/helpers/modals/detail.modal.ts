//import { inject } from '../../../node_modules/aurelia-framework/dist/aurelia-framework';
import { inject } from 'aurelia-framework';
import { DialogController } from 'aurelia-dialog';
import { IApplicant } from '../../models/applicant.model';


@inject(DialogController)
export class Prompt {
  controller: any;
  answer: any;
  applicant: IApplicant;
  constructor(controller) {
    this.controller = controller;
    this.answer = null;

    controller.settings.centerHorizontalOnly = true;
  }
  activate(applicant) {
    this.applicant = applicant;
  }
}
