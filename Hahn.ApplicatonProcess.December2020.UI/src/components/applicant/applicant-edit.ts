import { ApplicantService } from "../../services/applicant.services";
import { HttpClient } from 'aurelia-http-client';
import { inject } from 'aurelia-framework';
import { IApplicant } from "../../models/applicant.model";

let httpClient = new HttpClient();

@inject(ApplicantService)
export class ApplicantEdit {
  message = "applicant-edit";
  //applicant: any = null;
  applicantId: number = 0;

  constructor(private applicantService: ApplicantService, private applicant: IApplicant) {

  }

  activate(params) {
    console.log("params: ", params)
    this.applicantId = params.id
    return httpClient.get('https://localhost:44396/api/applicant/GetApplicant/' + params.id)
      .then(data => {
        this.applicant = JSON.parse(data.response);
        //console.log(this.applicant)
      })
    //.then(contact => this.contact = contact);
  }

  updateApplicant() {
    this.applicantService.updateApplicant(this.applicantId, this.applicant);
  }
  
}
