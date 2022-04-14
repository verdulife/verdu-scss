import prompts from "prompts";
import { copyFile } from "fs";
import { join } from "path";

const start = [
  {
    type: "text",
    name: "path",
    message: "Where you want locate your theme entries?",
  },
];

const res = await prompts(start, {
  onSubmit: handleSubmit,
});

function handleSubmit(res) {
  copyFile(
    join(__dirname, "entries", "vars.scss"),
    join(process.cwd(), res.path, "vars.scss")
  );
}
