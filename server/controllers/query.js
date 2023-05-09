import Query from "../models/query.js";
import User from "../models/user.js";


export const getRecommendations = async (req, res) => {
    const { source, path, userId, repoId } = req.body;

    var methodSignature = null
    if (source == "method") methodSignature = req.body.methodSignature

    try {

        console.log(req.body);
        
        // get experts from ExDevGraph
        var experts = await fetch(`${process.env.GRAPH_BASE_URL}/query/get-recommendations`, {
            method: "POST",
            body: JSON.stringify(
              {
                "source": source,
                "path" : path,
                "repoId" : repoId,
                "methodSignature": methodSignature
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

        // Find the experts from the database or not
        var users =  [];
        for(var i = 0; i < experts.length; i++) {
            const expertFromDb = await User.findOne({githubUsername: experts[i].authorName});

            if (expertFromDb) {
            // if (1==2) {
                if (source == "method") {
                    users.push({
                        "linked": true,
                        "data": expertFromDb,
                        "creatorCount": experts[i].creatorCount ,
                        "methodModifyScore": experts[i].methodKnowAboutScore ,
                        "totalScore":experts[i].totalScore,
                    });

                } else {
                    users.push({
                        "linked": true,
                        "data": expertFromDb,
                        "commitCount": experts[i].commitCount ,
                        "commitScore": 0.5* experts[i].commitCount + 0.5* experts[i].recentCommitScore ,
                        "prScore":experts[i].prKnowAboutScore,
                        "totalScore":0.5* experts[i].commitCount + 0.5* experts[i].recentCommitScore  + experts[i].prKnowAboutScore,

                    });
                }
            } else {
                console.log("User not in DB");

                // the user is not found on our database
                if (source == "method") {
                    users.push({
                        "linked": false,
                        "data": {authorName: experts[i].authorName, email: ""},
                        "creatorCount": experts[i].creatorCount ,
                        "methodModifyScore": experts[i].methodKnowAboutScore ,
                        "totalScore":experts[i].totalScore,
                    });

                } else {
                    users.push({
                        "linked": false,
                        "data": {authorName: experts[i].authorName, email: ""},
                        "commitCount": experts[i].commitCount ,
                        "commitScore":0.5* experts[i].commitCount + 0.5* experts[i].recentCommitScore ,
                        "prScore":experts[i].prKnowAboutScore,
                        "totalScore":0.5* experts[i].commitCount + 0.5* experts[i].recentCommitScore  + experts[i].prKnowAboutScore,
                    });

                }
                
            }
            
        };

        console.log(users);

        // Save the results of the query
        await saveQuery(source, path, userId, repoId, users);


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
      console.log("query saved successfully");
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

export const getWithRepoId = async (req, res) => {
    const { repoId } = req.body;
    try {
        const queries =  await Query.find({repoId: repoId});
        return res.status(200).json(queries);
    } catch(e) {
        return res.status(404).json("Something went wrong");
    }
}

export const getStats = async (req, res) => {
    const { repoId } = req.body;
    try {
        const queries =  await Query.find({repoId: repoId});

        // calculate average rating
        var ratingCount = 0;
        var sumSoFar = 0;

        // collect the text feedbacks
        var texts = []

        // collect numericRatings
        var ratings = []

        for (var i in queries) {
            var query = queries[i];
            if (query.feedbackGiven) {
                sumSoFar += query.feedbackNumber;
                ratingCount++;
                ratings.push(query.feedbackNumber)

                if( query.feedbackText != "" && query.feedbackText != null ) {
                    texts.push({
                        text: query.feedbackText, 
                        rate: query.feedbackNumber, 
                        userId: query.queryOwnerId, 
                        createdAt: query.createdAt
                    })
                }
            }
        }

        var averageRating = sumSoFar / ratingCount;

        texts.sort(function(a, b) {
            return b.rate - a.rate;
        });
        if (texts.length > 5) {
            texts = texts.slice(0,5)
        }

        for (var i in texts) {
            var query = texts[i];
            var userOfQuery = await User.findById(query.userId);
            var name = userOfQuery.name;
            var avatarUrl = userOfQuery.avatarUrl;
            query.name = name;
            query.avatarUrl = avatarUrl;
            texts[i] = query            
        }

        var fileNo = 0;
        var methodNo = 0;
        var folderNo = 0;
        for (var i in queries) {
            var query = queries[i];
            if (query.source == "file") {
                fileNo += 1
            } else if (query.source == "folder") {
                folderNo += 1
            } else {
                methodNo += 1
            }            
        }

        var maxItem = Math.max(fileNo, folderNo)
        maxItem = Math.max(maxItem, methodNo)

        var mostQueriesOn = "file";
        if ( maxItem == methodNo) {
            mostQueriesOn = "method"
        }
        if ( maxItem == folderNo){
            mostQueriesOn = "folder"
        }

        var result = {
            noOfQueries: queries.length,
            averageRating: averageRating,
            texts: texts,
            mostQueriesOn: mostQueriesOn,
            fileNo: fileNo,
            methodNo: methodNo,
            folderNo: folderNo, 
            ratings : ratings
        }

        return res.status(200).json(result);
    } catch(e) {
        return res.status(404).json("Something went wrong");
    }

}




