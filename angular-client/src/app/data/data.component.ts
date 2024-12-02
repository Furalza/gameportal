import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Required for *ngFor and *ngIf directives
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-data',
  standalone: true,
  imports: [CommonModule], // Include CommonModule for template directives
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css'],
})
export class DataComponent implements OnInit {
  games: any[] = []; // Store the fetched games data
  isLoading: boolean = true; // Flag to indicate data loading
  errorMessage: string | null = null; // Store error messages

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.fetchGames();
  }

  fetchGames(): void {
    this.dataService.getGames().subscribe({
      next: (data) => {
        this.games = data;
        this.isLoading = false; // Stop loading indicator once data is fetched
      },
      error: (error) => {
        console.error('Error fetching games:', error);
        this.errorMessage = 'Unable to load games. Please try again later.';
        this.isLoading = false; // Stop loading even on error
      },
    });
  }
}
