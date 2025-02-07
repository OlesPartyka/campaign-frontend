import { Routes } from '@angular/router';
import { CampaignListComponent } from './components/campaign-list/campaign-list.component';
import { CampaignFormComponent } from './components/campaign-form/campaign-form.component';

export const routes: Routes = [
  { path: '', component: CampaignListComponent },
  { path: 'campaign/new', component: CampaignFormComponent },
  { path: 'campaign/:id', component: CampaignFormComponent },
];
