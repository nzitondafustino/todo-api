#guidance of todo api
##accepted url

###todo urls
```javascript
//http://localhost:3000/todo (getting all todos list)
//http://localhost:3000/todo (gcreating a new todo METHOD 'POST')
// accepted JSON data
{
    "name":String,
    "description":String,
    "dueDate":Date, //ex 2020-02-20
    "status":Boolean //for true or false
}
//http://localhost:3000/todo/id (getting single todo)
//http://localhost:3000/todo/id (deleting  single todo)
//http://localhost:3000/todo/id (updating single todo)

```
###user urls
```javascript
//http://localhost:3000/users/signup (registering a new user)
//data format
{
    "email":String,
    "password":String
}
//http://localhost:3000/users/login (login the user)
//data format
{
    "email":String,
    "password":String
}
```
***NB post,delete and update routes are protected so you need to login first to get token so that you can use then and token need to be sent in Authorization header***