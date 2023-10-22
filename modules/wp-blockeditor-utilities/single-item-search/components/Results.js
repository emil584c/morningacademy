import Result from './Result'

export default function Results ({ results, onChange }) {
  const items = results.map((el, i) => <Result key={i} {...el} onClick={() => onChange(el)}/>)
  return (
    <div className={'sp-search__results'}>
      {items}
    </div>
  )
}
