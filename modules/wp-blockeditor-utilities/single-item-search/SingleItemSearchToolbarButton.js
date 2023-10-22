import { SingleItemSearch } from '../index'
import { Popover, ToolbarButton } from '@wordpress/components'
import { useMemo, useState } from '@wordpress/element'
import { search } from '@wordpress/icons'
import { __ } from '@wordpress/i18n'

export default function SingleItemSearchToolbarButton ({
  onChange,
  icon = search,
  title = __('Search'),
  placeholder = undefined,
  isActive = undefined,
  isDisabled = undefined,
  subType = undefined,
  perPage = undefined,
  type = undefined,
}) {
  const [isPopover, setIsPopover] = useState(false)
  const [popoverAnchor, setPopoverAnchor] = useState(null)

  const popoverProps = useMemo(
    () => ({
      anchor: popoverAnchor,
      onClose: () => setIsPopover(false)
    }),
    [popoverAnchor]
  )

  const toolbarButtonProps = {
    icon: icon,
    title: title,
    isActive: isActive,
    isDisabled: isDisabled,
    ref: setPopoverAnchor,
    onClick: () => setIsPopover(true)
  }

  const searchProps = {
    placeholder: placeholder,
    onChange: onChange,
    subType: subType,
    perPage: perPage,
    type: type,
  }

  return (
    <>
      <ToolbarButton {...toolbarButtonProps}/>
      {isPopover && <Popover {...popoverProps}>
        <SingleItemSearch {...searchProps}/>
      </Popover>}
    </>
  )
}
