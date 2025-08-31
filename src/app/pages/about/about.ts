import { Component } from '@angular/core';
import { Card } from '../../components/card/card';
import { Techcard } from '../../components/techcard/techcard';

@Component({
  selector: 'app-about',
  imports: [Card, Techcard],
  templateUrl: './about.html',
  styleUrl: './about.css'
})
export class About {

}
