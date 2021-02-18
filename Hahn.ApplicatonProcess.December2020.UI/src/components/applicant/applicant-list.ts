import { ApplicantService } from 'services/applicant.services';
import { inject, bindable } from 'aurelia-framework';
import { IApplicant } from '../../models/applicant.model';
import { I18N } from 'aurelia-i18n';
import { EventAggregator } from 'aurelia-event-aggregator';
import { i18n } from 'i18next';
import { DialogService } from 'aurelia-dialog';
import { Prompt } from "../../helpers/modals/detail.modal";
import {  Router } from 'aurelia-router';





@inject(ApplicantService, DialogService, I18N, Router)
//@inject(ApplicantService)
export class Applicants{
  //friends: any[];
  message: string;
  //allApplicants: IApplicant[] = [];
  locale = true;
  fetchedApplicant: IApplicant
  //private eventAggregator: EventAggregator;

  constructor(private applicantService: ApplicantService, private dialogService: DialogService, private router: Router, private i18n: I18N, private allApplicants: IApplicant[])
  //constructor(private applicantService: ApplicantService, private allApplicants: IApplicant[])
  {
    this.message = "all applicants.";
    this.fetchedApplicant = new IApplicant();
    applicantService.getAllApplicants()
      .then(data => {
        this.allApplicants = JSON.parse(data.response);
        console.log(this.allApplicants)
      }).catch(err => {
        console.log(err)
      });

  }

  getApplicant(id) {
    console.log("id.. ",id);
    this.applicantService.getApplicantById(id).then(result => {
      this.fetchedApplicant = JSON.parse(result.response);
      console.log("fetched: ", this.fetchedApplicant)
    }).then(next => {
      this.dialogService.open({ viewModel: Prompt, model: this.fetchedApplicant }).then(
        response => {
          //console.log(response);

          if (!response.wasCancelled) {
            console.log('OK');
            //this.applicant = new IApplicant();

          } else {
            //this.applicant = this.applicant_;
            console.log('cancelled');
          }
          //console.log(response.output);
        });

    })


     //httpClient.get('https://localhost:44396/api/applicant/GetApplicant/' + params.id)
     // .then(data => {
     //   this.applicant = JSON.parse(data.response);
     //   console.log(this.applicant)
     // })
  }

  deleteApplicant(id) {
    this.applicantService.deleteApplicant(id);
    alert("Applicant record deleted successfully");
    this.router.navigateToRoute(
      this.router.currentInstruction.config.name,
      this.router.currentInstruction.params,
      { replace: true }
    );
    //location.reload();
    //return false;

  }
 
}
