import { useBlockProps, InnerBlocks, InspectorControls } from "@wordpress/block-editor";
import classNames from "classnames";
import { __ } from "@wordpress/i18n";
import { PanelBody } from "@wordpress/components";
import { ImageControl, SinglePostSearch, Spacer } from "../../js/block-editor";
import RightSVG from "./RightSVG";
import LeftSVG from "./LeftSVG";

export default function edit({ attributes, setAttributes, isSelected, clientId }) {
  const blockProps = useBlockProps({
    className: classNames("mt-contact-section-primary", {
      "is-selected": isSelected,
      "not-selected": !isSelected,
    }),
  });

  return (
    <>
      <InspectorControls>
        <PanelBody title={__("Left side employees", "mt")}>
          <p>Left top employee</p>
          <SinglePostSearch
            value={attributes.leftTopEmployee}
            postType={"employee"}
            type={"employee"}
            onChange={(leftTopEmployee) => setAttributes({ leftTopEmployee })}
          />
          <Spacer spacing={24} />
          <p>Left middle employee</p>
          <SinglePostSearch
            value={attributes.leftMiddleEmployee}
            postType={"employee"}
            type={"employee"}
            onChange={(leftMiddleEmployee) => setAttributes({ leftMiddleEmployee })}
          />
          <Spacer spacing={24} />
          <p>Left bottom employee</p>
          <SinglePostSearch
            value={attributes.leftBottomEmployee}
            postType={"employee"}
            type={"employee"}
            onChange={(leftBottomEmployee) => setAttributes({ leftBottomEmployee })}
          />
        </PanelBody>
        <PanelBody title={__("Right side employees", "mt")}>
          <p>Right top employee</p>
          <SinglePostSearch
            value={attributes.rightTopEmployee}
            postType={"employee"}
            type={"employee"}
            onChange={(rightTopEmployee) => setAttributes({ rightTopEmployee })}
          />
          <Spacer spacing={24} />
          <p>Right middle employee</p>
          <SinglePostSearch
            value={attributes.rightMiddleEmployee}
            postType={"employee"}
            type={"employee"}
            onChange={(rightMiddleEmployee) => setAttributes({ rightMiddleEmployee })}
          />
          <Spacer spacing={24} />
          <p>Right bottom employee</p>
          <SinglePostSearch
            value={attributes.rightBottomEmployee}
            postType={"employee"}
            type={"employee"}
            onChange={(rightBottomEmployee) => setAttributes({ rightBottomEmployee })}
          />
        </PanelBody>
      </InspectorControls>
      <section {...blockProps}>
        <div className="mt-contact-section-primary__inner">
          <LeftSVG attributes={attributes} />
          <div className="mt-contact-section-primary__content page-container">
            <div className="mt-contact-section-primary__text-container">
              <InnerBlocks
                allowedBlocks={["ma/tagline", "ma/heading", "core/paragraph", "ma/buttons"]}
                template={[
                  ["ma/tagline"],
                  ["ma/heading"],
                  ["core/paragraph"],
                  [
                    "ma/buttons",
                    {},
                    [
                      [
                        "ma/button",
                        {
                          type: "primary",
                        },
                      ],
                    ],
                  ],
                ]}
                renderAppender={InnerBlocks.ButtonBlockAppender}
              />
            </div>
          </div>
          <RightSVG attributes={attributes} />
        </div>
      </section>
    </>
  );
}
