import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';
import { isDate } from 'moment';
import { GlobalService } from 'src/app/services/global.service';

import { UnitsService } from '../../services/units.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})


export class DashboardComponent implements OnInit {

  maxDatePicker: any;

  monterreyUnits:any = [];
  guadalajaraUnits:any = [];
  mexicoUnits:any = [];
  hermosilloUnits:any = [];
  lapazUnits:any = [];
  culiacanUnits:any = [];

  monterreyDeployUnits:any;
  guadalajaraDeployUnits:any;
  mexicoDeployUnits:any;
  hermosilloDeployUnits:any;
  lapazDeployUnits:any;
  culiacanDeployUnits:any;

  mantenimientoPreventivo:any = [];
  mantenimientoCorrectivo:any = [];

  unitsInOperation:any;
  unitsInMaintenance:any;



  constructor(
    private unitsService: UnitsService,
    private globalService: GlobalService,
    private _snackBar: MatSnackBar) {
    this.globalService.setActiveTab('dashboard');
  }

  async ngOnInit(): Promise<void> {
    //this.maxDatePicker = moment().add(1,'day').format('YYYY-MM-DD');

    (await this.unitsService.getUnitsByStatusAcron(['D','SA','SBY'])).subscribe((res) => {
      console.log(res);
      res.data.forEach((element:any) => {
        switch(parseInt(element.headquarters)){
          //Monterrey
          case 1:
            this.monterreyUnits.push(element);
            break;
          //Guadalajara
          case 2:
            this.guadalajaraUnits.push(element);
            break;
          //Mexico
          case 3:
            this.mexicoUnits.push(element);
            break;
          //Hermosillo
          case 4:
            this.hermosilloUnits.push(element);
            break;
          //La Paz
          case 5:
            this.lapazUnits.push(element);
            break;
          //Culiacan
          case 6:
            this.culiacanUnits.push(element);
            break;
        }
      });

      this.monterreyDeployUnits = new MatTableDataSource(this.monterreyUnits);
      this.guadalajaraDeployUnits = new MatTableDataSource(this.guadalajaraUnits)
      this.mexicoDeployUnits = new MatTableDataSource(this.mexicoUnits)
      this.hermosilloDeployUnits = new MatTableDataSource(this.hermosilloUnits)
      this.lapazDeployUnits = new MatTableDataSource(this.lapazUnits)
      this.culiacanDeployUnits = new MatTableDataSource(this.culiacanUnits)
    });
    (await this.unitsService.getUnitsByStatusAcron(['OP'])).subscribe((res) => {
      this.unitsInOperation = new MatTableDataSource(res.data);
    });
    (await this.unitsService.getUnitsByStatusAcron(['MP','MC'])).subscribe((res) => {
      this.unitsInMaintenance = new MatTableDataSource(res.data);
    });
  }

  public doMonterreyFilter = (value: any) => {
    this.monterreyDeployUnits.filter = value.trim().toLocaleLowerCase();
  }

  public doGuadalajaraFilter = (value:any) => {
    this.guadalajaraDeployUnits.filter = value.trim().toLocaleLowerCase();
  }

  public doMexicoFilter = (value: any) => {
    this.mexicoDeployUnits.filter = value.trim().toLocaleLowerCase();
  }

  public doHermosilloFilter = (value:any) => {
    this.hermosilloDeployUnits.filter = value.trim().toLocaleLowerCase();
  }

  public doLapazFilter = (value: any) => {
    this.lapazDeployUnits.filter = value.trim().toLocaleLowerCase();
  }

  public doCuliacanFilter = (value:any) => {
    this.culiacanDeployUnits.filter = value.trim().toLocaleLowerCase();
  }

  public doInOperationFilter = (value:any) => {
    this.unitsInOperation.filter = value.trim().toLocaleLowerCase();
  }

  logPlate(value:any){
    console.log(value);
  }


