import { inject  } from 'aurelia-framework';
import { HttpClient } from 'aurelia-http-client';
import { IApplicant } from 'models/applicant.model'
import { DialogService } from 'aurelia-dialog';
import { Prompt } from "../../src/helpers/modals/error.modal";

let httpClient = new HttpClient();

@inject(DialogService)
export class ApplicantService {
  constructor(private dialogService: DialogService) {
    //console.log("applicant service constructor")

  }
  allApplicants;
  applicant = null;
  getAllApplicants() {
    return httpClient.get('https://localhost:44396/api/applicant/getall');
    //  .then(data => {
    //    this.allApplicants = <IApplicant>data.response
    //    //console.log("inside getdata");
    //    //console.table(this.allApplicants)
    //  });
    //return this.allApplicants;
  }


  getApplicantById(id) {
    console.log("serv id:", id);
    return httpClient.get('https://localhost:44396/api/applicant/GetApplicant/' + id);
      
    console.log("serv: ",this.applicant)

    //return this.applicant;
  }

  createApplicant(applicantData: IApplicant){
    debugger;
    alert("create method");
    console.log("create applicant method: ", applicantData)
    httpClient.createRequest('https://localhost:44396/api/applicant/Create')
      .asPost()
      .withHeader('Content-Type', 'application/json; charset=utf-8')
      .withContent(applicantData)
      .send()
      .then(response => {
        alert("create successful!!");

        console.log(response.response);
      })
      .catch(err => {
        //alert("create failed!!!");
        const resMsg = JSON.parse(err.response)
        var errorList = "";
        for (var i = 0; i < resMsg.errors.length; i++) {
          errorList += resMsg.errors[i]
        }
        console.log("error createApp: ", errorList);
        //console.log("error createApp: ", resMsg.errors[0]);

        this.dialogService.open({ viewModel: Prompt, model: errorList }).then(
          response => {
            console.log(response);

            if (!response.wasCancelled) {
              console.log('dioalog ');
              //this.applicant = new IApplicant();

            } else {
              //this.applicant = this.applicant_;
              console.log('dialog cancelled');
            }
            //console.log(response.output);
          });
        //console.log(err);
      });

    //httpClient.post('https://localhost:44396/api/applicant/Create');
  }

  updateApplicant(id: number, applicantData: IApplicant) {
    alert("update hit");
    httpClient.createRequest('https://localhost:44396/api/applicant/Update/' + id)
      .asPut()
      .withHeader('Content-Type', 'application/json; charset=utf-8')
      .withContent(applicantData)
      .send()
      .then(response => {
        alert("update successful!!");
      })
      .catch(err => {
        alert("update failed");
        console.log("update error",err);
      });

    //httpClient.post('https://localhost:44396/api/applicant/Create');
  }

  deleteApplicant(id: number) {
    httpClient.createRequest('https://localhost:44396/api/applicant/Delete/' + id)
      .asDelete()
      .withHeader('Content-Type', 'application/json; charset=utf-8')
      .send()
      .then(response => {
         alert("delete successful!!");

         console.log(response.response);
       })
       .catch(err => {
         alert("unable to delete this applicant");
         console.log(err);
       });

  }

  //getData() {
  //  httpClient.fetch('https://localhost:44396/api/values')
  //    .then(response => response.json())
  //    .then(data => {
  //      console.log("getData")
  //      console.log(data);
  //    });
  //}
  //myPostData = {
  //  id: 101
  //}
  //postData(myPostData) {
  //  httpClient.fetch('http://jsonplaceholder.typicode.com/posts', {
  //    method: "POST",
  //    body: JSON.stringify(myPostData)
  //  })

  //    .then(response => response.json())
  //    .then(data => {
  //      console.log(data);
  //    });
  //}
  //myUpdateData = {
  //  id: 1
  //}
  //updateData(myUpdateData) {
  //  httpClient.fetch('http://jsonplaceholder.typicode.com/posts/1', {
  //    method: "PUT",
  //    body: JSON.stringify(myUpdateData)
  //  })

  //    .then(response => response.json())
  //    .then(data => {
  //      console.log(data);
  //    });
  //}
  //deleteData() {
  //  httpClient.fetch('http://jsonplaceholder.typicode.com/posts/1', {
  //    method: "DELETE"
  //  })
  //    .then(response => response.json())
  //    .then(data => {
  //      console.log(data);
  //    });
  //}
}
