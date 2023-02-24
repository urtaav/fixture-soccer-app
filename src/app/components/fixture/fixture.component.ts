import { Component, ElementRef, ViewChild } from '@angular/core';
import { ITeam } from 'src/app/interfaces/team';
import { StoreService } from 'src/app/services/store.service';
import { generateFixture } from 'src/app/utils/generate-fixture';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-fixture',
  templateUrl: './fixture.component.html',
  styleUrls: ['./fixture.component.scss']
})
export class FixtureComponent {

  teams: ITeam[] = [];

  fixture: any;
  @ViewChild('fixturelist') fixturelistElement!: ElementRef;
  
  constructor(private store: StoreService) {
    this.store.getTeams().subscribe(teams => {
      this.teams = teams;
      let teamsMap = teams.map(t => t.name);
      this.updateFixture(teamsMap, false);
    });
  }


  sortear = () => {
    let teams = this.teams;
    let teamsMap = teams.map(t => t.name).sort((a, b) => Math.random() - 0.5);
    this.updateFixture(teamsMap, true);
  }

  updateFixture = (teamsMap: any, isSort: boolean) => {
    if(teamsMap.length > 0) {
      if (isSort) {
        this.fixture = generateFixture(teamsMap);
        console.log("  this.fixture", this.fixture);
        this.store.saveFixture(this.fixture);
        console.log(" this.fixture", this.fixture)
      } else {
  
        let fistureStorage = this.store.getFixture();
        console.log("fistureStorage", fistureStorage)
        if (fistureStorage) {
          console.log("existe")
          this.fixture = fistureStorage;
        } else {
          console.log("no existe")
          this.fixture = generateFixture(teamsMap);
          this.store.saveFixture(this.fixture);
          console.log(" this.fixture", this.fixture)
        }
      }
    }

  }

  export_pdf = () => {
    console.log("export");

    html2canvas(this.fixturelistElement.nativeElement, { scale: 3 }).then((canvas) => {
      const imageGeneratedFromTemplate = canvas.toDataURL('image/png');
      const fileWidth = 270;
      const generatedImageHeight = (canvas.height * fileWidth) / canvas.width;
      let PDF = new jsPDF('l', 'mm', 'a4',);
      PDF.addImage(imageGeneratedFromTemplate, 'PNG', 10, 10, fileWidth, generatedImageHeight,);

      PDF.html(this.fixturelistElement.nativeElement.innerHTML, { margin: 100 })
      PDF.save('ng⚽Fut-fixture-pdf.pdf');
    });
  }
}