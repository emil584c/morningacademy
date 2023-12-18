import { registerBlockType } from "@wordpress/blocks";

// The Edit and Save functions
import edit from "./Edit";
import deprecated from "./deprecated";

// The stylesheets
import "./style.scss";
import "./editor.scss";

// The block info
import metadata from "./block.json";
// Block icon SVF
import Icon from "./icon";
// All known block variations
import variations from "./variations";

// Register the block
registerBlockType(metadata.name, {
  icon: {
    foreground: "#FF8B43",
    src: Icon,
  },
  variations,
  edit,
  save: () => null,
  deprecated,
});
