import { Component, OnInit, OnChanges, Input, SimpleChanges } from '@angular/core';
import { InstitutionInfo } from '../smis-entity/smisentity';
import { SMISFacadeService } from '../smis-facade/smis-facade.service';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-institutions-list',
  templateUrl: './institutions-list.component.html',
  styleUrls: ['./institutions-list.component.css']
})
export class InstitutionsListComponent implements OnInit,OnChanges {
  private dataSource
  private currentInstitution:InstitutionInfo
  private institutionColumns: string[] = ['id', 'name' ,'address', 'telecom'];
  @Input('searchParams')
  private searchParams;
  constructor(private smisFacade:SMISFacadeService) {
    this.display(this.searchParams)
  }
  
  ngOnInit() {
      
  }

  ngOnChanges(changes: SimpleChanges){
    if(changes.searchParams)
      this.display(changes.searchParams.currentValue)    
  }
  
  async selectInstitution(id){
    this.currentInstitution = await this.smisFacade.getInstitution(id)
  }

  async display(searchParams){
    if(!searchParams)
      searchParams = {type:'team'}
    let institutions = await this.smisFacade.searchInstitution(searchParams)
    this.dataSource = new MatTableDataSource<any>(institutions);
  }

}
