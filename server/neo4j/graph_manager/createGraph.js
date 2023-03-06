import * as child from 'child_process';
// import {PythonShell} from 'python-shell';

const fetchIssuesAndPRs = async (repoOwner, repoName, tokens) => {

    return new Promise((resolveFunc) => {
        console.log("issue başladı");
        const pyFile = "perceval_issues_and_prs.py";
        const args = [repoOwner, repoName, tokens];
        args.unshift(pyFile);


        const pyspawn = child.spawn("/usr/local/bin/python3", args);

        pyspawn.stdout.on("data", (data) => {
            console.log(`stdout: ${data}`);
        });

        pyspawn.stderr.on("data", (data) => {
            console.log(`stderr: ${data}`);
        });

        pyspawn.on("close", (code) => {
            console.log(`child process exited with code ${code}`);
        });
        pyspawn.on("exit", (code) => {
            console.log("issue bitti");
            resolveFunc(code);
        });
    });

};

const fetchCommits = async (repoOwner, repoName) => {
    return new Promise((resolveFunc) => {
        console.log("commit başladı");

    
        const pyFile = "perceval_commits.py";
        const args = [repoOwner, repoName];
        args.unshift(pyFile);
    
        const pyspawn = child.spawn("/usr/local/bin/python3", args);
    
        pyspawn.stdout.on("data", (data) => {
        console.log(`stdout: ${data}`);
        });
    
        pyspawn.stderr.on("data", (data) => {
        console.log(`stderr: ${data}`);
        });
    
        pyspawn.on("close", (code) => {
        console.log(`child process exited with code ${code}`);
        });

        pyspawn.on("exit", (code) => {
            console.log("commit bitti");
            resolveFunc(code);
        });
    });
  };


const createGraph = async (repoOwner, repoName, tokens) => {
    const commitsReturned =  fetchCommits(repoOwner, repoName);
    const issuesAndPRsReturned =  fetchIssuesAndPRs(repoOwner, repoName, tokens);

    await commitsReturned;
    await issuesAndPRsReturned;

    console.log('====================================');
    console.log("Data has been fetched");
    console.log('====================================');

};

export default createGraph;

createGraph("egeergul", "github-actions-tut", [
    "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",
    "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",
    "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",
    "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"
]);
