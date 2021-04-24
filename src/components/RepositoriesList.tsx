import React, { Component } from "react";

import { Octokit } from "@octokit/rest";
import { Repo } from "../interfaces/repo";

import "./RepositoriesList.css";

const octokit = new Octokit({ auth: process.env.OCTOKIT_TOKEN });

interface stateType {
    previousUsername: string;
    foundUser: boolean;
    repos: Repo[];
}

class RepositoriesList extends Component<{ username: string }, stateType> {
    constructor(props: any) {
        super(props);
        this.state = { previousUsername: "", repos: [], foundUser: false };

        this.setRepos = this.setRepos.bind(this);
    }
    setRepos(repos: Repo[]) {
        this.setState({
            repos: repos.filter((repo) => repo.name !== repo.owner.login),
            foundUser: true,
        });
    }

    async componentDidUpdate() {
        // If this is not the last user we searched for, get all their repos
        if (this.state.previousUsername !== this.props.username) {
            this.setState({ previousUsername: this.props.username, repos: [] });
            if (this.props.username !== "") {
                await octokit.repos
                    .listForUser({ username: this.props.username })
                    .then((response: any) => {
                        this.setRepos(response.data);
                    })
                    .catch((e) => {
                        this.setState({ repos: [], foundUser: false });
                    });
            }
        }
    }

    render() {
        return (
            <div>
                {this.props.username !== "" && this.state.foundUser
                    ? `These are ${this.props.username}'s licensed repositories:`
                    : ""}
                <ul>
                    {this.state.repos
                        .filter((repo) => repo.license)
                        .map((repo) => (
                            <li key={repo.id}>
                                <a
                                    rel='noreferrer'
                                    target='_blank'
                                    href={repo.html_url}
                                >
                                    {repo.name}{" "}
                                </a>{" "}
                                - {repo.license.name}
                            </li>
                        ))}
                </ul>
                {this.props.username !== "" &&
                this.state.foundUser &&
                this.state.repos.some((repo) => !repo.license)
                    ? "They have some unlicensed ones too:"
                    : ""}
                <ul>
                    {this.state.repos
                        .filter((repo) => !repo.license)
                        .map((repo) => (
                            <li key={repo.id}>
                                <a
                                    target='_blank'
                                    rel='noreferrer'
                                    href={repo.html_url}
                                >
                                    {repo.name}
                                </a>
                            </li>
                        ))}
                </ul>
            </div>
        );
    }
}

export default RepositoriesList;
