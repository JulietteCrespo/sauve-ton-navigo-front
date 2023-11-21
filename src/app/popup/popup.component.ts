
import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { PopupService } from './popup.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopUpComponent implements OnInit {

  message: string;
  type: 'error' | 'success';

  constructor(@Inject(MAT_DIALOG_DATA) public data: { message: string, type: 'error' | 'success' },private popupService: PopupService, private dialogRef: MatDialogRef<PopUpComponent>) {

    this.message = data.message;
    this.type = data.type;
  }

  ngOnInit(): void {
    // Utilisez afterOpened pour déclencher la fermeture après 3 secondes
    this.dialogRef.afterOpened().subscribe(() => {
      setTimeout(() => {
        this.dialogRef.close();
      }, 3000);
    });
  }
}
