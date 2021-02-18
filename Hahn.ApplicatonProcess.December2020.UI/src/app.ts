import { RouterConfiguration, Router, activationStrategy } from 'aurelia-router';
import { EventAggregator } from 'aurelia-event-aggregator';
//import { PLATFORM } from 'aurelia-pal';
import { PLATFORM, inject } from 'aurelia-framework';
import { title } from 'process';
import { I18N } from 'aurelia-i18n';
require('bootstrap/bootstrap.bundle');


@inject(I18N, EventAggregator)
export class App {
  public message = 'Hahn App';
  router: Router;
  constructor(private i18n: I18N, private eventAggregator: EventAggregator) {

  }
  configureRouter(config: RouterConfiguration, router: Router): void {
    config.title = 'hahn-cr';
    config.options.pushState = true;
    config.options.root = '/';
    config.map([
      {
        route: ['', 'applicant-create'],
        moduleId: PLATFORM.moduleName('components/applicant/applicant-create'),
        title: 'all-applicants'
      },
      {
        route: ['/all', 'applicants'],
        name: 'applicants',
        moduleId: PLATFORM.moduleName('components/applicant/applicant-list'),
        title: 'all-applicants',
        activationStrategy: activationStrategy.invokeLifecycle
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
        title: 'applicant-edit', nav: true, href:'#edit'
      }
     
      //{ route: 'applicant/:id', name: 'applicant-detail', moduleId: PLATFORM.moduleName('applicant-detail') },
      //{ route: 'applicant/edit/:id', name: 'applicant-edit', moduleId: PLATFORM.moduleName('applicant-edit') },
    ]);

    config.mapUnknownRoutes('components/applicant/applicant-list');
    this.router = router;

  }
  locale = true;
  setLocale() {
    this.locale = !this.locale
    if (this.locale) {
      this.i18n.setLocale('en');
      //this.eventAggregator.publish('localePub', 'en');
    } else {
      this.i18n.setLocale('de');
      //this.eventAggregator.publish('localePub', 'de');

    }
  }
}
