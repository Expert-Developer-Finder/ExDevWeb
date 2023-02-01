import React from 'react';
import { useSelector } from 'react-redux';


export const OwnedRepos = () => {

  const repos = useSelector((state)=>state.repos).ownedRepos.data;



  return (
    <div>
        {
            repos? <>
                {repos.map((repo)=> {return <p> {repo.repoName} </p>})}
            </> :<>Loading</>
        }
         

    </div>
  )
}
