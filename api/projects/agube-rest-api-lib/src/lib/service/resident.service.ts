/**
 * Agube API
 * Agube API REST definition
 *
 * OpenAPI spec version: v1
 * Contact: frannabril@gmail.com
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
/* tslint:disable:no-unused-variable member-ordering */

import {
  HttpClient,
  HttpEvent,
  HttpHeaders,
  HttpResponse,
} from '@angular/common/http';
import { Injectable, Optional } from '@angular/core';
import { Observable } from 'rxjs';
import { Configuration } from '../configuration';
import { AgubeRestConfigurationService } from '../configuration.service';
import { Resident } from '../model/resident';
import { ResidentDetail } from '../model/residentDetail';

@Injectable()
export class ResidentService {
  protected basePath = '';
  public defaultHeaders = new HttpHeaders();
  public configuration = new Configuration();

  constructor(
    protected httpClient: HttpClient,
    private svcConfig: AgubeRestConfigurationService,
    @Optional() configuration: Configuration
  ) {
    if (configuration) {
      this.configuration = configuration;
      this.basePath = configuration.basePath || this.basePath;
    }
    this.basePath = this.svcConfig.getBasePath();
  }

  /**
   *
   * Get Resident by id
   * @param id A unique integer value identifying this resident.
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public getResident(
    id: number,
    observe?: 'body',
    reportProgress?: boolean,
  ): Observable<Resident>;
  public getResident(
    id: number,
    observe?: 'response',
    reportProgress?: boolean,
  ): Observable<HttpResponse<Resident>>;
  public getResident(
    id: number,
    observe?: 'events',
    reportProgress?: boolean,
  ): Observable<HttpEvent<Resident>>;
  public getResident(
    id: number,
    observe: any = 'body',
    reportProgress: boolean = false,
  ): Observable<any> {
    if (id === null || id === undefined) {
      throw new Error(
        'Required parameter id was null or undefined when calling getResident.'
      );
    }

    let headers = this.defaultHeaders;

    // authentication (Basic) required
    if (this.configuration.username || this.configuration.password) {
      headers = headers.set(
        'Authorization',
        'Basic ' +
          btoa(this.configuration.username + ':' + this.configuration.password)
      );
    }

    // to determine the Accept header
    let httpHeaderAccepts: string[] = ['application/json'];
    const httpHeaderAcceptSelected: string | undefined =
      this.configuration.selectHeaderAccept(httpHeaderAccepts);
    if (httpHeaderAcceptSelected != undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected);
    }

    // to determine the Content-Type header
    const consumes: string[] = ['application/json'];

    return this.httpClient.get<Resident>(
      `${this.basePath}/resident/${encodeURIComponent(String(id))}`,
      {
        headers: headers,
        observe: observe,
        reportProgress: reportProgress,
        withCredentials: this.configuration.withCredentials,
      }
    );
  }

  /**
   *
   * Return a list of all Residents of the logged manager.
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public getResidents(
    observe?: 'body',
    reportProgress?: boolean,
  ): Observable<Array<ResidentDetail>>;
  public getResidents(
    observe?: 'response',
    reportProgress?: boolean,
  ): Observable<HttpResponse<Array<ResidentDetail>>>;
  public getResidents(
    observe?: 'events',
    reportProgress?: boolean,
  ): Observable<HttpEvent<Array<ResidentDetail>>>;
  public getResidents(
    observe: any = 'body',
    reportProgress: boolean = false,
  ): Observable<any> {
    let headers = this.defaultHeaders;

    // authentication (Basic) required
    if (this.configuration.username || this.configuration.password) {
      headers = headers.set(
        'Authorization',
        'Basic ' +
          btoa(this.configuration.username + ':' + this.configuration.password)
      );
    }

    // to determine the Accept header
    const httpHeaderAccepts: string[] = ['application/json'];
    const httpHeaderAcceptSelected: string | undefined =
      this.configuration.selectHeaderAccept(httpHeaderAccepts);
    if (httpHeaderAcceptSelected != undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected);
    }

    // to determine the Content-Type header
    const consumes: string[] = ['application/json'];

    return this.httpClient.get<Array<ResidentDetail>>(
      `${this.basePath}/resident`,
      {
        headers: headers,
        observe: observe,
        reportProgress: reportProgress,
        withCredentials: this.configuration.withCredentials,
      }
    );
  }
}
