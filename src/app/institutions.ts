import {Organization, Address} from './fhir-entity/fhirentity';
const addresses:Address[]=[

]
const institutions:Organization[]=[
    {
        resourceType:'Organization',
        id:'99776',
        name:'Nine Night Hospital',
        address:[],
        type:'',
        telecom:[
            {
            "system": "phone",
            "value": "022-655 2320"
            },
            {
            "system": "email",
            "value": "cardio@burgersumc.nl"
            },
        ],
        alias:['ABC Insurance'] 
    },
    {
        resourceType:'Organization',
        id:'99343',
        name:'MLKCH-LA',
        address:[],
        type:'',
        telecom:[
            {
            "system": "phone",
            "value": "0988-777-654"
            },
            {
            "system": "email",
            "value": "7777@burgersumc.nl"
            },
        ],
        alias:['NTUT hospital'] 
    },
    {
        resourceType:'Organization',
        id:'94018',
        name:'ABC Insurance',
        address:[],
        type:'',
        telecom:[
            {
            "system": "phone",
            "value": "012-655 2320"
            },
            {
            "system": "email",
            "value": "cardio@burgersumc.nl"
            },
        ],
        alias:['ABCD Insurance'] 
    },





]

