import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-reliability-score',
  templateUrl: './reliability-score.component.html',
  styleUrls: ['./reliability-score.component.scss'],
})
export class ReliabilityScoreComponent {
  @Input() score: number = 0; // Default score

  // Calculate the arrow's end point based on the score (range 0-100)
  calculateX(): number {
    const angle = (this.score / 100) * 180; // Convert score to angle (0° to 180°)
    return 50 + 40 * Math.cos((angle * Math.PI) / 180);
  }

  calculateY(): number {
    const angle = (this.score / 100) * 180;
    return 50 - 40 * Math.sin((angle * Math.PI) / 180);
  }
}
