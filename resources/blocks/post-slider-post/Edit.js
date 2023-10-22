import { useBlockProps } from "@wordpress/block-editor";
import classNames from "classnames";
import { SinglePostSearch } from "../../js/block-editor";
import { __ } from "@wordpress/i18n";
import { Button } from "@wordpress/components";
import ServerSideRender from "@wordpress/server-side-render";
import metadata from "./block.json";

export default function Edit({ attributes, setAttributes, isSelected }) {
  const blockProps = useBlockProps({
    className: classNames("mt-post-slider-post", {
      "is-selected": isSelected,
      "not-selected": !isSelected,
      "no-post": !attributes.post,
    }),
  });

  return (
    <div {...blockProps}>
      <SinglePostSearch
        value={attributes.post}
        onChange={(post) => setAttributes({ post })}
        postType={"post"}
        placeholder={__("Søg efter indlæg", "ma")}
        required
        render={(popover, value, open) => (
          <>
            <div className={"select-post"}>
              <Button onClick={open}>
                {__("Klik for at vælge indlæg", "ma")}
                {popover}
              </Button>
            </div>
            {typeof value === "object" && value.hasOwnProperty("id") ? (
              <ServerSideRender
                block={metadata.name}
                attributes={attributes}
              />
            ) : (
              <p className={"select-post-error"}>
                {__("Vælg venligst et indlæg!", "ma")}
              </p>
            )}
          </>
        )}
        fallback={(popover, open) => (
          <div className={"select-post"}>
            <Button onClick={open}>
              {__("Klik for at vælge et indlæg", "ma")}
              {popover}
            </Button>
          </div>
        )}
      />
    </div>
  );
}
