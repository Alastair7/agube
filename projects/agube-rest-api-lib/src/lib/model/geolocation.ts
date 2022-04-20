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

export interface Geolocation {
  readonly id?: string;
  latitude: string;
  longitude: string;
  zoom: number;
  horizontal_degree?: number;
  vertical_degree?: number;
}
