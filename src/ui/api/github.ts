export const base = 'https://api.github.com';
import { Octokit } from '@octokit/core';

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
  });
};
