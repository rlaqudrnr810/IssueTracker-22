const asyncHandler = require('../../lib/asyncHandler');
const {
  Issue,
  User,
  IssueLabel,
  Label,
  IssueAssignee,
  Milestone,
  Comment,
} = require('../../models');

exports.list = asyncHandler(async (req, res, next) => {
  const {
    user,
    label,
    milestone,
    isopen,
    assignee,
    mention,
  } = req.query;
  const filterUser = (user === undefined) ? {} : { nickname: user };
  const filterLabel = (label === undefined) ? {} : { name: label };
  const filterMilestone = (milestone === undefined) ? {} : { title: milestone };
  const filterIsopen = (isopen === undefined) ? {} : { is_open: isopen };
  const filterAssignee = (assignee === undefined) ? {} : { nickname: assignee };
  const filterMention = (mention === undefined) ? {} : { author_id: mention };
  const issues = await Issue.findAll({
    attributes: ['id', 'title', 'description', 'createdAt', 'updatedAt'],
    where: filterIsopen,
    include: [
      {
        model: User,
        attributes: ['id', 'nickname'],
        where: filterUser,
      },
      {
        model: IssueLabel,
        attributes: ['id'],
        include: [
          {
            model: Label,
            where: filterLabel,
            attributes: ['id', 'name', 'color_code'],
          },
        ],
      },
      {
        model: IssueAssignee,
        attributes: ['id'],
        include: [
          {
            model: User,
            attributes: ['profile_url'],
            where: filterAssignee,
          },
        ],
      },
      {
        model: Milestone,
        attributes: ['id', 'title'],
        where: filterMilestone,
        required: false,
      },
      {
        model: Comment,
        attritbutes: ['id', 'issue_id'],
        include: [
          {
            model: User,
            where: filterMention,
            attributes: ['id'],
          },
        ],
      },
    ],
  });
  res.json({ success: true, content: { issues } });
});

exports.detail = asyncHandler(async (req, res, next) => {
  const { issueNumber } = req.params;
  const hasIssueNumber = { id: issueNumber };
  const issues = await Issue.findAll({
    attributes: ['id', 'title', 'description', 'createdAt', 'updatedAt'],
    where: hasIssueNumber,
    include: [{
      model: User,
      attributes: ['id', 'nickname', 'profile_url'],
    }, {
      model: Comment,
      attributes: ['id', 'description', 'author_id'],
      include: [{
        model: User,
        attributes: ['id', 'nickname', 'profile_url'],
      }],
    }, {
      model: Milestone,
      attributes: ['id', 'title'],
    }, {
      model: IssueLabel,
      attributes: ['id'],
      include: [{
        model: Label,
        attributes: ['id', 'name', 'color_code'],
      }],
    }, {
      model: IssueAssignee,
      attributes: ['id'],
      include: [{
        model: User,
        attributes: ['id', 'nickname', 'profile_url'],
      }],
    },
    ],
  });
  res.json({ success: true, content: { issues } });
});

exports.create = asyncHandler(async (req, res, next) => {
  const {
    title, description, assignees, labels, milestone_id,
  } = req.body;
  const { user } = res.locals;

  const newIssues = await Issue.create({
    title, description, author_id: user.id, milestone_id,
  });

  if (assignees.length > 0) {
    const assigneeData = assignees.map((id) => ({ issue_id: newIssues.id, assignee_id: id }));
    await IssueAssignee.bulkCreate(assigneeData);
  }
  if (labels.length > 0) {
    const labelData = labels.map((id) => ({ issue_id: newIssues.id, label_id: id }));
    await IssueLabel.bulkCreate(labelData);
  }

  return res.json({
    success: true,
    content: { id: newIssues.id },
  });
});
