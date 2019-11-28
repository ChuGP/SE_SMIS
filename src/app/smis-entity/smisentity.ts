export class SMISEntity {
}

export interface PatientInfo{
   resourceType:string,
   active?:boolean,
   id?:string,
   name?:Name[],
   telecom?:Telecom[],
   birthDate?:string,
   gender?:string,
   address?:Address[],
   family?:Map<string,PatientInfo>,
   medicalRecord?:Map<string,MedicalRecord>;
}

export interface MedicalRecord{
   diagnosis:string[],
   organization:string,
   time:string,
   // medicationRecord: Map<string,number>,//<medication:string,dose:number>
   // diagnosisRecord:Map<string,string>,//<>
   // allergyMedication:string[],
}
export interface AccountInfo{
   id:string,
   role:string,
   accountName:string,
   password:string,
   privateKey:string,
   email:string
}
export interface InstitutionInfo{
   resourceType:string,
   id?:string,
   name?:string,
   address?:Address[],
   medicalServices?:MedicalService[],
   type?:string,
   telecom?:Array<{system:string,value:string}>,
   alias?:string[]
}
export interface MedicalService{
   id:string,
   name:string,
   serviceType:string,
   description:string,
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

 export interface OutCome{
    resourceType:string,
    text:{
       status:string,
       div:string
      }
 }

 export interface Extension{
    url:string,
    valueString:string
 }