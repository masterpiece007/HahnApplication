var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ApplicantService } from 'services/applicant.services';
import { inject } from 'aurelia-framework';
import { IApplicant } from '../../models/applicant.model';
import { I18N } from 'aurelia-i18n';
import { DialogService } from 'aurelia-dialog';
import { Prompt } from "../../helpers/modals/detail.modal";
var Applicants = (function () {
    function Applicants(applicantService, dialogService, i18n, allApplicants) {
        var _this = this;
        this.applicantService = applicantService;
        this.dialogService = dialogService;
        this.i18n = i18n;
        this.allApplicants = allApplicants;
        this.locale = true;
        this.message = "all applicants.";
        this.fetchedApplicant = new IApplicant();
        applicantService.getAllApplicants()
            .then(function (data) {
            _this.allApplicants = JSON.parse(data.response);
            console.log(_this.allApplicants);
        }).catch(function (err) {
            console.log(err);
        });
    }
    Applicants.prototype.getApplicant = function (id) {
        var _this = this;
        console.log("id.. ", id);
        this.applicantService.getApplicantById(id).then(function (result) {
            _this.fetchedApplicant = JSON.parse(result.response);
            console.log("fetched: ", _this.fetchedApplicant);
        }).then(function (next) {
            _this.dialogService.open({ viewModel: Prompt, model: _this.fetchedApplicant }).then(function (response) {
                if (!response.wasCancelled) {
                    console.log('OK');
                }
                else {
                    console.log('cancelled');
                }
            });
        });
    };
    Applicants.prototype.deleteApplicant = function (id) {
        alert("id: " + id);
        this.applicantService.deleteApplicant(id);
    };
    Applicants = __decorate([
        inject(ApplicantService, DialogService, I18N),
        __metadata("design:paramtypes", [ApplicantService, DialogService, I18N, Array])
    ], Applicants);
    return Applicants;
}());
export { Applicants };
//# sourceMappingURL=applicant-list.js.map