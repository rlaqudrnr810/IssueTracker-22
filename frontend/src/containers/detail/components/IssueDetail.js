import React from 'react';
import styled from 'styled-components';
import RelativeTime from '../../../lib/relativeTime';

const IssueDetailContainer = styled.div`
  width: 100%;
  display: flex;
  margin: 10px;
  font-size: 14px;
  color: #24292;
  line-height: 1.5;
  font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji;
`;

const IssueDetailStyle = styled.div`
  width: 100%;
  margin-bottom: 10px;
  margin-left : 10px;
  border: 1px solid;
  border-radius: 6px;
  min-width : 100px;
`;

const UserProfile = styled.div`
`;

const CommentTitle = styled.div`
  display: flex;
  color: #586069;
  background-color: #f1f8ff;
  min-height: 50px;
  padding-right: 16px;
  padding-left: 16px;
  border-bottom: 1px solid;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  font-size: 14px;
`;

const CommentDescription = styled.div`
  display: flex;
  min-height: 200px;
  padding: 10px;
`;

const Author = styled.div`
  margin: auto 0;
  display: inline-block;
  vertical-align: top;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100%;
  color: #24292e;
  background-color: initial;
  font-weight: 600;
`;
const Info = styled.div`
  margin: auto 0;
  margin-left: 10px;
`;
const Description = styled.div`
  margin: auto 0;
`;

const EditButton = styled.div`
  float: left;
  margin: auto 0;
  padding: 3px 12px;
  font-size: 16px;
  line-height: 20px;
  color: #fff;
  background-color: #2ea44f;
  border: 1px solid;
  border-radius: 6px;
  cursor: pointer;
  margin-left: auto;
  height: 20px;
`;

const IssueDetail = (data) => {
  const { children } = data;
  const time = RelativeTime(children.updatedAt);
  return (
    <>
      <IssueDetailContainer>
        <UserProfile><img src={children.user.profile_url} width="40" height="40" alt="new" /></UserProfile>
        <IssueDetailStyle>
          <CommentTitle>
            <Author>{ children.user.nickname}</Author>
            <Info>commented { time }</Info>
            <EditButton>Edit</EditButton>
          </CommentTitle>
          <CommentDescription>
            <Description>{ children.description }</Description>
          </CommentDescription>
        </IssueDetailStyle>
      </IssueDetailContainer>
      <div>여기는 코멘트 입력하는 공간</div>
    </>
  );
};

export default IssueDetail;