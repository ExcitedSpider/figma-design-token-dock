export const base = 'https://api.github.com';
import { Octokit } from '@octokit/core';
// import base64 = require('js-base64').Base64;
import { Base64 } from 'js-base64';

interface GithubData {
  accessToken: string;
  owner: string;
  repo: string;
}

interface IssueData {
  title?: string;
  body: string;
  labels?: string[];
}

interface OctokitResponse<T extends Record<string, unknown>> {
  headers: Record<string, string | number>;
  status: number;
  url: string;
  data: T;
}

interface IssueResBody extends Record<string, unknown> {
  url: string;
  title: string;
  body: string;
}

export const createIssue = async (option: {
  issueData: IssueData;
  githubData: GithubData;
}): Promise<OctokitResponse<IssueResBody>> => {
  const { issueData, githubData } = option;
  const octokit = new Octokit({ auth: githubData.accessToken });

  return octokit.request(`POST /repos/${githubData.owner}/${githubData.repo}/issues`, {
    owner: githubData.owner,
    repo: githubData.repo,
    title: issueData.title ?? `[bot] figma-design-token-${new Date().getTime()}`,
    body: issueData.body,
    labels: ['bot'],
  });
};

interface ContentResBody extends Record<string, unknown> {
  content: string;
  encoding: string;
  path: string;
  name: string;
  url: string;
  sha: string;
}

export const getPackage = async (option: {
  githubData: GithubData;
  packageJsonPath?: string;
  branch?: string;
}): Promise<OctokitResponse<ContentResBody>> => {
  const { githubData, packageJsonPath = 'package.json', branch = 'master' } = option;

  const octokit = new Octokit({ auth: githubData.accessToken });

  const res = await octokit.request(
    `GET /repos/${githubData.owner}/${githubData.repo}/contents/${packageJsonPath}`,
    {
      ref: branch,
    },
  );

  console.log('res.data.content', typeof res.data.content);

  res.data.content = {
    base64: () => Base64.decode(res.data.content),
  }[res.data.encoding]();

  return res;
};

export const updatePackage = async (option: {
  githubData: GithubData;
  packageJsonPath?: string;
  branch: string;
  content: string;
  message: string;
  sha: string;
}): Promise<OctokitResponse<ContentResBody>> => {
  const { githubData, packageJsonPath = 'package.json', content, ...exArgs } = option;
  const octokit = new Octokit({ auth: githubData.accessToken });

  const contentEncoded = Base64.encode(content);

  return octokit.request(
    `PUT /repos/${githubData.owner}/${githubData.repo}/contents/${packageJsonPath}`,
    {
      content: contentEncoded,
      ...exArgs,
    },
  );
};

export const createBranch = async (option: {
  githubData: GithubData;
  branchName: string;
  sha: string;
}): Promise<OctokitResponse<{ url: string }>> => {
  const { githubData, branchName, sha } = option;
  const octokit = new Octokit({ auth: githubData.accessToken });

  return await octokit.request(`POST /repos/${githubData.owner}/${githubData.repo}/git/refs`, {
    ref: `refs/heads/${branchName}`,
    sha,
  });
};

export const getMaster = async (option: {
  githubData: GithubData;
}): Promise<
  OctokitResponse<{
    object: { sha: string };
  }>
> => {
  const { githubData } = option;
  const octokit = new Octokit({ auth: githubData.accessToken });

  return await octokit.request(
    `GET /repos/${githubData.owner}/${githubData.repo}/git/refs/heads/master`,
  );
};

export const createPr = async (option: {
  githubData: GithubData;
  branchName: string;
  base: string;
  body: string;
  title?: string;
}): Promise<
  OctokitResponse<{ sha: string, number:string }>
> => {
  const { githubData, branchName, ...exArgs } = option;
  const octokit = new Octokit({ auth: githubData.accessToken });

  return await octokit.request(`POST /repos/${githubData.owner}/${githubData.repo}/pulls`, {
    ...exArgs,
    head: branchName,
  });
};

export const addLabels = async (option: {
  githubData: GithubData;
  number: string;
  labels: string[];
}): Promise<
  OctokitResponse<{ sha: string, number:string }>
> => {
  const { githubData, number, labels } = option;
  const octokit = new Octokit({ auth: githubData.accessToken });

  return await octokit.request(`POST /repos/${githubData.owner}/${githubData.repo}/issues/${number}/labels`, {
    labels,
  });
};