  async updateHeadquarterLocation(plate:any,fromHQ:any,toHQ:any){
    
    var dataToUpdate = {
      plate: plate,
      update_type: 1,
      date: formatDate(Date(), 'yyyy-MM-dd', 'en-US'),
      hq_from: fromHQ,
      hq_to: toHQ
    };

    (await this.unitsService.updateUnit(dataToUpdate)).subscribe((res:any) => {
      console.log(res);

      if(!res.error){
        if(toHQ != 8){
          this._snackBar.open("Se movio correctamente la unidad con placa: " + plate , '', {
            duration: 5000,
            verticalPosition: 'bottom',
            horizontalPosition: "left",
            panelClass: 'snack-bar'
          });
        }else{
          this._snackBar.open("Se movio correctamente la unidad con placa: " + plate, '', {
            duration: 5000,
            verticalPosition: 'bottom',
            horizontalPosition: "left",
            panelClass: 'snack-bar'
          });
        }
      }else{
        this._snackBar.open("Ocurrio un problema al mover la unidad\n" + res.data , '', {
          duration: 5000,
          verticalPosition: 'top',
          horizontalPosition: "right",
          panelClass: 'snack-bar'
        });
      }

    })

  }


  async drop(event: CdkDragDrop<any>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {

      if(
        event.previousContainer.data[event.previousIndex].status == "D" || 
        event.previousContainer.data[event.previousIndex].status == "SA" ||
        event.previousContainer.data[event.previousIndex].status == "SBY"){
        transferArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex,
        );
        await this.updateHeadquarterLocation(event.previousContainer.data[event.previousIndex].plate,event.previousContainer.data[event.previousIndex].headquarters,event.container.data[event.currentIndex+1].headquarters);
      }else{
        this._snackBar.open("No se puede mover debido a su Estatus", '', {
          duration: 5000,
          verticalPosition: 'top',
          horizontalPosition: "right",
          panelClass: 'snack-bar'
        });
        
        
      }
      
      
    }
  }

  
  async moveTo(plate:any,whereFrom:any,whereTo:any,typeMaintenance:any,desc:any = null,returnDate:any = null){

    //Set update status to mantenimientoPreventivo = 3 = MP
    //mantenimiento correctivo = 4 = MC
    //Añadir update en tabla unit_updates

    //hq_to = 8 = directo a taller

    if(String(desc).length !> 0 && moment(returnDate).isValid()){
      //console.log(plate,whereFrom,whereTo,typeMaintenance,desc,moment(returnDate).format("YYYY-MM-DD"));

      if (String(desc).length > 0) {
        var update_type;
        switch (typeMaintenance) {
          case "MP":
            update_type = 2;
            break;
          case "MC":
            update_type = 3;
            break;
        }
  
        var dataToUpdate = {
          updateData: {
            plate: plate,
            update_type: update_type,
            date: formatDate(Date(), 'yyyy-MM-dd', 'en-US'),
            hq_from: whereFrom,
            hq_to: whereTo,
            desc: desc,
            return_date: moment(returnDate).format("YYYY-MM-DD")
          },
          typeMaintenance: typeMaintenance,
        };
  
        (await this.unitsService.updateUnitToMaintenance(dataToUpdate)).subscribe((res) => {
          console.log(res);
  
          if(!res.error){
            this._snackBar.open("Se registro el ingreso a mantenimiento" , '', {
              duration: 4000,
              verticalPosition: 'bottom',
              horizontalPosition: "left",
              panelClass: 'snack-bar'
            });
            setTimeout(function(){
              window.location.reload();
            }, 3000);
          }else{
            console.log(res.data);
          }
        });
  
      }else{
        this._snackBar.open("La descripción no debe estar vacia" , '', {
          duration: 4000,
          verticalPosition: 'top',
          horizontalPosition: "end",
          panelClass: 'snack-bar'
        });
      }
    }else{
      this._snackBar.open("Revise los parametros para el registro del mantenimiento" , '', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: "end",
        panelClass: 'snack-bar'
      });
    }

    

    
  }

  

}
