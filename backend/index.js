const express = require('express')
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express()
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ylddxxz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const uri = "mongodb+srv://twitter_admin:QAMGveldWTBbyCHK@cluster0.ylddxxz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
 
//Code copied from monogodb backend connect page to connect to backend
const client = new MongoClient(uri, { 
  serverApi: {
    version: ServerApiVersion.v1,
    deprecationErrors: true,
  }
});

async function run() {
    // console.log("connected")

  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const postCollection = client.db('database').collection('posts') //this is post collection for team-ekt
    const userCollection = client.db('database').collection('users') //this is user collection for team-srv
    
    //get (to get the posts)
    app.get('/post',async(req,res)=>{ //req=>request , res=>response
        const post=(await postCollection.find().toArray()).reverse(); //reverse will display latest to oldest post
        res.send(post);//send the post
    })

    //get the user data (user is an object of user data, declared in signup page)
    app.get('/user',async(req,res)=>{ //req=>request , res=>response
      const user=await userCollection.find().toArray();
      res.send(user);//send the user data
    })

    //getting loggedInUser detail
    app.get('/loggedInUser',async(req,res)=>{
      const email=req.query.email; //we are using query to find email to know which user is loggedIn, here we are passing email using query from our frontend
      const user=await userCollection.find({email:email}).toArray(); //we will find user in collection using email(for one user, array is not needed)
      res.send(user);
    })

    app.get('/userPost',async(req,res)=>{ //using this route we will fetch only the users's posts and will display it on user's profile page
      const email=req.query.email; //we are using query to find email to know which user is loggedIn, here we are passing email using query from our frontend
      const post=(await postCollection.find({email:email}).toArray()).reverse(); //we will find user in collection using email and gets posts of the user only
      res.send(post);
    })

    //post
    app.post('/post',async(req,res)=>{ //using post method to post
        const post=req.body; //getting post from body
        const result=await postCollection.insertOne(post); //insert the post
        // res.send(result); //send producing error so used .json in the next line
        res.json(result); //sending result as a response to frontend
    })

    //another route link->register
    app.post('/register',async(req,res)=>{ //using post method to post user data
      const user=req.body; //getting user from body
      const result=await userCollection.insertOne(user); //insert the user data
      res.send(result); //sending result as a response to frontend
  })

  //patch method is used for updating any document 
  app.patch('/userUpdates/:email',async(req,res)=>{ //giving route
    const filter=req.params; //get a filter which will filter the document by email, in params we will get the email from frontend
    const profile=req.body; //profile document
    const options={upsert:true}; //we will have options : if document doesnt exist then we will insert it else if it exits we will update it , 'upsert' here is short form of update and insert
    const updateDoc={$set:profile}; 
    const result=await userCollection.updateOne(filter, updateDoc, options); 
    res.send(result);
  })

  } catch(error){
    console.log(error);
  }

} run().catch(console.dir);

//code copied from express.js site
app.get('/', (req, res) => {
  res.send('Hello from Twitter Clone!')
})

app.listen(port, () => {
  console.log(`hi Twitter app listening on port ${port}`)
})