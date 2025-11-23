export const initialMetricsResponse = { 
    "IsSuccess": true,
    "Metrics": {
        "orders": {
            "totalRevenue": 922,
            "totalOrders": 1,
            "averageOrderValue": 922,
            "totalCanceledOrders": 0,
            "recentOrders": [
                {
                    "_id": "692243b50a127d4d456d1bec",
                    "status": "Draft",
                    "customer": {
                        "_id": "69223a980a127d4d456d1bca",
                        "email": "tdavidziuk@gmail.com",
                        "name": "TD QA",
                        "country": "Belarus",
                        "city": "BIALYSTOK",
                        "street": "PIASTOWSKA",
                        "house": 5,
                        "flat": 55,
                        "phone": "+48789654123",
                        "createdOn": "2025-11-22T22:35:04.000Z",
                        "notes": ""
                    },
                    "products": [
                        {
                            "_id": "6910c66f177a6533d398d456",
                            "name": "Mouse99119",
                            "amount": 202,
                            "price": 922,
                            "manufacturer": "Xiaomi",
                            "notes": "2i4yhXLEeFPguU0vqv02QervSywRj8t4iGd8sUvJCBOydnEKXW2ONpt7KGd78rVcAyCrlb3wkvxno9SnLwMYuKdTwvpRuS4qBj5WZ73rOPi6yPZg2MqyapSo8VF1rzkWnmcBmvQtAtE1ltTYZlsrzdFFTQhtDTFQ1tXrnFsjQ0UHEAGvISZRPoTz4wtaFx28xKQFo50qVo2yzhoYda4vSs6B72dmyqxYzUzkPAQllki5UxbOvv3jZRSx9h",
                            "received": false
                        }
                    ],
                    "delivery": {
                        "address": {
                            "country": "Belarus",
                            "city": "BIALYSTOK",
                            "street": "PIASTOWSKA",
                            "house": 5,
                            "flat": 55
                        },
                        "finalDate": "2025-11-26T00:00:00.000Z",
                        "condition": "Delivery"
                    },
                    "total_price": 922,
                    "createdOn": "2025-11-22T23:13:57.000Z",
                    "comments": [],
                    "history": [
                        {
                            "status": "Draft",
                            "customer": "69223a980a127d4d456d1bca",
                            "products": [
                                {
                                    "_id": "6910c66f177a6533d398d456",
                                    "name": "Mouse99119",
                                    "amount": 202,
                                    "price": 922,
                                    "manufacturer": "Xiaomi",
                                    "notes": "2i4yhXLEeFPguU0vqv02QervSywRj8t4iGd8sUvJCBOydnEKXW2ONpt7KGd78rVcAyCrlb3wkvxno9SnLwMYuKdTwvpRuS4qBj5WZ73rOPi6yPZg2MqyapSo8VF1rzkWnmcBmvQtAtE1ltTYZlsrzdFFTQhtDTFQ1tXrnFsjQ0UHEAGvISZRPoTz4wtaFx28xKQFo50qVo2yzhoYda4vSs6B72dmyqxYzUzkPAQllki5UxbOvv3jZRSx9h",
                                    "received": false
                                }
                            ],
                            "total_price": 922,
                            "delivery": {
                                "address": {
                                    "country": "Belarus",
                                    "city": "BIALYSTOK",
                                    "street": "PIASTOWSKA",
                                    "house": 5,
                                    "flat": 55
                                },
                                "finalDate": "2025-11-26T00:00:00.000Z",
                                "condition": "Delivery"
                            },
                            "changedOn": "2025-11-23T01:34:04.000Z",
                            "action": "Delivery Scheduled",
                            "performer": {
                                "_id": "68f614a07a6bd7a5a91f62d5",
                                "username": "admin@example.com",
                                "firstName": "Admin",
                                "lastName": "Admin",
                                "roles": [
                                    "ADMIN"
                                ],
                                "createdOn": "2025/10/20 10:53:20"
                            },
                            "assignedManager": {
                                "_id": "68f614a07a6bd7a5a91f62d5",
                                "username": "admin@example.com",
                                "firstName": "Admin",
                                "lastName": "Admin",
                                "roles": [
                                    "ADMIN"
                                ],
                                "createdOn": "2025/10/20 10:53:20"
                            }
                        },
                        {
                            "status": "Draft",
                            "customer": "69223a980a127d4d456d1bca",
                            "products": [
                                {
                                    "_id": "6910c66f177a6533d398d456",
                                    "name": "Mouse99119",
                                    "amount": 202,
                                    "price": 922,
                                    "manufacturer": "Xiaomi",
                                    "notes": "2i4yhXLEeFPguU0vqv02QervSywRj8t4iGd8sUvJCBOydnEKXW2ONpt7KGd78rVcAyCrlb3wkvxno9SnLwMYuKdTwvpRuS4qBj5WZ73rOPi6yPZg2MqyapSo8VF1rzkWnmcBmvQtAtE1ltTYZlsrzdFFTQhtDTFQ1tXrnFsjQ0UHEAGvISZRPoTz4wtaFx28xKQFo50qVo2yzhoYda4vSs6B72dmyqxYzUzkPAQllki5UxbOvv3jZRSx9h",
                                    "received": false
                                }
                            ],
                            "total_price": 922,
                            "delivery": null,
                            "changedOn": "2025-11-23T01:32:24.000Z",
                            "action": "Order reopened",
                            "performer": {
                                "_id": "68f614a07a6bd7a5a91f62d5",
                                "username": "admin@example.com",
                                "firstName": "Admin",
                                "lastName": "Admin",
                                "roles": [
                                    "ADMIN"
                                ],
                                "createdOn": "2025/10/20 10:53:20"
                            },
                            "assignedManager": {
                                "_id": "68f614a07a6bd7a5a91f62d5",
                                "username": "admin@example.com",
                                "firstName": "Admin",
                                "lastName": "Admin",
                                "roles": [
                                    "ADMIN"
                                ],
                                "createdOn": "2025/10/20 10:53:20"
                            }
                        },
                        {
                            "status": "Canceled",
                            "customer": "69223a980a127d4d456d1bca",
                            "products": [
                                {
                                    "_id": "6910c66f177a6533d398d456",
                                    "name": "Mouse99119",
                                    "amount": 202,
                                    "price": 922,
                                    "manufacturer": "Xiaomi",
                                    "notes": "2i4yhXLEeFPguU0vqv02QervSywRj8t4iGd8sUvJCBOydnEKXW2ONpt7KGd78rVcAyCrlb3wkvxno9SnLwMYuKdTwvpRuS4qBj5WZ73rOPi6yPZg2MqyapSo8VF1rzkWnmcBmvQtAtE1ltTYZlsrzdFFTQhtDTFQ1tXrnFsjQ0UHEAGvISZRPoTz4wtaFx28xKQFo50qVo2yzhoYda4vSs6B72dmyqxYzUzkPAQllki5UxbOvv3jZRSx9h",
                                    "received": false
                                }
                            ],
                            "total_price": 922,
                            "delivery": null,
                            "changedOn": "2025-11-23T01:32:04.000Z",
                            "action": "Order canceled",
                            "performer": {
                                "_id": "68f614a07a6bd7a5a91f62d5",
                                "username": "admin@example.com",
                                "firstName": "Admin",
                                "lastName": "Admin",
                                "roles": [
                                    "ADMIN"
                                ],
                                "createdOn": "2025/10/20 10:53:20"
                            },
                            "assignedManager": {
                                "_id": "68f614a07a6bd7a5a91f62d5",
                                "username": "admin@example.com",
                                "firstName": "Admin",
                                "lastName": "Admin",
                                "roles": [
                                    "ADMIN"
                                ],
                                "createdOn": "2025/10/20 10:53:20"
                            }
                        },
                        {
                            "status": "Draft",
                            "customer": "69223a980a127d4d456d1bca",
                            "products": [
                                {
                                    "_id": "6910c66f177a6533d398d456",
                                    "name": "Mouse99119",
                                    "amount": 202,
                                    "price": 922,
                                    "manufacturer": "Xiaomi",
                                    "notes": "2i4yhXLEeFPguU0vqv02QervSywRj8t4iGd8sUvJCBOydnEKXW2ONpt7KGd78rVcAyCrlb3wkvxno9SnLwMYuKdTwvpRuS4qBj5WZ73rOPi6yPZg2MqyapSo8VF1rzkWnmcBmvQtAtE1ltTYZlsrzdFFTQhtDTFQ1tXrnFsjQ0UHEAGvISZRPoTz4wtaFx28xKQFo50qVo2yzhoYda4vSs6B72dmyqxYzUzkPAQllki5UxbOvv3jZRSx9h",
                                    "received": false
                                }
                            ],
                            "total_price": 922,
                            "delivery": null,
                            "changedOn": "2025-11-22T23:23:19.000Z",
                            "action": "Manager Assigned",
                            "performer": {
                                "_id": "68f614a07a6bd7a5a91f62d5",
                                "username": "admin@example.com",
                                "firstName": "Admin",
                                "lastName": "Admin",
                                "roles": [
                                    "ADMIN"
                                ],
                                "createdOn": "2025/10/20 10:53:20"
                            },
                            "assignedManager": {
                                "_id": "68f614a07a6bd7a5a91f62d5",
                                "username": "admin@example.com",
                                "firstName": "Admin",
                                "lastName": "Admin",
                                "roles": [
                                    "ADMIN"
                                ],
                                "createdOn": "2025/10/20 10:53:20"
                            }
                        },
                        {
                            "status": "Draft",
                            "customer": "69223a980a127d4d456d1bca",
                            "products": [
                                {
                                    "_id": "6910c66f177a6533d398d456",
                                    "name": "Mouse99119",
                                    "amount": 202,
                                    "price": 922,
                                    "manufacturer": "Xiaomi",
                                    "notes": "2i4yhXLEeFPguU0vqv02QervSywRj8t4iGd8sUvJCBOydnEKXW2ONpt7KGd78rVcAyCrlb3wkvxno9SnLwMYuKdTwvpRuS4qBj5WZ73rOPi6yPZg2MqyapSo8VF1rzkWnmcBmvQtAtE1ltTYZlsrzdFFTQhtDTFQ1tXrnFsjQ0UHEAGvISZRPoTz4wtaFx28xKQFo50qVo2yzhoYda4vSs6B72dmyqxYzUzkPAQllki5UxbOvv3jZRSx9h",
                                    "received": false
                                }
                            ],
                            "total_price": 922,
                            "delivery": null,
                            "changedOn": "2025-11-22T23:13:57.000Z",
                            "action": "Order created",
                            "performer": {
                                "_id": "68f614a07a6bd7a5a91f62d5",
                                "username": "admin@example.com",
                                "firstName": "Admin",
                                "lastName": "Admin",
                                "roles": [
                                    "ADMIN"
                                ],
                                "createdOn": "2025/10/20 10:53:20"
                            },
                            "assignedManager": null
                        }
                    ],
                    "assignedManager": {
                        "_id": "68f614a07a6bd7a5a91f62d5",
                        "username": "admin@example.com",
                        "firstName": "Admin",
                        "lastName": "Admin",
                        "roles": [
                            "ADMIN"
                        ],
                        "createdOn": "2025/10/20 10:53:20"
                    }
                }
            ],
            "ordersCountPerDay": [
                {
                    "date": {
                        "day": 22,
                        "month": 11,
                        "year": 2025
                    },
                    "count": 1
                }
            ]
        },
        "customers": {
            "totalNewCustomers": 1,
            "topCustomers": [
                {
                    "_id": "69223a980a127d4d456d1bca",
                    "totalSpent": 922,
                    "ordersCount": 1,
                    "customerName": "TD QA",
                    "customerEmail": "tdavidziuk@gmail.com"
                }
            ],
            "customerGrowth": [
                {
                    "date": {
                        "year": 2025,
                        "month": 11,
                        "day": 9
                    },
                    "count": 0
                },
                {
                    "date": {
                        "year": 2025,
                        "month": 11,
                        "day": 10
                    },
                    "count": 0
                },
                {
                    "date": {
                        "year": 2025,
                        "month": 11,
                        "day": 11
                    },
                    "count": 0
                },
                {
                    "date": {
                        "year": 2025,
                        "month": 11,
                        "day": 12
                    },
                    "count": 0
                },
                {
                    "date": {
                        "year": 2025,
                        "month": 11,
                        "day": 13
                    },
                    "count": 0
                },
                {
                    "date": {
                        "year": 2025,
                        "month": 11,
                        "day": 14
                    },
                    "count": 0
                },
                {
                    "date": {
                        "year": 2025,
                        "month": 11,
                        "day": 15
                    },
                    "count": 0
                },
                {
                    "date": {
                        "year": 2025,
                        "month": 11,
                        "day": 16
                    },
                    "count": 0
                },
                {
                    "date": {
                        "year": 2025,
                        "month": 11,
                        "day": 17
                    },
                    "count": 0
                },
                {
                    "date": {
                        "year": 2025,
                        "month": 11,
                        "day": 18
                    },
                    "count": 0
                },
                {
                    "date": {
                        "year": 2025,
                        "month": 11,
                        "day": 19
                    },
                    "count": 0
                },
                {
                    "date": {
                        "year": 2025,
                        "month": 11,
                        "day": 20
                    },
                    "count": 0
                },
                {
                    "date": {
                        "year": 2025,
                        "month": 11,
                        "day": 21
                    },
                    "count": 0
                },
                {
                    "date": {
                        "year": 2025,
                        "month": 11,
                        "day": 22
                    },
                    "count": 1
                },
                {
                    "date": {
                        "year": 2025,
                        "month": 11,
                        "day": 23
                    },
                    "count": 0
                }
            ]
        },
        "products": {
            "topProducts": [
                {
                    "name": "Mouse99119",
                    "sales": 1
                }
            ]
        }
    },
    "ErrorMessage": null
}