import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CampaignService } from '../../services/campaign.service';
import { NotificationService } from '../../services/notification.service';
import { Campaign } from '../../models/campaign.model';

@Component({
  selector: 'app-campaign-form',
  standalone: true,
  templateUrl: './campaign-form.component.html',
  styleUrls: ['./campaign-form.component.scss'],
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
})
export class CampaignFormComponent implements OnInit {
  campaignForm: FormGroup;
  isEditMode = false;
  campaignId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private campaignService: CampaignService,
    private notificationService: NotificationService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.campaignForm = this.fb.group({
      name: ['', Validators.required],
      keywords: ['', Validators.required],
      bidAmount: [null, [Validators.required, Validators.min(1)]],
      fund: [null, [Validators.required, Validators.min(1)]],
      status: [true, Validators.required],
      town: ['', Validators.required],
      radius: [1, [Validators.required, Validators.min(1)]],
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.campaignId = id;
        this.loadCampaignData();
      }
    });
  }

  private loadCampaignData(): void {
    this.campaignService.getCampaigns().subscribe((campaigns) => {
      const found = campaigns.find(
        (c) => c._id === this.campaignId
      );
      if (found) {
        this.campaignForm.patchValue({
          ...found,
          keywords: found.keywords.join(', '),
        });
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/']);
  }

  saveCampaign(): void {
    if (this.campaignForm.invalid) {
      this.campaignForm.markAllAsTouched();
      this.notificationService.showMessage('Please fill in all required fields!');
      return;
    }

    const formValues = this.campaignForm.getRawValue();

    const keywords = formValues.keywords
      ? formValues.keywords.split(',').map((keyword: string) => keyword.trim())
      : [];

    const campaignData: Omit<Campaign, '_id'> = {
      name: formValues.name,
      keywords,
      bidAmount: formValues.bidAmount,
      fund: formValues.fund,
      status: formValues.status,
      town: formValues.town,
      radius: formValues.radius,
    };

    if (this.isEditMode && this.campaignId) {
      this.campaignService.updateCampaign({ _id: this.campaignId, ...campaignData }).subscribe(() => {
        this.notificationService.showMessage('Campaign updated successfully!');
        this.router.navigate(['/']);
      });
    } else {
      this.campaignService.addCampaign(campaignData).subscribe(() => {
        this.notificationService.showMessage('Campaign created successfully!');
        this.router.navigate(['/']);
      });
    }
  }

}
