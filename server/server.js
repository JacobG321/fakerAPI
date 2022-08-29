// go into package.json and change node to nodemon server
const express = require("express");
const { faker } =  require('@faker-js/faker');

const { allowedNodeEnvironmentFlags } = require("process");
const app = express();
const port = 8000;
// make sure these lines are above any app.get or app.post code blocks
app.use( express.json() );
app.use( express.urlencoded({ extended: true }) );

app.listen(port, ()=>console.log(`Server on port ${port}`))

let users = []
let companies = []
let companiesUsers = []

// create
app.post('/api/v1/users', (req,res) =>{
    const user = {
        email:faker.internet.email(),
        password:faker.internet.password(),
        phoneNumber:faker.phone.number(),
        firstName:faker.name.firstName(),
        lastName:faker.name.lastName(),
        id: faker.datatype.uuid()
    }
    // adds to list
    users.push(user)
    // response that shows up when users are created
    res.json({user:user})
})

app.post('/api/v1/companies', (req,res) =>{
    const company = {
        name:faker.company.name(),
        address:{
            street: faker.address.streetAddress(),
            city: faker.address.city(),
            state: faker.address.state(),
            zipCode: faker.address.zipCode(),
            country: faker.address.country()
        },
        id: faker.datatype.uuid()
    }
    companies.push(company)
    // response that shows up when companies are created, shows the single new company
    res.json({company:company})
})


// create company and city
app.post('/api/v1/companiesUsers', (req, res) =>{
    const companyUser = {newUse:newUser(),newComp:newCompany()}
    companiesUsers.push(companyUser)
    res.json({companiesUsers:companiesUsers})
})

const newUser = () => {
    
    const user = {
        email:faker.internet.email(),
        password:faker.internet.password(),
        phoneNumber:faker.phone.number(),
        firstName:faker.name.firstName(),
        lastName:faker.name.lastName(),
        id: faker.datatype.uuid()
    }
    return user
}

const newCompany = () => {
    
    const company = {
        name:faker.company.name(),
        address:{
            street: faker.address.streetAddress(),
            city: faker.address.city(),
            state: faker.address.state(),
            zipCode: faker.address.zipCode(),
            country: faker.address.country()
        },
        id: faker.datatype.uuid()
    }
    return company
}





// read all
app.get("/api/v1/users", (req, res) => {
    // shows full users list
    console.log(users)
    res.json({ users:users });
});

app.get("/api/v1/companies", (req, res) => {
    // shows full users list
    console.log(companies)
    res.json({ companies:companies });
});

// read one
app.get('/api/v1/users/:id', (req, res) => {
    // express uses params to return all params in the url
    console.log(req.params.id)
    const thisUser = users.filter((item,idx)=>(item.id == req.params.id))
    console.log(thisUser)
    res.json({ user:thisUser })
})

// put updates entire source, patch changes partial
// update
app.put('/api/v1/users/:id', (req, res) => {
    // map creates a shallow copy of array
    // req.params.id gives a string, parseInt converts to num
    // using map, we are creating a new list that does not have one specific user, and we will add the new user to the end
    // req params on id keeps the id the same
    const newList = users.map((item,idx) => (item.id === parseInt(req.params.id)?{id:parseINT(req.params.id),
        email:req.body.email,
        password:req.body.password,
        phoneNumber:req.body.phoneNumber,
        firstName:req.body.firstName,
        lastName:req.body.lastName}:item))
        users = newList
        res.json({users:users})
})


// delete
app.delete('/api/v1/users/:id' , (req,res) => {
    const userID = req.params.id
    const newList = users.splice(userID, 1)
    res.json({newList})
})


// same function as before, just parsing int instead
// app.put('/api/v1/users/:id', (req, res) => {
//     // map creates a shallow copy of array
//     // req.params.id gives a string, parseInt converts to num
//     // using map, we are creating a new list that does not have one specific user, and we will add the new user to the end
//     // req params on id keeps the id the same
//     const newList = users.map((item,idx) => (item.id === parseInt(req.params.id)?{id:parseINT(req.params.id),
//         email:req.body.email,
//         password:req.body.password,
//         phoneNumber:req.body.phoneNumber,
//         firstName:req.body.firstName,
//         lastName:req.body.lastName}:item))
//         users = newList
//         res.json({users:users})
// })