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
   link?:Array<{other:Reference}>,
}
export interface Organization{
   resourceType:string,
   id?:string,
   name?:string,
   address?:Address[],
   type?:string,
   telecom?:Array<{system:string,value:string}>,
   alias?:string[],
   extension?:Extension[]
}

export interface Encounter{
   resourceType:string,
   id?:string,
   type?:CodeAbleConcept[] //use for store symptom
   subject?:Reference, //use for patient referencce
   period?:{ //time
      start:string,
      end:string
   },
   serviceProvider?:Reference, //use for save organization
}

export interface HealthcareService{
   resourceType:string,
   id?:string,
   type:CodeAbleConcept[],
   name:string,
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

 export interface CodeAbleConcept{
   coding:Coding[],
   text:string
 }

 export interface Coding{
    system:string,
    code:string,
    display:string
 }

 export interface Reference{
    reference?:string, //url
    display:string //display content
 }

 export interface Resource{
    resourceType:string,
    id?:string
 }