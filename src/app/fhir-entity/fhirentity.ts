export class FHIREntity {
}
export interface PatientInfo{
   id:string,
   name:string,
   birthDate:Date,
   gender:string,
   familyMedicalRecord:Map<string,MedicalRecord>|any,
   medicalRecord:MedicalRecord|any;
}

export interface MedicalRecord{
   medicationRecord: Map<string,number>,//<medication:string,dose:number>
   diagnosisRecord:Map<string,string>,//<>
   allergyMedication:string[],
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
   id:string,
   name:string,
   address:Address[],
   medicalServices:MedicalService[],
   telecom:Array<{system:string,value:string}>,
   alias:string[]
}
export interface MedicalService{
   id:string,
   name:string,
   serviceType:string,
   description:string,
}
export interface Address{
    line:Array<string>,
    city:string,
    state:string,
    postalCode:string,
    country:string
 }