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
import { HttpClient } from 'aurelia-http-client';
import { inject } from 'aurelia-framework';
import { IApplicant } from "../../models/applicant.model";
var httpClient = new HttpClient();
var ApplicantEdit = (function () {
    function ApplicantEdit(applicantService, applicant) {
        this.applicantService = applicantService;
        this.applicant = applicant;
        this.message = "applicant-edit";
        this.applicantId = 0;
    }
    ApplicantEdit.prototype.activate = function (params) {
        var _this = this;
        console.log("params: ", params);
        this.applicantId = params.id;
        return httpClient.get('https://localhost:44396/api/applicant/GetApplicant/' + params.id)
            .then(function (data) {
            _this.applicant = JSON.parse(data.response);
        });
    };
    ApplicantEdit.prototype.updateApplicant = function () {
        console.log("updateApplicant: ", this.applicant);
        console.log("type of applicant", typeof (this.applicant));
        this.applicantService.updateApplicant(this.applicantId, this.applicant);
    };
    ApplicantEdit = __decorate([
        inject(ApplicantService),
        __metadata("design:paramtypes", [ApplicantService, IApplicant])
    ], ApplicantEdit);
    return ApplicantEdit;
}());
export { ApplicantEdit };
//# sourceMappingURL=applicant-edit.js.map