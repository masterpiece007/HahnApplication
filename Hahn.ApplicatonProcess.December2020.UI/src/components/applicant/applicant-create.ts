import { ApplicantService } from "../../services/applicant.services";
//import { HttpClient } from 'aurelia-http-client';
import { inject, bindable, computedFrom } from 'aurelia-framework';
import { IApplicant } from "../../models/applicant.model";
import { ValidationRules, ValidationControllerFactory, validationMessages } from 'aurelia-validation'
import { DialogService } from "aurelia-dialog";
import { Prompt } from "../../helpers/modals/hahn.modal";

// ValidationRules, ValidationControllerFactory

@inject(ApplicantService, DialogService, ValidationControllerFactory)
export class ApplicantCreate {
  //static inject() { return [Validation] }
  message = "applicant-create";

  @bindable applicant: IApplicant;
  controller: any;
  //applicant_: any
  activateReset: boolean = false;
  isValidated: boolean;
  constructor(
    private applicantService: ApplicantService, private dialogService: DialogService, private ValidationControllerFactory: ValidationControllerFactory) {
    this.controller = ValidationControllerFactory.createForCurrentScope();
    this.applicant = undefined;
    //this.isValidated = false;
    this.applicantChanged("default","default");
   
  }
 
  createApplicant() {
    debugger;
    this.applicantService.createApplicant(this.applicant);
  }
  reset() {
    console.log('reset button');
    //this.applicant_ = this.applicant;

    this.dialogService.open({ viewModel: Prompt, model: 'are you sure you want to reset?' }).then(
      response => {
      console.log(response);

      if (!response.wasCancelled) {
        console.log('OK');
        this.applicant = new IApplicant();

      } else {
        //this.applicant = this.applicant_;
        console.log('cancelled');
      }
      console.log(response.output);
    });
  }

  //@computedFrom('applicant')
  //get activeReset(): string {
  //  if (this.applicant) {
  //    console.log("mark 2");

  //  } else {
  //    console.log("mark 1");

  //  }
  //  return `eee`;
  //  //return this.areFieldsEmpty();
  //}

  resetEnabled() {
   
    this.areFieldsEmpty_()  
  }

  areFieldsEmpty_(): boolean {

    //console.log("applicant: ",this.applicant);
    if (typeof this.applicant === 'undefined') {
      console.log("is empty");
      this.activateReset = false;

      return true;

    }
    else {
      if (
        (typeof this.applicant.address === 'undefined' || this.applicant.address === "")
        && (typeof this.applicant.countryOfOrigin === 'undefined' || this.applicant.countryOfOrigin === "")
        && (typeof this.applicant.emailAdress === 'undefined' || this.applicant.emailAdress === "")
        && (typeof this.applicant.familyName === 'undefined' || this.applicant.familyName === "")
        && (typeof this.applicant.name === 'undefined' || this.applicant.name === "")
      )
      {
        //console.log("some undefined");
        this.activateReset = false;

        return true;
      }
      else
      {
        //console.log("some defined");
        this.activateReset = true;

        return false
      }

    }

  }


  applicantChanged(newValue, oldValue) {
    console.log("inside applicantChanged");
    if ( this.applicant) {

      validationMessages['required'] = `\${$displayName} is required.`;
      validationMessages['between'] = `\${$displayName} must be between 20 to 60.`;
      validationMessages['email'] = `\${$displayName} is not valid.`;

      ValidationRules.ensure('name').displayName('name').required().minLength(5).on(this.applicant)
        .ensure('familyName').displayName('family name').minLength(5).required().on(this.applicant)
        .ensure('address').displayName('address').minLength(10).required().on(this.applicant)
        .ensure('countryOfOrigin').displayName('country of origin').required().on(this.applicant)
        .ensure('hired').displayName('hired').required().on(this.applicant)
        .ensure('emailAdress').displayName('email').email().required().on(this.applicant)
        .ensure('age').displayName('age').between(20, 60).on(this.applicant);

      //this.controller.validate();
      this.controller.validate()
        .then(result => {
          if (result.valid) {
            
            this.isValidated = true
            console.log("validation is valid")
            // validation succeeded
          } else {
            this.isValidated = false
            console.log("validation is not  valid")

            // validation failed
          }
        });
    } else {
      this.controller.addError("initialization");
      this.controller.errors.length = 1;
     
    }


  }
}
