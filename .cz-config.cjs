module.exports = {
  types: [
    { value: "feat", name: "feat:     A new feature" },
    { value: "fix", name: "fix:      A bug fix" },
    { value: "docs", name: "docs:     Documentation only changes" },
    { value: "style", name: "style:    Changes that do not affect the meaning of the code" },
    {
      value: "refactor",
      name: "refactor: A code change that neither fixes a bug nor adds a feature",
    },
    { value: "perf", name: "perf:     A code change that improves performance" },
    { value: "test", name: "test:     Adding missing tests" },
    { value: "chore", name: "chore:    Changes to the build process or auxiliary tools" },
    { value: "revert", name: "revert:   Revert to a commit" },
  ],

  // Skip scope prompt
  scopes: [],
  allowCustomScopes: false,
  allowBreakingChanges: [],

  // Skip subject length
  subjectLimit: 100,

  // Disable all optional prompts
  skipQuestions: ["scope", "body", "breaking", "footer"],

  messages: {
    type: "Select the type of change that you're committing:",
    subject: "Write a short, imperative tense description of the change:\n",
  },
};
