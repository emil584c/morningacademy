import { ToolbarDropdownMenu, SVG, Path, SelectControl } from '@wordpress/components'
import { Icon } from '@wordpress/icons'
import { __ } from '@wordpress/i18n'

const HeadingSelector = ({
  value,
  onChange
}) => {

  const headings = {
    h1: <SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><Path d="M17.6 7c-.6.9-1.5 1.7-2.6 2v1h2v7h2V7h-1.4zM11 11H7V7H5v10h2v-4h4v4h2V7h-2v4z" /></SVG>,
    h2: <SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><Path d="M9 11.1H5v-4H3v10h2v-4h4v4h2v-10H9v4zm8 4c.5-.4.6-.6 1.1-1.1.4-.4.8-.8 1.2-1.3.3-.4.6-.8.9-1.3.2-.4.3-.8.3-1.3 0-.4-.1-.9-.3-1.3-.2-.4-.4-.7-.8-1-.3-.3-.7-.5-1.2-.6-.5-.2-1-.2-1.5-.2-.4 0-.7 0-1.1.1-.3.1-.7.2-1 .3-.3.1-.6.3-.9.5-.3.2-.6.4-.8.7l1.2 1.2c.3-.3.6-.5 1-.7.4-.2.7-.3 1.2-.3s.9.1 1.3.4c.3.3.5.7.5 1.1 0 .4-.1.8-.4 1.1-.3.5-.6.9-1 1.2-.4.4-1 .9-1.6 1.4-.6.5-1.4 1.1-2.2 1.6v1.5h8v-2H17z" /></SVG>,
    h3: <SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><Path d="M9 11H5V7H3v10h2v-4h4v4h2V7H9v4zm11.3 1.7c-.4-.4-1-.7-1.6-.8v-.1c.6-.2 1.1-.5 1.5-.9.3-.4.5-.8.5-1.3 0-.4-.1-.8-.3-1.1-.2-.3-.5-.6-.8-.8-.4-.2-.8-.4-1.2-.5-.6-.1-1.1-.2-1.6-.2-.6 0-1.3.1-1.8.3s-1.1.5-1.6.9l1.2 1.4c.4-.2.7-.4 1.1-.6.3-.2.7-.3 1.1-.3.4 0 .8.1 1.1.3.3.2.4.5.4.8 0 .4-.2.7-.6.9-.7.3-1.5.5-2.2.4v1.6c.5 0 1 0 1.5.1.3.1.7.2 1 .3.2.1.4.2.5.4s.1.4.1.6c0 .3-.2.7-.5.8-.4.2-.9.3-1.4.3s-1-.1-1.4-.3c-.4-.2-.8-.4-1.2-.7L13 15.6c.5.4 1 .8 1.6 1 .7.3 1.5.4 2.3.4.6 0 1.1-.1 1.6-.2.4-.1.9-.2 1.3-.5.4-.2.7-.5.9-.9.2-.4.3-.8.3-1.2 0-.6-.3-1.1-.7-1.5z" /></SVG>,
    h4: <SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><Path d="M20 13V7h-3l-4 6v2h5v2h2v-2h1v-2h-1zm-2 0h-2.8L18 9v4zm-9-2H5V7H3v10h2v-4h4v4h2V7H9v4z" /></SVG>,
    h5: <SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><Path d="M9 11H5V7H3v10h2v-4h4v4h2V7H9v4zm11.7 1.2c-.2-.3-.5-.7-.8-.9-.3-.3-.7-.5-1.1-.6-.5-.1-.9-.2-1.4-.2-.2 0-.5.1-.7.1-.2.1-.5.1-.7.2l.1-1.9h4.3V7H14l-.3 5 1 .6.5-.2.4-.1c.1-.1.3-.1.4-.1h.5c.5 0 1 .1 1.4.4.4.2.6.7.6 1.1 0 .4-.2.8-.6 1.1-.4.3-.9.4-1.4.4-.4 0-.9-.1-1.3-.3-.4-.2-.7-.4-1.1-.7 0 0-1.1 1.4-1 1.5.5.4 1 .8 1.6 1 .7.3 1.5.4 2.3.4.5 0 1-.1 1.5-.3s.9-.4 1.3-.7c.4-.3.7-.7.9-1.1s.3-.9.3-1.4-.1-1-.3-1.4z" /></SVG>,
    h6: <SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><Path d="M20.7 12.4c-.2-.3-.4-.6-.7-.9s-.6-.5-1-.6c-.4-.2-.8-.2-1.2-.2-.5 0-.9.1-1.3.3s-.8.5-1.2.8c0-.5 0-.9.2-1.4l.6-.9c.2-.2.5-.4.8-.5.6-.2 1.3-.2 1.9 0 .3.1.6.3.8.5 0 0 1.3-1.3 1.3-1.4-.4-.3-.9-.6-1.4-.8-.6-.2-1.3-.3-2-.3-.6 0-1.1.1-1.7.4-.5.2-1 .5-1.4.9-.4.4-.8 1-1 1.6-.3.7-.4 1.5-.4 2.3s.1 1.5.3 2.1c.2.6.6 1.1 1 1.5.4.4.9.7 1.4.9 1 .3 2 .3 3 0 .4-.1.8-.3 1.2-.6.3-.3.6-.6.8-1 .2-.5.3-.9.3-1.4s-.1-.9-.3-1.3zm-2 2.1c-.1.2-.3.4-.4.5-.1.1-.3.2-.5.2-.2.1-.4.1-.6.1-.2.1-.5 0-.7-.1-.2 0-.3-.2-.5-.3-.1-.2-.3-.4-.4-.6-.2-.3-.3-.7-.3-1 .3-.3.6-.5 1-.7.3-.1.7-.2 1-.2.4 0 .8.1 1.1.3.3.3.4.7.4 1.1 0 .2 0 .5-.1.7zM9 11H5V7H3v10h2v-4h4v4h2V7H9v4z" /></SVG>,
    p: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><defs><clipPath id="b"><rect width="24" height="24"/></clipPath></defs><g id="a" clipPath="url(#b)"><g transform="translate(-84 7)"><path d="M96.184,0h-2.3A.879.879,0,0,0,93,.879V5.488s0,0,0,0,0,0,0,0V9.121a.879.879,0,0,0,1.758,0V6.367h1.426a3.184,3.184,0,0,0,0-6.367Zm0,4.609H94.758V1.758h1.426a1.426,1.426,0,1,1,0,2.852Z"/></g></g></svg>
  }

  const controls = () => {
    const controlsArray = []

    for (const [k, v] of Object.entries(headings)) {
      controlsArray.push({
        icon: <Icon icon={v} className={value === k ? 'mt-heading-tag--is-active' : ''} />,
        onClick: () => onChange(k)
      })
    }

    return controlsArray
  }

  return <ToolbarDropdownMenu
    icon={<span>{headings[value]}</span>}
    label={__('Select Tag', 'mf')}
    controls={controls()}
  />
}

HeadingSelector.SelectControl = ({
  value,
  onChange,
  label = __('Choose Title Tag', 'mf')
}) => {
  return <SelectControl
    label={label}
    value={value}
    onChange={onChange}
    options={[
      { label: __('H1', 'mf'), value: 'h1' },
      { label: __('H2', 'mf'), value: 'h2' },
      { label: __('H3', 'mf'), value: 'h3' },
      { label: __('H4', 'mf'), value: 'h4' },
      { label: __('H5', 'mf'), value: 'h5' },
      { label: __('H6', 'mf'), value: 'h6' },
      { label: __('P', 'mf'), value: 'p' }
    ]}
  />
}

export default HeadingSelector
