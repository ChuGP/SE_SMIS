import {HealthcareService} from '../fhir-entity/fhirentity'

export const healthCareServices:HealthcareService[]=[
    {
        "resourceType": "HealthcareService",
        "id": "140139",
        "type": [
            {
                "coding": [
                    {
                        "system": "Psychotherapy",
                        "code": "Psychotherapy",
                        "display": "Psychotherapy"
                    }
                ],
                "text":"Psychotherapy"
            },
            {
                "coding": [
                    {
                        "system": "Psychiatry",
                        "code": "Psychiatry",
                        "display": "Psychiatry"
                    }
                ],
                "text":"Psychiatry"
            }
        ],
        "name":"Psychiatry",
        "comment":"This Service is for SMIS demo"
    },
    {
        "resourceType": "HealthcareService",
        "id": "140140",
        "name": "Internal medicine",
        "comment": "This Service is for SMIS demo"
    },
    {
        "resourceType": "HealthcareService",
        "id": "140141",
        "name": "Psychiatry",
        "comment": "This Service is for SMIS demo"
    }
]