/**
 * Subscription API
 * Subscription API REST definition
 *
 * OpenAPI spec version: v1
 * Contact: frannabril@gmail.com
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import { User } from './user';


export interface Client {
    readonly id?: string;
    user: User;
    community_name: string;
    phone_number?: string;
    payment_type: number;
}
