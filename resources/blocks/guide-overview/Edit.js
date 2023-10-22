import {
  useBlockProps,
} from "@wordpress/block-editor";
import { __ } from '@wordpress/i18n'
import Message from "../../js/block-controls/Message";

export default function Edit ({ attributes, setAttributes, isSelected, clientId }) {
  const blockProps = useBlockProps({
    className: 'mt-guide-overview'
  })

  return (
    <section {...blockProps}>
      <Message
            content={__("Her vises 4 guides og bruger specifikke guides", "mf")}
            position={"top"}
          />            
    </section>
  )
}
