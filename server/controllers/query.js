import Query from "../models/query.js";
import User from "../models/user.js";


export const getRecommendations = async (req, res) => {
    const { source, path, userId, repoId } = req.body;

    try {

        console.log(req.body);
        
        // graph manager den user leri al
        var experts = await fetch(`${process.env.GRAPH_BASE_URL}/query/get-recommendations`, {
            method: "POST",
            body: JSON.stringify(
              {
                "source": source,
                "path" : path,
                "repoId" : repoId,
              }
            ),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
          }).then(async (res)=>  {
            res = await res.json();
            return res;
        });
        console.log("Experts are: ");
        console.log(experts);

        // o user lerin db deki karşılıklarını bul
        // var users = [];


        var users =  [];


        for(var i = 0; i < experts.length; i++) {
            const expertFromDb = await User.findOne({githubUsername: experts[i].name});

            if (expertFromDb) {
                users.push({
                    "linked": true,
                    "data": expertFromDb,
                    "commitScore": experts[i].commitScore,
                    "prScore":experts[i].prScore,
                });
            } else {
                // the user is not found on our database
                users.push({
                    "linked": false,
                    "data": exp.data,
                    "commitScore": experts[i].commitScore,
                    "prScore":experts[i].prScore,
                });
            }
            
        };

        // console.log("Being returned: ");
        // console.log(users);

        // query ve result ını kaydet
        await saveQuery(source, path, userId, repoId, users);


        // user leri dön
        return res.status(200).json(users);
    } catch (error) {
        return res.status(400).json([]);
        
    }
  
};

const saveQuery = async (source, path, queryOwnerId, repoId, returnedUsers)=> {

    var formattedUsers = [];
    for (var i  = 0 ; i < returnedUsers.length; i++) {;
        var user = returnedUsers[i];
        if (user.linked) {
            formattedUsers.push({"name": user.data.name, "email": user.data.email, "userId": user.data._id, "liked": false}  );
        } else {
            // TODO
        }
    }
    
  
    try {
        Query.create({
            queryOwnerId,
            repoId,
            source,
            path,
            returnedUsers: formattedUsers,
        });
      console.log("saved succesfully");
      return true;
    } catch (e) {
        console.log("catch");

        return e;
    }


}

export const getQueries = async (req, res) => {
    const { userId, repoId } = req.body;
    try {
        const queries = await Query.find({
            queryOwnerId: userId,
            repoId: repoId,
        });
        return res.status(200).json(queries);
    } catch(e) {
        return res.status(404).json("Something went wrong");
    }

}

export const likeExpert = async (req, res) => {
    const { queryId , expertId} = req.body;
    console.log(expertId);
    try {
        const query = await Query.findById(queryId);

        var returnedUsers = query.returnedUsers;
        for (var i = 0; i < returnedUsers.length; i++) {
            if ( returnedUsers[i].userId == expertId){
                console.log(JSON.stringify(returnedUsers[i]));
                returnedUsers[i].liked = true;
                break;
            }
        }

        var likedUser = await User.findById(expertId);
        likedUser.likeCount = likedUser.likeCount + 1;

        await User.findByIdAndUpdate(likedUser._id, likedUser, {new: true});

        await Query.findByIdAndUpdate(query._id, query, { new: true });
        return res.status(200).json("User liked");
    } catch(e) {
        return res.status(404).json("Something went wrong");
    }

}


export const rateQuery = async (req, res) => {
    const { queryId , rating, freeText} = req.body;

    try {
        const query = await Query.findById(queryId);

       query.feedbackNumber = rating;
       query.feedbackText = freeText;
       query.feedbackGiven = true;

        await Query.findByIdAndUpdate(query._id, query, { new: true });
        return res.status(200).json("Rated query");
    } catch(e) {
        return res.status(404).json("Something went wrong");
    }

}

