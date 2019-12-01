import {Organization, Address} from '../fhir-entity/fhirentity';
export const organizations:Organization[]=[
    {
        "resourceType":"Organization",
        "id":"99776",
        "name":"Nine Night Hospital",
        "address":[],
        "type":[
            {
                "coding":[
                    {
                        "system":"Nine",
                        "code":"Nine",
                        "display":"Nine"
                    }
                ],
                "text":"type 1"
            }
        ],
        "telecom":[
            {
            "system": "phone",
            "value": "022-655 2320"
            },
            {
            "system": "email",
            "value": "cardio@burgersumc.nl"
            },
        ],
        "alias":[
            "ABC Insurance"
        ],
        "extension":[
            {
                "url":"HealthcareService/140139",
                "valueString":"Psychiatry"
            },
            {
                "url":"HealthcareService/140140",
                "valueString":"Internal medicine"
            }
                
        ]
    },
    {
        "resourceType":"Organization",
        "id":"99343",
        "name":"MLKCH-LA",
        "address":[],
        "type":[
            {
                "coding":[
                    {
                        "system":"Nine",
                        "code":"Nine",
                        "display":"Nine"
                    }
                ],
                "text":"type 1"
            }
        ],
        "telecom":[
            {
            "system": "phone",
            "value": "0988-777-654"
            },
            {
            "system": "email",
            "value": "7777@burgersumc.nl"
            },
        ],
        "alias":[
            "NTUT hospital"
        ] 
    },
    {
        "resourceType":"Organization",
        "id":"94018",
        "name":"ABC Insurance",
        "address":[],
        "type":[
            {
                "coding":[
                    {
                        "system":"Nine",
                        "code":"Nine",
                        "display":"Nine"
                    }
                ],
                "text":"type 1"
            }
        ],
        "telecom":[
            {
            "system": "phone",
            "value": "012-655 2320"
            },
            {
            "system": "email",
            "value": "cardio@burgersumc.nl"
            },
        ],
        "alias":[
            "ABCD Insurance"
        ] 
    },





]

