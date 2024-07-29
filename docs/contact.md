# Contact API Spec

## Create Contact

Endpoint : POST /api/contacts

Headers :
- Authorization: token

Request Body :

```json
{
  "first_name": "Luthfi",
  "last_name": "Hakim",
  "email": "luthfyhakim@gmail.com",
  "phone": "085335249308"
}
```

Response Body (Success) :

```json
{
  "status": 201,
  "message": "Success Create a New Contact",
  "data": {
    "id": 1,
    "first_name": "Luthfi",
    "last_name": "Hakim",
    "email": "luthfyhakim@gmail.com",
    "phone": "085335249308"
  }
}
```

## Get Contact

Endpoint : GET /api/contacts/:contactId

Headers :
- Authorization: token

Response Body (Success) :

```json
{
  "status": 201,
  "message": "Success Get Contact",
  "data": {
    "id": 1,
    "first_name": "Luthfi",
    "last_name": "Hakim",
    "email": "luthfyhakim@gmail.com",
    "phone": "085335249308"
  }
}
```

## Update Contact

Endpoint : PUT /api/contacts/:contactId

Headers :
- Authorization: token

Request Body :

```json
{
  "first_name": "Luthfi",
  "last_name": "Hakim",
  "email": "luthfyhakim@gmail.com",
  "phone": "085335249308"
}
```

Response Body (Success) :

```json
{
  "status": 201,
  "message": "Success Update Contact",
  "data": {
    "id": 1,
    "first_name": "Luthfi",
    "last_name": "Hakim",
    "email": "luthfyhakim@gmail.com",
    "phone": "085335249308"
  }
}
```

## Remove Contact

Endpoint : DELETE /api/contacts/:contactId

Headers :
- Authorization: token

Response Body (Success) :

```json
{
  "status": 201,
  "message": "Success Delete Contact",
  "data": true
}
```

## Search Contact

Endpoint : GET /api/contacts

Headers :
- Authorization: token

Query Params :
- name: string, contact first_name or contact last_name, optional
- phone: string, contact phone, optional
- email: string, contact email, optional
- page: number, default 1
- size: number, default 10

Response Body (Success) :

```json
{
  "status": 201,
  "message": "Success Update Contact",
  "data": [
    {
      "id": 1,
      "first_name": "Luthfi",
      "last_name": "Hakim",
      "email": "luthfyhakim@gmail.com",
      "phone": "085335249308"
    },
    {
      "id": 2,
      "first_name": "Luthfi",
      "last_name": "Hakim",
      "email": "luthfyhakim@gmail.com",
      "phone": "085335249308"
    }
  ],
  "paging": {
    "current_page": 1,
    "total_page": 10,
    "size": 10
  }
}
```
