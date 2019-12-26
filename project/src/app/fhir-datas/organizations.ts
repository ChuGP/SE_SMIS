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
    {
        "resourceType": "Organization",
        "id": "dctracklab1321gmail.com",
        "extension": [
            {
                "url": "HealthcareService/242628",
                "valueString": "service1"
            }
        ],
        "type": [
            {
                "coding": [
                    {
                        "system": "team",
                        "code": "team"
                    }
                ],
                "text": "smis"
            }
        ],
        "name": "NTUTk",
        "alias": [
            "sssss"
        ],
        "telecom": [
            {
                "value": "0227712171"
            }
        ],
        "address": [
            {
                "city": "asdasdadasd"
            }
        ]
    },

    {
        "resourceType": "Organization",
        "id": "257272",
        "extension": [
            {
                "url": "HealthcareService/257078",
                "valueString": "International Medical Service"
            },
            {
                "url": "HealthcareService/257194",
                "valueString": "Physical Therapy Center"
            },
            {
                "url": "HealthcareService/257235",
                "valueString": "Cancer Administration and Coordination Center"
            },
            {
                "url": "HealthcareService/257261",
                "valueString": "The Clinical Center for Neuroscience and Behavior"
            }
        ],
        "type": [
            {
                "coding": [
                    {
                        "system": "team",
                        "code": "team"
                    }
                ],
                "text": "smis"
            }
        ],
        "name": "National Taiwan University Hospital",
        "alias": [
            "國立台灣大學醫學院附設醫院"
        ],
        "telecom": [
            {
                "value": "886-2-2312-3456"
            }
        ],
        "address": [
            {
                "text": "No.1, Changde St., Zhongzheng Dist.",
                "city": "Taipei City, Taiwan (R.O.C.)"
            }
        ]
    }



]

