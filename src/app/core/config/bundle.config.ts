export class BundleConfig {
    public defaults: any = [
        {
            "id": 1001,
            "name": "Participants",
            "lebel": "Participants",
            "boxId": 100,
            "defaultTemplate": {
                "id": "100001",
                "name": "ParticipantsTemplate"                
            },
            "inboxUIConfig": {
                "showAddBtn": true,
                "showViewBtn": true,
                "showEditBtn": true,
                "showRmvBtn": true,
                "addBtnText": "Spot Registration",
                "editBtnText": "",
                "rmvBtnText": "",
                "gridViewConfg": [
                    {
                        "name": "slNo",
                        "label": "Sl. No.",
                        "className": "",                   
                        "listner": "showSlNo"                        
                    },
                    {
                        "name": "ai_id",
                        "label": "Registration Id",
                        "className": "",
                        "fieldType": "customView",                        
                        "listner": "showRegistrationId"                        
                    },
                    {
                        "name": "profileImage",
                        "label": "Profile",
                        "className": "",
                        "fieldType": "image"                        
                    },

                    {
                        "name": "fullName",
                        "label": "Name",
                        "className": "table-ellipses-class",   
                        "fieldType": "conbineField",                       
                        "fieldNames": ["firstName", "middleName", "lastName"]                        
                    },

                    // {
                    //     "name": "firstName",
                    //     "label": "First Name",
                    //     "className": "table-ellipses-class"                        
                    // },
                    // {
                    //     "name": "middleName",
                    //     "label": "Middle Name",
                    //     "className": ""                        
                    // },
                    // {
                    //     "name": "lastName",
                    //     "label": "Last Name",
                    //     "className": ""                        
                    // },
                    {
                        "name": "dob",
                        "label": "D.O.B.",
                        "fieldType": "dateField",
                        "dateFormat": "DD-MM-YYYY",   
                        "className": "table-ellipses-class"                      
                    },
                    {
                        "name": "events",
                        "label": "Event",
                        "className": "table-ellipses-class"                      
                    },
                    {
                        "name": "categoryName",
                        "label": "Category",
                        "className": ""                        
                    }, 
                    {
                        "name": "gender",
                        "label": "Gender",
                        "className": ""                        
                    }, 
                    {
                        "name": "weightDivision",
                        "label": "Weight Division",
                        "className": "table-ellipses-class"                        
                    },
                    {
                        "name": "paymentStatus",
                        "label": "Payment",
                        "className": ""                        
                    }
                ],
                "gridDetailsViewConfg": [
                    {
                        "name": "ai_id",
                        "label": "Registration Id",
                        "className": "",
                        "fieldType": "customView",                        
                        "listner": "showRegistrationId"                        
                    }
                ],
                "hasFilterButton": true,
                "filterConfig": [
                    // {
                    //     "fileterName": "Category",
                    //     "text": "Select Events",
                    //     "bundleId": 1002,
                    //     "templateName": "CategoryTemplate",
                    //     "listeners": []
                    // },
                    // {
                    //     "fileterName": "Category",
                    //     "text": "Select Category",
                    //     "bundleId": 1002,
                    //     "templateName": "CategoryTemplate",
                    //     "listeners": []
                    // },
                    // {
                    //     "fileterName": "Subcategory",
                    //     "text": "Select Gender",
                    //     "bundleId": 1003,
                    //     "templateName": "SubCategoryTemplate",
                    //     "listeners": []
                    // },
                    // {
                    //     "fileterName": "Subcategory",
                    //     "text": "Select Weight Division",
                    //     "bundleId": 1003,
                    //     "templateName": "SubCategoryTemplate",
                    //     "listeners": []
                    // }
                ],
                "defaultQuery": "",
                "sortConfig": [
                    {
                        "title": -1
                    }
                ],
                "preScript": "participantsPreScript",
                "postScript": "participantsPostScript"
            }
        },
        {
            "id": 1002,
            "name": "tieSheet",
            "lebel": "Tie Sheet",
            "boxId": 100,
            "defaultTemplate": {
                "id": "100002",
                "name": "tieSheetTemplate"                
            },
            "inboxUIConfig": {
                "showAddBtn": true,
                "showViewBtn": false,
                "showEditBtn": false,
                "showRmvBtn": false,
                "addBtnText": "Generate Tie Sheet",
                "editBtnText": "",
                "rmvBtnText": "",
                "gridViewConfg": [
                    {
                        "name": "slNo",
                        "label": "Sl. No.",
                        "className": "",                   
                        "listner": "showSlNo"                        
                    },
                    {
                        "name": "firstParticipantRegistrationId",
                        "label": "1st Participant Registration Id",
                        "className": ""                      
                    },
                    // {
                    //     "name": "firstParticipantProfileImage",
                    //     "label": "1st Participant Profile",
                    //     "className": "",
                    //     "fieldType": "image"                        
                    // },
                    {
                        "name": "firstParticipantName",
                        "label": "1st Participant Name",
                        "className": "table-ellipses-class"               
                    },
                    {
                        "name": "firstParticipantDistrict",
                        "label": "1st Participant District",
                        "className": ""               
                    },
                    {
                        "name": "firstParticipantWeight",
                        "label": "1st Participant Weight",
                        "className": ""               
                    },
                    {
                        "name": "secondParticipantRegistrationId",
                        "label": "2nd Participant Registration Id",
                        "className": ""                     
                    },
                    // {
                    //     "name": "secondParticipantProfileImage",
                    //     "label": "2nd Participant Profile",
                    //     "className": "",
                    //     "fieldType": "image"                        
                    // },
                    {
                        "name": "secondParticipantName",
                        "label": "2nd Participant Name",
                        "className": "table-ellipses-class"                      
                    },
                    {
                        "name": "secondParticipantDistrict",
                        "label": "2nd Participant District",
                        "className": ""               
                    },
                    {
                        "name": "secondParticipantWeight",
                        "label": "2nd Participant Weight",
                        "className": ""               
                    },
                    {
                        "name": "event",
                        "label": "Event",
                        "className": ""                        
                    },
                    {
                        "name": "categoryName",
                        "label": "Category",
                        "className": ""                        
                    }, 
                    {
                        "name": "gender",
                        "label": "Gender",
                        "className": ""                        
                    }, 
                    {
                        "name": "weightDivision",
                        "label": "Weight Division",
                        "className": "table-ellipses-class"                        
                    }
                ],
                "gridDetailsViewConfg": [],
                "hasFilterButton": true,
                "filterConfig": [
                    // {
                    //     "fileterName": "Category",
                    //     "text": "Select Events",
                    //     "bundleId": 1002,
                    //     "templateName": "CategoryTemplate",
                    //     "listeners": []
                    // },
                    // {
                    //     "fileterName": "Category",
                    //     "text": "Select Category",
                    //     "bundleId": 1002,
                    //     "templateName": "CategoryTemplate",
                    //     "listeners": []
                    // },
                    // {
                    //     "fileterName": "Subcategory",
                    //     "text": "Select Gender",
                    //     "bundleId": 1003,
                    //     "templateName": "SubCategoryTemplate",
                    //     "listeners": []
                    // },
                    // {
                    //     "fileterName": "Subcategory",
                    //     "text": "Select Weight Division",
                    //     "bundleId": 1003,
                    //     "templateName": "SubCategoryTemplate",
                    //     "listeners": []
                    // }
                ],
                "defaultQuery": "",
                "sortConfig": [
                    {
                        "title": -1
                    }
                ],
                "preScript": "tieSheetPreScript",
                "postScript": "tieSheetPostScript"
            }
        },
        {
            "id": 1003,
            "name": "idcard",
            "lebel": "Id Card",
            "boxId": 100,
            "defaultTemplate": {
                "id": "100003",
                "name": "IdcardTemplate"                
            },
            "inboxUIConfig": {
                "showAddBtn": true,
                "showViewBtn": false,
                "showEditBtn": true,
                "showRmvBtn": true,
                "addBtnText": "New Id Card",
                "editBtnText": "",
                "rmvBtnText": "",
                "gridViewConfg": [
                    {
                        "name": "slNo",
                        "label": "Sl. No.",
                        "className": "",                   
                        "listner": "showSlNo"                        
                    },
                    {
                        "name": "name",
                        "label": "Name",
                        "className": ""                      
                    },
                    {
                        "name": "profileImage",
                        "label": "Profile",
                        "className": "",
                        "fieldType": "image"                        
                    },
                    {
                        "name": "state",
                        "label": "State",
                        "className": ""               
                    },
                    {
                        "name": "district",
                        "label": "District",
                        "className": ""               
                    },
                    {
                        "name": "mobile",
                        "label": "Mobile",
                        "className": ""               
                    },
                    {
                        "name": "memberType",
                        "label": "Member Type",
                        "className": ""                     
                    }
                ],
                "gridDetailsViewConfg": [],
                "hasFilterButton": true,
                "filterConfig": [
                    // {
                    //     "fileterName": "Category",
                    //     "text": "Select Events",
                    //     "bundleId": 1002,
                    //     "templateName": "CategoryTemplate",
                    //     "listeners": []
                    // },
                    // {
                    //     "fileterName": "Category",
                    //     "text": "Select Category",
                    //     "bundleId": 1002,
                    //     "templateName": "CategoryTemplate",
                    //     "listeners": []
                    // },
                    // {
                    //     "fileterName": "Subcategory",
                    //     "text": "Select Gender",
                    //     "bundleId": 1003,
                    //     "templateName": "SubCategoryTemplate",
                    //     "listeners": []
                    // },
                    // {
                    //     "fileterName": "Subcategory",
                    //     "text": "Select Weight Division",
                    //     "bundleId": 1003,
                    //     "templateName": "SubCategoryTemplate",
                    //     "listeners": []
                    // }
                ],
                "defaultQuery": "",
                "sortConfig": [
                    {
                        "title": -1
                    }
                ],
                "preScript": "idcardPreScript",
                "postScript": ""
            }
        }
    ];

    public get configs(): any {
        return this.defaults;
    }
}