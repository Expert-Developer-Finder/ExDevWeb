let ownerName = "ceydas";
let repoName = "exdev_test";

let githubRepoCreatedAt=  fetch(`https://api.github.com/repos/${ownerName}/${repoName}`)
.then(response => response.json())
.then(data => {
  const firstCommitDate = data.created_at
  console.log(firstCommitDate);
  console.log(Date.parse(firstCommitDate));
  return Date.parse(firstCommitDate);
})
.catch(error => console.error(error));