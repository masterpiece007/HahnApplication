var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { HttpClient } from 'aurelia-http-client';
import { inject } from 'aurelia-framework';
import { ApplicantService } from '../../services/applicant.services';
var httpClient = new HttpClient();
var ApplicantDetail = (function () {
    function ApplicantDetail(applicantService) {
        this.applicantService = applicantService;
        this.message = "applicant-detail";
        this.applicant = null;
    }
    ApplicantDetail.prototype.activate = function (params) {
        var _this = this;
        return httpClient.get('https://localhost:44396/api/applicant/GetApplicant/' + params.id)
            .then(function (data) {
            _this.applicant = JSON.parse(data.response);
            console.log(_this.applicant);
        });
    };
    ApplicantDetail = __decorate([
        inject(ApplicantService),
        __metadata("design:paramtypes", [ApplicantService])
    ], ApplicantDetail);
    return ApplicantDetail;
}());
export { ApplicantDetail };
//# sourceMappingURL=applicant-detail.js.map