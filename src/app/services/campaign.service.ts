import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Campaign } from '../models/campaign.model';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CampaignService {
  private apiUrl = 'https://campaign-backend-mie0.onrender.com/api/campaigns';

  constructor(private http: HttpClient) {}

  getCampaigns(): Observable<Campaign[]> {
    return this.http.get<Campaign[]>(this.apiUrl).pipe(
      catchError((error) => {
        console.error('Error fetching campaigns:', error);
        throw error;
      })
    );
  }

  addCampaign(campaign: Omit<Campaign, '_id'>): Observable<Campaign> {
    return this.http.post<Campaign>(this.apiUrl, campaign).pipe(
      catchError((error) => {
        console.error('Error adding campaign:', error);
        throw error;
      })
    );
  }


  updateCampaign(updatedCampaign: Campaign): Observable<Campaign> {
    if (!updatedCampaign._id) {
      throw new Error('Campaign ID is required for update');
    }

    return this.http.put<Campaign>(`${this.apiUrl}/${updatedCampaign._id}`, updatedCampaign).pipe(
      catchError((error) => {
        console.error('Error updating campaign:', error);
        throw error;
      })
    );
  }

  deleteCampaign(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError((error) => {
        console.error('Error deleting campaign:', error);
        throw error;
      })
    );
  }
}
