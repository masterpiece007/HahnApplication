//import { FrameworkConfiguration } from 'aurelia-framework';
//import { DialogConfiguration } from './dialog-configuration';
//export declare function configure(frameworkConfig: FrameworkConfiguration, callback?: (config: DialogConfiguration) => void): void | Promise<void>;
//export * from './interfaces';
//export * from './dialog-settings';
//export * from './dialog-configuration';
//export * from './renderer';
//export * from './dialog-cancel-error';
//export * from './dialog-close-error';
//export * from './dialog-result';
//export * from './dialog-service';
//export * from './dialog-controller';




declare module 'aurelia-dialog' {
  export class DialogService {
    open(settings: any): Promise<DialogResult>;
    //whenClosed(onfulfilled?: ((value: DialogResult) => DialogResult | PromiseLike<DialogResult>) | undefined | null, onrejected?: ((reason: any) => DialogResult | PromiseLike<DialogResult>) | undefined | null): Promise<DialogResult>;
  }
  export class DialogController {
    constructor(renderer, settings, resolve, reject);
    ok(result: any): Promise<DialogResult>;
    cancel(result: any): Promise<DialogResult>;
    error(message): Promise<DialogResult>;
    close(ok: boolean, result: any): Promise<DialogResult>;
    settings: { lock: boolean, centerHorizontalOnly: boolean };
  }

  export class DialogResult {
    wasCancelled: boolean;
    output: any;
    constructor(cancelled: boolean, result: any);
  }
}
