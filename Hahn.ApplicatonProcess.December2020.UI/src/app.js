var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { EventAggregator } from 'aurelia-event-aggregator';
import { PLATFORM, inject } from 'aurelia-framework';
import { I18N } from 'aurelia-i18n';
require('bootstrap/bootstrap.bundle');
var App = (function () {
    function App(i18n, eventAggregator) {
        this.i18n = i18n;
        this.eventAggregator = eventAggregator;
        this.message = 'Hahn App';
        this.locale = true;
    }
    App.prototype.configureRouter = function (config, router) {
        config.title = 'hahn-cr';
        config.options.pushState = true;
        config.options.root = '/';
        config.map([
            {
                route: ['', 'applicants'],
                moduleId: PLATFORM.moduleName('components/applicant/applicant-list'),
                title: 'all-applicants'
            },
            {
                route: ['/all', 'applicants'],
                name: 'applicants',
                moduleId: PLATFORM.moduleName('components/applicant/applicant-list'),
                title: 'all-applicants'
            },
            {
                route: ['/detail/:id', 'applicant-detail'],
                name: 'applicant-detail',
                moduleId: PLATFORM.moduleName('components/applicant/applicant-detail'),
                title: 'applicant-detail', nav: true, href: '#detail'
            },
            {
                route: ['/create', 'applicant-create'],
                name: 'applicant-create',
                moduleId: PLATFORM.moduleName('components/applicant/applicant-create'),
                nav: true,
                title: 'applicant-create'
            },
            {
                route: ['/edit/:id', 'applicant-edit'],
                name: 'applicant-edit',
                moduleId: PLATFORM.moduleName('components/applicant/applicant-edit'),
                title: 'applicant-edit', nav: true, href: '#edit'
            }
        ]);
        config.mapUnknownRoutes('components/applicant/applicant-list');
        this.router = router;
    };
    App.prototype.setLocale = function () {
        this.locale = !this.locale;
        if (this.locale) {
            this.i18n.setLocale('en');
        }
        else {
            this.i18n.setLocale('de');
        }
    };
    App = __decorate([
        inject(I18N, EventAggregator),
        __metadata("design:paramtypes", [I18N, EventAggregator])
    ], App);
    return App;
}());
export { App };
//# sourceMappingURL=app.js.map