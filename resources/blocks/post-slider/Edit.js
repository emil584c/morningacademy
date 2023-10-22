import { useBlockProps, InnerBlocks } from "@wordpress/block-editor";
import classNames from "classnames";
import { useSelect, useDispatch, subscribe } from "@wordpress/data";
import { createBlock } from "@wordpress/blocks";
import { useEffect, useState } from "@wordpress/element";
import TypeSelector from "./TypeSelector";

export default function Edit({
  attributes,
  setAttributes,
  isSelected,
  clientId,
}) {
  const { getBlockCount } = useSelect("core/block-editor", []);
  const { insertBlock } = useDispatch("core/block-editor");
  const [blockCount, setBlockCount] = useState(0);

  const blockProps = useBlockProps({
    className: classNames("mt-post-slider", {
      "is-selected": isSelected,
      "not-selected": !isSelected,
    }),
  });

  useEffect(
    () =>
      subscribe(() => {
        setBlockCount(getBlockCount(clientId));
      }),
    []
  );

  const insert = (...createBlockArgs) => {
    setBlockCount(1);
    insertBlock(createBlock(...createBlockArgs), 0, clientId);
  };

  return (
    <>
      <section {...blockProps}>
        <div className="mt-post-slider__inner">
          <div className="page-container">
            {blockCount === 0 && <TypeSelector onChange={insert} />}
            <InnerBlocks
              allowedBlocks={[
                "ma/post-slider-posts",
                "ma/post-slider-posts-picker",
              ]}
              renderAppender={() => null}
            />
          </div>
        </div>
      </section>
    </>
  );
}
