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
import { Geolocation } from './geolocation';

export interface Address {
  readonly id?: string;
  is_external?: boolean;
  geolocation: Geolocation;
  city: string;
  country: string;
  city_district: string;
  municipality: string;
  postcode: string;
  province: string;
  state: string;
  village?: string;
  road?: string;
  number?: number;
  flat?: string;
  gate?: string;
}
