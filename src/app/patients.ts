const patients=[
    {
        resourceType:"Patient",
        id:'99980',
        name:[
            {
            use:"usual",
            family: "Kundu",
            given: [
              "Aritra",
              "Test",
              "aaaaa"
            ]
          },
        ],
        active:true,
        telecom:[
            {
            system: "iphone",
            value: "0800 096 000",
            use: "work",
            rank:1
        },
        ],
        gender:"male",
        birthDate:"2045-01-01",
        address:[
            {
                use: "home",
                line: [
                    "Unit 7",
                    "76 Clydesdale St"
                  ],
                  city: "Como",
                  state: "WA",
                  postalCode: "6152",
                  country: "Australia"
            }
        ]
    },

]