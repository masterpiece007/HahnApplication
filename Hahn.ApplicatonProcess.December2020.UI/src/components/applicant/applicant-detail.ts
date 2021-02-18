import { HttpClient } from 'aurelia-http-client';
import { inject } from 'aurelia-framework';
import { ApplicantService } from '../../services/applicant.services';



let httpClient = new HttpClient();

@inject(ApplicantService)
export class ApplicantDetail {
  message = "applicant-detail";
  applicant: any = null;

  constructor(private applicantService: ApplicantService) {

  }
  activate(params) {
    //console.log("params: ", params)

    // this.applicantService.getApplicantById(params.id).then(data => {
    //  this.applicant = JSON.parse(data.response);
    //})

    return httpClient.get('https://localhost:44396/api/applicant/GetApplicant/' + params.id)
      .then(data => {
        this.applicant = JSON.parse(data.response);
        console.log(this.applicant)
      })
      //.then(contact => this.contact = contact);
  }
}
