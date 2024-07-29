# User API Spec

## Register User

Endpoint : POST /api/users

Request Body :

```json
{
  "username": "hakim",
  "password": "secret",
  "name": "Luthfi Hakim"
}
```

Response Body (Success) :

```json
{
  "status": 201,
  "message": "Success Register User",
  "data": {
    "username": "hakim",
    "name": "Luthfi Hakim"
  }
}
```

Response Body (Failed) :

```json
{
  "status": 400,
  "message": "Failed Register User",
  "data": {
    "errors": "Username is Required"
  }
}
```

## Login User

Endpoint : POST /api/users/login

Request Body :

```json
{
  "username": "hakim",
  "password": "secret"
}
```

Response Body (Success) :

```json
{
  "status": 201,
  "message": "Success Login User",
  "data": {
    "username": "hakim",
    "name": "Luthfi Hakim",
    "token": "session_id_generated"
  }
}
```

Response Body (Failed) :

```json
{
  "status": 400,
  "message": "Failed Login User",
  "data": {
    "errors": "Username or Password is Wrong"
  }
}
```

## Get User

Endpoint : GET /api/users/current

Headers : 
- Authorization: token

Response Body (Success) :

```json
{
  "status": 201,
  "message": "Success Get Users",
  "data": {
    "username": "hakim",
    "name": "Luthfi Hakim"
  }
}
```

Response Body (Failed) :

```json
{
  "status": 300,
  "message": "Failed Get Users",
  "data": {
    "errors": "Unauthorized"
  }
}
```

## Update User

Endpoint : PATCH /api/users/current

Headers :
- Authorization: token

Request Body :

```json
{
  "username": "hakim",
  "password": "secret"
}
```

Response Body (Success) :

```json
{
  "status": 201,
  "message": "Success Update User",
  "data": {
    "username": "hakim",
    "name": "Luthfi Hakim"
  }
}
```

Response Body (Failed) :

```json
{
  "status": 300,
  "message": "Failed Update User",
  "data": {
    "errors": "Unauthorized"
  }
}
```

## Logout User

Endpoint : DELETE /api/users/current

Headers :
- Authorization: token

Response Body (Success) :

```json
{
  "status": 201,
  "message": "Success Delete User",
  "data": true
}
```

Response Body (Failed) :

```json
{
  "status": 300,
  "message": "Failed Delete User",
  "data": {
    "errors": "Unauthorized"
  }
}
```
