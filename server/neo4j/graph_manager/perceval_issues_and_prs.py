import json
import sys
from perceval.backends.core.github import GitHub

repoOwner = sys.argv[1]
repoName = sys.argv[2]
tokens = sys.argv[3].split(",")

print(repoOwner)
print(repoName)

f_issue = open( repoOwner + "_" + repoName + "_issues.json" , "w")

f_pr = open(  repoOwner + "_" + repoName + "_prs.json" , "w")

print("TOKENS: ", tokens)



# create a GitHub object, pointing to repo_url, using repo_dir for cloning
repo = GitHub(
    owner=repoOwner, 
    repository=repoName, 
    api_token=tokens, 
    sleep_for_rate=True,        
    sleep_time=300
)



# fetch all issues/pull requests as an iterator, and iterate it printing
# their number, and whether they are issues or pull requests
for item in repo.fetch():
    if 'pull_request' in item['data']:
        kind = 'Pull request'
    else:
        kind = 'Issue'
    
    if(kind == "Issue"):
        f_issue.write( json.dumps(item, separators=(",", ":")) + "\n")
    else:
        f_pr.write(json.dumps(item, separators=(",", ":"))  + "\n")
        

print("Issues and Prs are fetched")
sys.stdout.flush()


