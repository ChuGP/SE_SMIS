import { Encounter } from "../fhir-entity/fhirentity";

export const encounters:Encounter[]=[
    {
        "resourceType": "Encounter",
        "id": "102869",
        "type": [
            {
                "coding":[],
                "text": "allergy"
            },
            {
                "coding":[],
                "text": "heart attack"   
            }
        ],
        "period": {
            "start": "2015-09-09T08:10:21",
            "end": "2015-09-09T08:50:21"
        },
        "serviceProvider": {
            "reference":"Organization/99776",
            "display": "Ntut health center team"
        }
    }
]