// popup.service.ts
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PopUpComponent } from './popup.component';

@Injectable({
  providedIn: 'root',
})
export class PopupService {
  constructor(private dialog: MatDialog) {}

  openErrorPopup(message: string): MatDialogRef<PopUpComponent> {
    return this.dialog.open(PopUpComponent, {
      width: '300 px',
      data: {
        message,
        type: 'error',
      },
    });
  }

  openSuccessPopup(message: string): MatDialogRef<PopUpComponent> {
    return this.dialog.open(PopUpComponent, {
      width: '300px',
      data: {
        message,
        type: 'success',
      },
    });
  }
}
