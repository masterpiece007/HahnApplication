import {Aurelia} from 'aurelia-framework';
import * as environment from '../config/environment.json';
import { PLATFORM } from 'aurelia-pal';
import { SimpleValidationRenderer } from "./resources/validation/simple-validation-renderer";
import { I18N, Backend, TCustomAttribute } from 'aurelia-i18n';


export function configure(aurelia: Aurelia): void {
  aurelia.use
    .standardConfiguration()
    .feature(PLATFORM.moduleName('resources/index'))
    .plugin(PLATFORM.moduleName('aurelia-validation'))
    .plugin(PLATFORM.moduleName('aurelia-dialog'))
    .plugin(PLATFORM.moduleName('aurelia-i18n'), (instance) => {
      let aliases = ["t", "i18n"];
      TCustomAttribute.configureAliases(aliases);

      instance.i18next.use(Backend.with(aurelia.loader));
      return instance.setup({
        backend: {                                  // <-- configure backend settings
          //loadPath: './locales/{{lng}}/{{ns}}.json', // <-- XHR settings for where to get the files from
          loadPath: 'locales/{{lng}}/{{ns}}.json', // <-- XHR settings for where to get the files from
        },
        attributes: aliases,
        lng: 'en-ca',
        fallbackLng: 'de',
        debug: false,
        load: "currentOnly",
        ns:['nav','create-form','translation']
      });
    });

  aurelia.container.registerHandler("simple-renderer", container => container.get(SimpleValidationRenderer));

  aurelia.use.developmentLogging(environment.debug ? 'debug' : 'warn');

  if (environment.testing) {
    aurelia.use.plugin(PLATFORM.moduleName('aurelia-testing'));
  }

  aurelia.start().then(() => aurelia.setRoot(PLATFORM.moduleName('app')));
}
