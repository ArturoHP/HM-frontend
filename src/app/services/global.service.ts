import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { MatDialog } from "@angular/material/dialog";

@Injectable({ providedIn: 'root' })
export class GlobalService {
  mainLoading: boolean = false;
  activeTab: string = 'home';

  notificationMessage: any = {
    message: '',
    status: ''
  };
  primaryMenu: boolean = true;

  constructor(private modal: MatDialog) {

  }

  getMainLoading() {
    return this.mainLoading;
  }
  
  setMainLoading(value: boolean) {
    this.mainLoading = value;
  }

  getNotificationMessage() {
    return this.notificationMessage;
  }

  getPrimaryMenu() {
    return this.primaryMenu;
  }

  getActiveTab(){
    return this.activeTab;
  }

  setActiveTab(activeTabName: string){
    this.activeTab = activeTabName;
  }

  /**
   * Se utiliza modal de confirmacion para mostrar
   * title = titulo de modal
   * message = cuerpo de mensaje en modal
   * @param config
   */
  
  }


