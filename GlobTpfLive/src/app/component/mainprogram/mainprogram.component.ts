import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProgramheaderComponent } from '../programheader/programheader.component';
import { CodingeducationComponent } from '../codingeducation/codingeducation.component';
import { CodingonwheelComponent } from '../codingonwheel/codingonwheel.component';
import { WomenempowermentComponent } from '../womenempowerment/womenempowerment.component';
import { CustomeProgramComponent } from '../custome-program/custome-program.component';

@Component({
  selector: 'app-mainprogram',
  standalone: true,
  imports: [RouterLink, ProgramheaderComponent, CodingeducationComponent, CodingonwheelComponent, WomenempowermentComponent, CustomeProgramComponent],
  templateUrl: './mainprogram.component.html',
  styleUrl: './mainprogram.component.css'
})
export class MainprogramComponent {

}
