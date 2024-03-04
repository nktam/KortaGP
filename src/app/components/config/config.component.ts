import {Component} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSelectModule} from '@angular/material/select';

@Component({
  selector: 'app-config',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatIconModule, MatSlideToggleModule, MatSelectModule],
  templateUrl: './config.component.html',
  styleUrl: './config.component.css'
})
export class ConfigComponent {
  selected='option2';
  sprint: boolean=false;
  equipo: string='red bull';
  posAlonso: number=1;
  posSainz: number=1;
}
