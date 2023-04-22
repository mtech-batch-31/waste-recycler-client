export const API_PATH = {
    LOGIN : "/api/v1/auth/login",
    REGISTER : "/api/v1/user/register",
    PRICE : "/api/v1/request/categories",
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
        "name": "Battery",
        "price": 500,
        "quantity": 0,
        "unitOfMeasurement": "kg"
    },
    {
        "name": "Plastic",
        "price": 100,
        "quantity": 0,
        "unitOfMeasurement": "item"
    },
    {
        "name": "Clothes",
        "price": 300,
        "quantity": 0,
        "unitOfMeasurement": "g"
    },
    {
        "name": "Paper",
        "price": 50,
        "quantity": 0,
        "unitOfMeasurement": "box"
    },
    {
        "name": "Electronics",
        "price": 700,
        "quantity": 0,
        "unitOfMeasurement": "item"
    },
    {
        "name": "Glass",
        "price": 200,
        "quantity": 0,
        "unitOfMeasurement": "ton"
    }
]