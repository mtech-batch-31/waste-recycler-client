export const API_PATH = {
    LOGIN : "/api/v1/auth/login",
    REGISTER : "/api/v1/user/register",
    PRICE : "/api/v1/request/price",
    REG_CONFIRM: "/api/v1/user/registrationConfirm",
    RETRIEVE : "/api/v1/request/retrieve",
}

export const TABLE_DATA = [
    {"category":"plastic","quantity":1,"units":"kg"},
    {"category":"plastic","quantity":1,"units":"kg"},

]

export const ACCESS_TOKEN = "accessToken"
// export const CATEGORY_DATA = [
//     {"category":"Plastic","units":"kg"},
//     {"category":"Paper","units":"kg"},
//     {"category":"Metal","units":"kg"},
//     {"category":"Textile","units":"kg"}
// ]

export const CATEGORY_DATA = [
    {
        "category": "Glass",
        "price": 200,
        "quantity": 0.0,
        "unitOfMeasurement": "ton"
    },
    {
        "category": "Electronics",
        "price": 700,
        "quantity": 0.0,
        "unitOfMeasurement": "item"
    },
    {
        "category": "Plastic",
        "price": 100,
        "quantity": 0.0,
        "unitOfMeasurement": "g"
    },
    {
        "category": "Paper",
        "price": 50,
        "quantity": 0.0,
        "unitOfMeasurement": "ton"
    },
    {
        "category": "Battery",
        "price": 500,
        "quantity": 0.0,
        "unitOfMeasurement": "kg"
    },
    {
        "category": "Clothes",
        "price": 300,
        "quantity": 0.0,
        "unitOfMeasurement": "g"
    }
];


export const MOCK_PRICING_RESP = {
    "returnCode": "00",
    "message": "The request has been successfully processed",
    "totalPrice": 800,
    "items": [
        {
            "name": "Plastic",
            "quantity": 1,
            "price": 100,
            "totalPrice": 100
        },
        {
            "name": "Electronics",
            "quantity": 1,
            "price": 700,
            "totalPrice": 700
        }
    ]
}