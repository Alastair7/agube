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
import { Address } from './address';
import { WaterMeter } from './waterMeter';

export interface ReservoirCreate {
  readonly id?: string;
  address: Address;
  user_id?: number;
  water_meter: WaterMeter;
  capacity: string;
  inlet_flow: string;
  outlet_flow: string;
}
