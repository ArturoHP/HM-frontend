import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GlobalService } from 'src/app/services/global.service';
import { SamsaraService } from 'src/app/services/samsara.service';
import { UnitsService } from 'src/app/services/units.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  constructor(
    private unitsService: UnitsService,
    private globalService: GlobalService,
    private _snackBar: MatSnackBar,
    private samsaraService: SamsaraService
    ) {
    }

  ngOnInit(): void {
    this.samsaraService.getVehiclesLocationSnapshots().subscribe((res) => {
      console.log(res);
    });
  }

}
