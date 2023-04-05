

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
        experts.forEach(exp => {
            users.push({
                "linked": false,
                "data": exp
            })
        });


        // query ve result ını kaydet

        // user leri dön
        return res.status(200).json(users);
    } catch (error) {
        return res.status(400).json([]);
        
    }
  
};
