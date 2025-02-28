import { Injectable } from '@angular/core';
import  Swal  from 'sweetalert2'; 

@Injectable({
  providedIn: 'root'
})
export class AlertServiceService {

  constructor() { }

  fireAlert(message: string, subMessage: string) {
    return Swal.fire({
      title: message,
      text: subMessage,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'black',
      cancelButtonColor: 'brown',
      confirmButtonText: 'Yes',
      cancelButtonText: 'Cancel',
    });
  }
}
