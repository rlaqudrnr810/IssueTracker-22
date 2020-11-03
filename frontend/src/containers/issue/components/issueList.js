import React, { Component } from 'react';
import Label from './label'

const getRelativeTime = (current) =>{
    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;

    var elapsed = new Date(current) - new Date();

    if (elapsed < msPerMinute) {
         return Math.round(elapsed/1000) + ' seconds ago';   
    }

    else if (elapsed < msPerHour) {
         return Math.round(elapsed/msPerMinute) + ' minutes ago';   
    }

    else if (elapsed < msPerDay ) {
         return Math.round(elapsed/msPerHour ) + ' hours ago';   
    }

    else if (elapsed < msPerMonth) {
        return 'approximately ' + Math.round(elapsed/msPerDay) + ' days ago';   
    }

    else if (elapsed < msPerYear) {
        return 'approximately ' + Math.round(elapsed/msPerMonth) + ' months ago';   
    }

    else {
        return 'approximately ' + Math.round(elapsed/msPerYear ) + ' years ago';   
    }
}

class IssueInfo extends Component {
    render() {
        const labels = (labels) => {
            return labels.map((label, i)=>{
                return (<Label style={{backgroundColor:"lightblue"}}>{label.label.name}</Label>);
            });
        };
        const id = this.props.issue.id
        const opened = `#${id} opened ${getRelativeTime(this.props.issue.updatedAt)}`
        return (
            <div id={id}>
                <input type="checkbox" name="issue-checkbox"/>
                <div class="Issue-ContentBox">
                    <div class="Issue-upperbox">
                        <a>{this.props.issue.title}</a>
                        {labels(this.props.issue.issue_labels)}
                    </div>
                    <div class="Issue-lowerbox">
                        <span class="opened-by">
                            {opened}
                        </span>
                    </div>
                </div>
            </div>
        )
    }
}

class IssueList extends Component {
    constructor(props){
        super(props);
        // this.state = getIssues()
        this.state = {
            "success": true,
            "content": {
              "issues": [
                {
                  "id": 1,
                  "title": "bkyo",
                  "description": "prac",
                  "createdAt": "2020-11-02T15:30:00.000Z",
                  "updatedAt": "2020-11-02T15:30:00.000Z",
                  "user": {
                    "id": 1,
                    "nickname": "bk"
                  },
                  "issue_labels": [
                    {
                      "id": 1,
                      "label": {
                        "id": 1,
                        "name": "feature",
                        "color_code": null
                      }
                    },
                    {
                      "id": 3,
                      "label": {
                        "id": 1,
                        "name": "feature",
                        "color_code": null
                      }
                    }
                  ],
                  "issue_assignees": [
                    {
                      "id": 1,
                      "user": {
                        "nickname": "bk"
                      }
                    }
                  ],
                  "milestone": null
                },
                {
                  "id": 2,
                  "title": "bbbk",
                  "description": "bbbk",
                  "createdAt": "2020-11-03T11:11:11.000Z",
                  "updatedAt": "2020-11-03T11:11:11.000Z",
                  "user": {
                    "id": 1,
                    "nickname": "bk"
                  },
                  "issue_labels": [
                    {
                      "id": 2,
                      "label": {
                        "id": 1,
                        "name": "feature",
                        "color_code": null
                      }
                    }
                  ],
                  "issue_assignees": [],
                  "milestone": null
                }
              ]
            }
          }
    }
    render() {
        
        const Issues = (data) =>{
            return data.map((issue) => {
                return (<IssueInfo issue={issue}/>);
            });
        };
        return (
            <div>
                {Issues(this.state.content.issues)}
            </div>
        )
    }
}

export default IssueList