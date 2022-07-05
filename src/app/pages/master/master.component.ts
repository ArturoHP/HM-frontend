import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';
import { GlobalService } from 'src/app/services/global.service';
import { UnitsService } from 'src/app/services/units.service';

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.scss']
})
export class MasterComponent implements OnInit {

  yearWeeks:any = [];

  constructor(private unitsService: UnitsService,
    private globalService: GlobalService,
    private _snackBar: MatSnackBar) {
      this.globalService.setActiveTab('master');

    }

  ngOnInit(): void {
    
    this.unitsService.getAllUnits().subscribe((res) => {
      console.log(res);
    });

    this.processDatesOfYear();
  }


  processDatesOfYear(){
    var listDate = [];
    const startDate = moment().format("YYYY-MM-DD");
    const endDate = moment("2022-01-01").format("YYYY-MM-DD");
    const dateMove = new Date(startDate);
    let strDate = startDate;

    console.log(startDate,endDate)

    var datesByYear:any = [];
      
    var weekN;

    var firstYearWeeks:any =[];

    console.log(parseInt(moment(strDate).format('w')));

    for(var i = 1; i <= parseInt(moment(strDate).format('w')); i++){
      firstYearWeeks.push([]);
    }

    while (strDate > endDate) {
      strDate = dateMove.toISOString().slice(0, 10);
      listDate.push(strDate);
      dateMove.setDate(dateMove.getDate() - 1);
      weekN = parseInt(moment(strDate).format('w'));
      
      if((moment(strDate).day()+1) != 6 || (moment(strDate).day()+1) != 7){
        firstYearWeeks[weekN-1].push(strDate);
      }

    };

    firstYearWeeks.forEach((week:any) => {
      this.yearWeeks.push(week.reverse());
    });
    console.log(this.yearWeeks);

  }
  
      /*if(!weekAlreadyRegistered.includes(weekN)){
        weekAlreadyRegistered.push(weekN);  
      }*/
}
