import React, { Component } from 'react';
import IssueBox from './IssueBox';
import renderIssueLowerBox from './IssueLowerBox';
import renderIssueUpperBox from './IssueUpperBox';
import IssueAssignee from './IssueAssignee';
// import IssueMilestone from './issueMilestone';
import { svgOpen } from '../../../assets/svgPath';

class IssueInfo extends Component {
  render() {
    const { id } = this.props.issue;
    return (
      <IssueBox id={id}>
        <div style={{ padding: '8px 0px 8px 16px' }}>
          <input type="checkbox" name="issue-checkbox"/>
        </div>
        <div style={{ padding: '8px 0px 0px 16px' }}>
          <svg style={{ fill: '#22863A' }} viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true">
            {svgOpen}
          </svg>
        </div>
        <div className="Issue-ContentBox" style={{ padding: '8px' }}>
          {renderIssueUpperBox(this.props)}
          {renderIssueLowerBox(this.props.issue)}
        </div>
        <IssueAssignee>
          <img
            src={this.props.issue.user.profile_url}
            style={{ width: '20px', height: '20px', borderRadius: '70%' }}
          />
        </IssueAssignee>
      </IssueBox>
    );
  }
}

const IssueList = ({issues}) => {
  const Issues = (data) => data.map((issue) => (<IssueInfo issue={issue}/>));
  return (
      <div>
        {Issues(issues)}
      </div>
  );
  
}

export default IssueList;
