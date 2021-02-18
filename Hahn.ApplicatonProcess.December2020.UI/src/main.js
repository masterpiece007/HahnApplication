import * as environment from '../config/environment.json';
import { PLATFORM } from 'aurelia-pal';
import { SimpleValidationRenderer } from "./resources/validation/simple-validation-renderer";
import { Backend, TCustomAttribute } from 'aurelia-i18n';
export function configure(aurelia) {
    aurelia.use
        .standardConfiguration()
        .feature(PLATFORM.moduleName('resources/index'))
        .plugin(PLATFORM.moduleName('aurelia-validation'))
        .plugin(PLATFORM.moduleName('aurelia-dialog'))
        .plugin(PLATFORM.moduleName('aurelia-i18n'), function (instance) {
        var aliases = ["t", "i18n"];
        TCustomAttribute.configureAliases(aliases);
        instance.i18next.use(Backend.with(aurelia.loader));
        return instance.setup({
            backend: {
                loadPath: 'locales/{{lng}}/{{ns}}.json',
            },
            attributes: aliases,
            lng: 'en-ca',
            fallbackLng: 'de',
            debug: false,
            load: "currentOnly",
            ns: ['nav', 'create-form', 'translation']
        });
    });
    aurelia.container.registerHandler("simple-renderer", function (container) { return container.get(SimpleValidationRenderer); });
    aurelia.use.developmentLogging(environment.debug ? 'debug' : 'warn');
    if (environment.testing) {
        aurelia.use.plugin(PLATFORM.moduleName('aurelia-testing'));
    }
    aurelia.start().then(function () { return aurelia.setRoot(PLATFORM.moduleName('app')); });
}
//# sourceMappingURL=main.js.map