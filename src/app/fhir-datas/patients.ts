import { Patient } from '../fhir-entity/fhirentity';

export const patients:Patient[]=[   
    {
        "resourceType": "Patient",
        "id": "99980",
        "active": true,
        "name": [
            {
                "use":"usual",
                "family": "Kundu",
                "given": [
                    "Aritra"
                ]
            }
        ],
        "extension": [
            {
                "url": "Encounter/102869",
                "valueString": "102869"
            },
            {
                "url": "Encounter/102870",
                "valueString": "102870"
            }
        ],
        "telecom": [
            {
                "system": "phone",
                "value": "(03) 5555 6789",
                "use": "home"
            }
        ],
        "gender": "male",
        "birthDate": "1986-12-16",
        "address": [
            {
                "use": "home",
                "line": [
                    "3300 Washtenaw"
                ],
                "city": "Ann Harbor",
                "state": "MI",
                "postalCode": "48104",
                "country": "US"
            }
        ],
        "link": [
            {
                "other": {
                    "reference": "Patient/6",
                    "display": "dad"
                }
            }
        ]
    },
    {
        "resourceType": "Patient",
        "id": "6",
    }
]