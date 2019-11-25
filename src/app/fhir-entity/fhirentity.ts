export class FHIREntity {
}
export interface Patient{
   resourceType:string,
   active?:boolean,
   id?:string,
   name?:Name[],
   telecom?:Telecom[],
   birthDate?:string,
   gender?:string,
   address?:Address[],
   extension?:Extension[],
}
export interface Organization{
   resourceType:string,
   id?:string,
   name?:string,
   address?:Address[],
   type?:string,
   telecom?:Array<{system:string,value:string}>,
   alias?:string[]
}
export interface Address{
    line:Array<string>,
    use:string,
    city:string,
    state:string,
    postalCode:string,
    country:string
 }

 export interface Name{
  use:string,
  family:string,
  given:string[]  
 }

 export interface Telecom{
   system?: string,
	value?: string,
   use?: string,
   rank?:number
 }
 export interface Extension{
    url:string,
    valueString:string
 }