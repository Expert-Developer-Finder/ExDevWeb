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
            const expertFromDb = await User.findOne({githubUsername: experts[i]});

            if (expertFromDb) {
                users.push({
                    "linked": true,
                    "data": expertFromDb
                });
            } else {
                // the user is not found on our database
                users.push({
                    "linked": false,
                    "data": exp.data
                });
            }
            
        };


        console.log("Being returned: ");
        console.log(users);

        // query ve result ını kaydet

        // user leri dön
        return res.status(200).json(users);
    } catch (error) {
        return res.status(400).json([]);
        
    }
  
};
