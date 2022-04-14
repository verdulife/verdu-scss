const prompts = require("prompts");
const { copy } = require("fs-extra");

(async () => {
  const start = [
    {
      type: "text",
      name: "path",
      message: "Where you want locate your theme entries?",
    },
  ];

  const onSubmit = (_, answer) => {
    copy(
      `${__dirname}/entries/vars.scss`,
      `${process.cwd()}/${answer}/vars.scss`,
      () => console.log("🎉 Successfully created theme entries!")
    );
  };

  await prompts(start, { onSubmit });
})();
