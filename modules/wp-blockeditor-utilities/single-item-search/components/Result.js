import { Button } from '@wordpress/components'

export default function Result ({ id, title, type, onClick }) {
  return (
    <Button className={'sp-search__result'} onClick={onClick} data-post-id={id}>
      <span className={'post-title'}>{title}</span>
      <span className={'post-type'}>{type}</span>
    </Button>
  )
}
