import { HealthcareService } from '../fhir-entity/fhirentity'

export const healthCareServices: HealthcareService[] = [
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
                "text": "Psychotherapy"
            },
            {
                "coding": [
                    {
                        "system": "Psychiatry",
                        "code": "Psychiatry",
                        "display": "Psychiatry"
                    }
                ],
                "text": "Psychiatry"
            }
        ],
        "providedBy": {
            "reference": "Organization/257318",
            "display": "NTUT"
        },
        "name": "Psychiatry",
        "comment": "This Service is for SMIS demo"
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
    },

    {
        "resourceType": "HealthcareService",
        "id": "253118",
        "type": [
            {
                "coding": [
                    {
                        "system": "http://snomed.info/sct",
                        "code": "394913002",
                        "display": "Adolescent Epilepsy Center"
                    }
                ]
            },
            {
                "coding": [
                    {
                        "system": "http://snomed.info/sct",
                        "code": "394587001",
                        "display": "General Pediatrics"
                    }
                ]
            },
            {
                "coding": [
                    {
                        "system": "http://snomed.info/sct",
                        "code": "394587001",
                        "display": "Neonatology & Developmental Biology"
                    }
                ]
            },
            {
                "coding": [
                    {
                        "system": "http://snomed.info/sct",
                        "code": "394587001",
                        "display": "Pediatric Allergy and Immunology"
                    }
                ]
            },
            {
                "coding": [
                    {
                        "system": "http://snomed.info/sct",
                        "code": "394587001",
                        "display": "Pediatric Cardiology"
                    }
                ]
            },
            {
                "coding": [
                    {
                        "system": "http://snomed.info/sct",
                        "code": "394587001",
                        "display": "Pediatric Craniofacial Clinic"
                    }
                ]
            },
            {
                "coding": [
                    {
                        "system": "http://snomed.info/sct",
                        "code": "394587001",
                        "display": "Pediatric Critical Care"
                    }
                ]
            },
            {
                "coding": [
                    {
                        "system": "http://snomed.info/sct",
                        "code": "394587001",
                        "display": "Pediatric Dermatology"
                    }
                ]
            },
            {
                "coding": [
                    {
                        "system": "http://snomed.info/sct",
                        "code": "394587001",
                        "display": "Pediatric Endocrinology"
                    }
                ]
            },
            {
                "coding": [
                    {
                        "system": "http://snomed.info/sct",
                        "code": "394587001",
                        "display": "Pediatric Epilepsy Surgery"
                    }
                ]
            },
            {
                "coding": [
                    {
                        "system": "http://snomed.info/sct",
                        "code": "394587001",
                        "display": "Pediatric Gastroenterology"
                    }
                ]
            }
        ],
        "name": "Pediatrics",
        "comment": "Childern health service"
    },

    {
        "resourceType": "HealthcareService",
        "id": "255735",
        "type": [
            {
                "coding": [
                    {
                        "system": "http://snomed.info/sct",
                        "code": "394913002",
                        "display": "Bladder Cancer"
                    }
                ],
                "text": "膀胱癌"
            },
            {
                "coding": [
                    {
                        "system": "http://snomed.info/sct",
                        "code": "394587001",
                        "display": "Bone Marrow / Stem Cell Transplant"
                    }
                ],
                "text": "骨髓/幹細胞移植"
            },
            {
                "coding": [
                    {
                        "system": "http://snomed.info/sct",
                        "code": "394587001",
                        "display": "Brain Tumor Center"
                    }
                ],
                "text": "腦腫瘤中心"
            },
            {
                "coding": [
                    {
                        "system": "http://snomed.info/sct",
                        "code": "394587001",
                        "display": "Breast Health"
                    }
                ],
                "text": "乳房健康"
            },
            {
                "coding": [
                    {
                        "system": "http://snomed.info/sct",
                        "code": "394587001",
                        "display": "Cancer Genetics"
                    }
                ],
                "text": "癌症遺傳學"
            },
            {
                "coding": [
                    {
                        "system": "http://snomed.info/sct",
                        "code": "394587001",
                        "display": "CAR T-Cell Therapy"
                    }
                ],
                "text": "雞尾酒療法"
            },
            {
                "coding": [
                    {
                        "system": "http://snomed.info/sct",
                        "code": "394587001",
                        "display": "Colorectal Cancer"
                    }
                ],
                "text": "大腸癌"
            },
            {
                "coding": [
                    {
                        "system": "http://snomed.info/sct",
                        "code": "394587001",
                        "display": "Community Cancer Care"
                    }
                ],
                "text": "社區癌症護理"
            },
            {
                "coding": [
                    {
                        "system": "http://snomed.info/sct",
                        "code": "394587001",
                        "display": "Gynecologic Oncology"
                    }
                ],
                "text": "婦科腫瘤科"
            },
            {
                "coding": [
                    {
                        "system": "http://snomed.info/sct",
                        "code": "394587001",
                        "display": "Head and Neck Cancer"
                    }
                ],
                "text": "頭頸癌"
            },
            {
                "coding": [
                    {
                        "system": "http://snomed.info/sct",
                        "code": "394587001",
                        "display": "Kidney Cancer"
                    }
                ],
                "text": "腎癌"
            }
        ],
        "providedBy": {
            "reference": "Organization/257272",
            "display": "國立台灣大學醫學院附設醫院"
        },
        "name": "Cancer Services",
        "comment": "Cancer health service"
    },

    {
        "resourceType": "HealthcareService",
        "id": "257078",
        "type": [
            {
                "coding": [
                    {
                        "system": "http://snomed.info/sct",
                        "code": "394913002",
                        "display": "Internal Cardiology Medicine"
                    }
                ],
                "text": "心臟內科"
            },
            {
                "coding": [
                    {
                        "system": "http://snomed.info/sct",
                        "code": "394587001",
                        "display": "Liver Diseases Treatment"
                    }
                ],
                "text": "肝臟疾病治療"
            },
            {
                "coding": [
                    {
                        "system": "http://snomed.info/sct",
                        "code": "394587001",
                        "display": "Fertility and Reproductive Medicine"
                    }
                ],
                "text": "生殖醫學"
            },
            {
                "coding": [
                    {
                        "system": "http://snomed.info/sct",
                        "code": "394587001",
                        "display": "Esthetic Dermatology"
                    }
                ],
                "text": "皮膚美容醫學"
            },
            {
                "coding": [
                    {
                        "system": "http://snomed.info/sct",
                        "code": "394587001",
                        "display": "Joint Replacement Surgery"
                    }
                ],
                "text": "關節置換手術"
            }
        ],
        "name": "International Medical Service",
        "comment": "國際醫療",
        "providedBy": {
            "reference": "Organization/257272",
            "display": "國立台灣大學醫學院附設醫院"
        },
    },

    {
        "resourceType": "HealthcareService",
        "id": "257261",
        "providedBy": {
            "reference": "Organization/257272",
            "display": "國立台灣大學醫學院附設醫院"
        },
        "type": [
            {
                "coding": [
                    {
                        "system": "http://snomed.info/sct",
                        "code": "394913002",
                        "display": "Cerebrovascular diseases"
                    }
                ],
                "text": "腦血管"
            },
            {
                "coding": [
                    {
                        "system": "http://snomed.info/sct",
                        "code": "394587001",
                        "display": "Neuro-Oncology"
                    }
                ],
                "text": "神經腫瘤"
            },
            {
                "coding": [
                    {
                        "system": "http://snomed.info/sct",
                        "code": "394587001",
                        "display": "Electrophysiology and Functional Modulation Therapy of Neurological Disorders"
                    }
                ],
                "text": "神經電生理暨功能性治療"
            },
            {
                "coding": [
                    {
                        "system": "http://snomed.info/sct",
                        "code": "394587001",
                        "display": "Neuroimpairment and Recovery"
                    }
                ],
                "text": "神經傷害暨修復"
            },
            {
                "coding": [
                    {
                        "system": "http://snomed.info/sct",
                        "code": "394587001",
                        "display": "Neuropsychiatry Behavior"
                    }
                ],
                "text": "神經精神暨行為"
            },
            {
                "coding": [
                    {
                        "system": "http://snomed.info/sct",
                        "code": "394587001",
                        "display": "Neurodegeneration and Dementia"
                    }
                ],
                "text": "神經退化暨失智"
            }
        ],
        "name": "The Clinical Center for Neuroscience and Behavior",
        "comment": "臨床神經暨行為醫學中心"
    }
]
