import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent {
  teamMembers = [
    { name: 'Alperen Akcakaya', role: 'Developer', bio: 'Worked on full-stack development.' },
    { name: 'Nazim Akcakaya', role: 'Designer', bio: 'Handled UI/UX design.' },
    // Add more members as needed
  ];
}
