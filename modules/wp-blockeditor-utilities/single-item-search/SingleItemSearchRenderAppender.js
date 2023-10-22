import { SingleItemSearch } from '../index'
import { Button, Popover } from '@wordpress/components'
import { useMemo, useState } from '@wordpress/element'
import { plus } from '@wordpress/icons'
import { __ } from '@wordpress/i18n'

export default function SingleItemSearchRenderAppender ({
  onChange,
  icon = plus,
  title = __('Search'),
  placeholder = undefined,
  subType = undefined,
  perPage = undefined,
  type = undefined,
  className = 'single-item-search__render-appender'
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

  const buttonProps = {
    className: className,
    icon: icon,
    label: title,
    showTooltip: true,
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
      <Button {...buttonProps}/>
      {isPopover && <Popover {...popoverProps}>
        <SingleItemSearch {...searchProps}/>
      </Popover>}
    </>
  )
}
