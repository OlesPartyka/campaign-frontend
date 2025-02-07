import { Component, OnInit } from '@angular/core';
import { CampaignService } from '../../services/campaign.service';
import { Campaign } from '../../models/campaign.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-campaign-list',
  standalone: true,
  templateUrl: './campaign-list.component.html',
  styleUrls: ['./campaign-list.component.scss'],
  imports: [CommonModule, RouterModule, NgIf, NgFor],
})
export class CampaignListComponent implements OnInit {
  campaigns: Campaign[] = [];
  errorMessage: string | null = null;

  constructor(
    private campaignService: CampaignService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCampaigns();
  }

  loadCampaigns(): void {
    this.campaignService.getCampaigns().subscribe({
      next: (data) => {
        this.campaigns = data;
        this.errorMessage = null;
      },
      error: (error) => {
        this.errorMessage = 'Failed to load campaigns. Please try again later.';
        console.error('Error fetching campaigns:', error);
      },
    });
  }

  deleteCampaign(id?: string): void {
    if (!id) {
      this.errorMessage = 'Error: Campaign ID not found';
      return;
    }

    this.campaignService.deleteCampaign(id).subscribe({
      next: () => this.loadCampaigns(),
      error: (error) => {
        console.error('Error deleting campaign:', error);
        this.errorMessage = 'Failed to delete campaign. Please try again later.';
      },
    });
  }

  editCampaign(id?: string): void {
    if (!id) return;
    this.router.navigate([`/campaign/${id}`]);
  }
}
