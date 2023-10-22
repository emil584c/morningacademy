import { useDispatch } from '@wordpress/data'
import { Button } from '@wordpress/components'

export default function DeleteBlockButton ({ clientId, icon = 'trash', title = 'Delete Block', variant = 'primary' }) {
  const { removeBlock } = useDispatch('core/block-editor')

  return (
    <Button
      variant={variant}
      isDestructive
      icon={icon}
      title={title}
      onClick={() => removeBlock(clientId)}
    />
  )
}
