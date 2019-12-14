import { Patient } from '../fhir-entity/fhirentity';

export const patients:Patient[]=[   
    {
        "resourceType": "Patient",
        "id": "99980",
        "maritalStatus": {
            "coding":[],
            "text": "Stable single"
        },
        "identifier":[
            {
                "value":"12345",
                "system":"privateKey"
            }
        ],
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
        ],
        "photo":[]
    },
    {
        "resourceType": "Patient",
        "id": "6",
    },
    {
        "resourceType": "Patient",
        "id": "angrybirdliugmail.com",
        "name": [
          {
            "use": "usual",
            "family": "Liu",
            "given": [
              "Joe"
            ]
          }
        ],
        "telecom": [
          {
            "value": "0987654321"
          }
        ],
        "gender": "male",
        "birthDate": "2007-01-01",
        "address": [
          {
            "city": "Taipei,12331"
          }
        ],
        "maritalStatus": {
            "coding":[],
            "text": "Stable single"
        },
         "extension": [
            {
                "url": "Encounter/102870",
                "valueString": "102870"
            },
            {
                "url": "Encounter/221237",
                "valueString": "221237"
            },
            {
                "url": "Encounter/221247",
                "valueString": "221247"
            },
            {
                "url": "Encounter/221248",
                "valueString": "221248"
            },
            {
                "url": "Encounter/221257",
                "valueString": "221257"
            },
            {
                "url": "Encounter/221258",
                "valueString": "221258"
            },
            {
                "url": "Encounter/221261",
                "valueString": "221261"
            }
        ]
      }
]