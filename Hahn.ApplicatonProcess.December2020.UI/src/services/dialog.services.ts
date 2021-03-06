﻿import { DialogService } from 'aurelia-dialog';
import { inject } from 'aurelia-framework';
//import { inject } from '../../node_modules/aurelia-framework/dist/aurelia-framework';
import { Prompt } from '../components/hahn.modal';

@inject(DialogService)

export class DialogService_ {
  dialogService: any;
  constructor(dialogService) {
    this.dialogService = dialogService;
  }
  openModal() {
    this.dialogService.open({ viewModel: Prompt, model: 'Are you sure?' }).then(response => {
      console.log(response);

      if (!response.wasCancelled) {
        console.log('OK');
      } else {
        console.log('cancelled');
      }
      console.log(response.output);
    });
  }
};
