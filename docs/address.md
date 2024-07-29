# Address API Spec

## Create Address

Endpoint : POST /api/contacts/:contactId/address

Headers :
- Authorization: token

Request Body :

```json
{
  "street": "Jalan, (optional)",
  "city": "Kota, (optional)",
  "province": "Provinsi, (optional)",
  "country": "Negara apa saja",
  "postal_code": "123123"
}
```

Response Body :

```json
{
  "status": 201,
  "message": "Success Create a New Address",
  "data": {
    "id": 1,
    "street": "Jalan, (optional)",
    "city": "Kota, (optional)",
    "province": "Provinsi, (optional)",
    "country": "Negara apa saja",
    "postal_code": "123123"
  }
}
```

## Get Address

Endpoint : GET /api/contacts/:contactId/address/:addressId

Headers :
- Authorization: token

Response Body :

```json
{
  "status": 201,
  "message": "Success Get Address",
  "data": {
    "id": 1,
    "street": "Jalan, (optional)",
    "city": "Kota, (optional)",
    "province": "Provinsi, (optional)",
    "country": "Negara apa saja",
    "postal_code": "123123"
  }
}
```

## Update Address

Endpoint : PUT /api/contacts/:contactId/address/:addressId

Headers :
- Authorization: token

Request Body :

```json
{
  "street": "Jalan, (optional)",
  "city": "Kota, (optional)",
  "province": "Provinsi, (optional)",
  "country": "Negara apa saja",
  "postal_code": "123123"
}
```

Response Body :

```json
{
  "status": 201,
  "message": "Success Update Address",
  "data": {
    "id": 1,
    "street": "Jalan, (optional)",
    "city": "Kota, (optional)",
    "province": "Provinsi, (optional)",
    "country": "Negara apa saja",
    "postal_code": "123123"
  }
}
```

## Remove Address

Endpoint : DELETE /api/contacts/:contactId/address/:addressId

Headers :
- Authorization: token

Response Body :

```json
{
  "status": 201,
  "message": "Success Remove Address",
  "data": true
}
```

## List Addresses

Endpoint : GET /api/contacts/:contactId/address

Headers :
- Authorization: token

Response Body :

```json
{
  "status": 201,
  "message": "Success Get All Address",
  "data": [
    {
      "id": 1,
      "street": "Jalan, (optional)",
      "city": "Kota, (optional)",
      "province": "Provinsi, (optional)",
      "country": "Negara apa saja",
      "postal_code": "123123"
    },
    {
      "id": 2,
      "street": "Jalan, (optional)",
      "city": "Kota, (optional)",
      "province": "Provinsi, (optional)",
      "country": "Negara apa saja",
      "postal_code": "123123"
    }
  ]
}
```