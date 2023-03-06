import json
import sys
from perceval.backends.core.git import Git

repoOwner = sys.argv[1]
repoName = sys.argv[2]

print(repoOwner)
print(repoName)
repoURL = "https://github.com/" + repoOwner + "/" + repoName

f = open(  repoOwner + "_" + repoName + "_commits.json" , "w")

# create a Git object, pointing to repo_url, using repo_dir for cloning
repo = Git(uri=repoURL, gitpath="/tmp/" + repoOwner + "/"  + repoName +".git")

# fetch all commits as an iterator, and iterate it printing each hash
for commit in repo.fetch():
    f.write(json.dumps(commit, separators=(",", ":")) + "\n")


print("Commits are fetched")
sys.stdout.flush()


