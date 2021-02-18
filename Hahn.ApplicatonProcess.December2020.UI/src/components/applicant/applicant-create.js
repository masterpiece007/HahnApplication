var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ApplicantService } from "../../services/applicant.services";
import { inject, bindable } from 'aurelia-framework';
import { IApplicant } from "../../models/applicant.model";
import { ValidationRules, ValidationControllerFactory, validationMessages } from 'aurelia-validation';
import { DialogService } from "aurelia-dialog";
import { Prompt } from "../../helpers/modals/hahn.modal";
var ApplicantCreate = (function () {
    function ApplicantCreate(applicantService, dialogService, ValidationControllerFactory) {
        this.applicantService = applicantService;
        this.dialogService = dialogService;
        this.ValidationControllerFactory = ValidationControllerFactory;
        this.message = "applicant-create";
        this.activateReset = false;
        this.controller = ValidationControllerFactory.createForCurrentScope();
        this.applicant = undefined;
        this.applicantChanged("default", "default");
    }
    ApplicantCreate.prototype.createApplicant = function () {
        debugger;
        this.applicantService.createApplicant(this.applicant);
    };
    ApplicantCreate.prototype.reset = function () {
        var _this = this;
        console.log('reset button');
        this.dialogService.open({ viewModel: Prompt, model: 'are you sure you want to reset?' }).then(function (response) {
            console.log(response);
            if (!response.wasCancelled) {
                console.log('OK');
                _this.applicant = new IApplicant();
            }
            else {
                console.log('cancelled');
            }
            console.log(response.output);
        });
    };
    ApplicantCreate.prototype.resetEnabled = function () {
        this.areFieldsEmpty_();
    };
    ApplicantCreate.prototype.areFieldsEmpty_ = function () {
        if (typeof this.applicant === 'undefined') {
            console.log("is empty");
            this.activateReset = false;
            return true;
        }
        else {
            if ((typeof this.applicant.address === 'undefined' || this.applicant.address === "")
                && (typeof this.applicant.countryOfOrigin === 'undefined' || this.applicant.countryOfOrigin === "")
                && (typeof this.applicant.emailAdress === 'undefined' || this.applicant.emailAdress === "")
                && (typeof this.applicant.familyName === 'undefined' || this.applicant.familyName === "")
                && (typeof this.applicant.name === 'undefined' || this.applicant.name === "")) {
                this.activateReset = false;
                return true;
            }
            else {
                this.activateReset = true;
                return false;
            }
        }
    };
    ApplicantCreate.prototype.applicantChanged = function (newValue, oldValue) {
        var _this = this;
        console.log("inside applicantChanged");
        if (this.applicant) {
            validationMessages['required'] = "${$displayName} is required.";
            validationMessages['between'] = "${$displayName} must be between 20 to 60.";
            validationMessages['email'] = "${$displayName} is not valid.";
            ValidationRules.ensure('name').displayName('name').required().minLength(5).on(this.applicant)
                .ensure('familyName').displayName('family name').minLength(5).required().on(this.applicant)
                .ensure('address').displayName('address').minLength(10).required().on(this.applicant)
                .ensure('countryOfOrigin').displayName('country of origin').required().on(this.applicant)
                .ensure('hired').displayName('hired').required().on(this.applicant)
                .ensure('emailAdress').displayName('email').email().required().on(this.applicant)
                .ensure('age').displayName('age').between(20, 60).on(this.applicant);
            this.controller.validate()
                .then(function (result) {
                if (result.valid) {
                    _this.isValidated = true;
                    console.log("validation is valid");
                }
                else {
                    _this.isValidated = false;
                    console.log("validation is not  valid");
                }
            });
        }
        else {
            this.controller.addError("initialization");
            this.controller.errors.length = 1;
        }
    };
    __decorate([
        bindable,
        __metadata("design:type", IApplicant)
    ], ApplicantCreate.prototype, "applicant", void 0);
    ApplicantCreate = __decorate([
        inject(ApplicantService, DialogService, ValidationControllerFactory),
        __metadata("design:paramtypes", [ApplicantService, DialogService, ValidationControllerFactory])
    ], ApplicantCreate);
    return ApplicantCreate;
}());
export { ApplicantCreate };
//# sourceMappingURL=applicant-create.js.map