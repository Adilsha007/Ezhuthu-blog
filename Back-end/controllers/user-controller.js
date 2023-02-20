const User = require('../models/user-model');

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.getPosts =async (req, res) => {

  const user = await User.findById(req.userId)

  const posts = user.posts

  res.status(200).send(posts);
};

exports.updatePost = async (req, res)=>{
  console.log(req.body);

  await User.updateOne({_id:req.userId, "posts._id": req.body._id },{
    $set: { 
      "posts.$.title": req.body.title,
      "posts.$.subtitle": req.body.subtitle,
      "posts.$.description": req.body.description
   }
  })
  
  const user = await User.findById(req.userId)

  const updatedPost = user.posts.map((el)=>{
    if(el._id === req.body._id){
      return el
    }
  })

    res.status(200).send({
      id: updatedPost._id,
      title: updatedPost.title,
      subtitle: updatedPost.subtitle,
      description: updatedPost.description
      
  })

}


exports.deletePost = async (req,res)=>{

  await User.findByIdAndUpdate(req.userId,{
    $pull: { posts: { _id: req.params.id}}
  })

  res.status(200).send(null)
}


exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};




exports.addPost =async (req,res)=>{
 
  const post = {
    title : req.body.title,
    subtitle: req.body.subtitle,
    description: req.body.description
  }

  await User.findByIdAndUpdate(req.userId,{
    $push: {posts: post}
  })

  const user =await User.findById(req.userId)

  const latestpost = user.posts.reverse()[0]

    res.status(200).send({
        id: latestpost._id,
        title: latestpost.title,
        subtitle: latestpost.subtitle,
        description: latestpost.description
      })

}
  


exports.updateProfile =async (req, res)=> {
  console.log(req.body);
   await User.findByIdAndUpdate(req.body.id,{
    fullname: req.body.fullname,
    username: req.body.username,
    phoneno: req.body.phoneno,
    email: req.body.email,
    gender: req.body.gender 
  })

  // const image = req.body.fileSource;

  

  const user = await User.findById(req.userId)
  

  image.mv(
    `../public/prof-img/${user._id}.jpg`,
    (err, done) => {
      if (err) {
        console.log(err);
      } 
      console.log(done);
    }
  );


  res.status(200).send({
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        token: req.query.auth,
        fullname: user.fullname,
        gender: user.gender,
        phoneno: user.phoneno
      });
}
