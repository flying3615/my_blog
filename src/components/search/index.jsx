import React, { useState, useEffect, createRef } from 'react'
import {
  InstantSearch,
  Index,
  Hits,
  connectStateResults
} from 'react-instantsearch-dom'
import algoliasearch from 'algoliasearch/lite'
import CssBaseline from '@material-ui/core/CssBaseline'
import { Root, HitsWrapper, PoweredBy } from './styles'
import Input from './input'
import * as hitComps from './hitComps'
import Typography from '@material-ui/core/Typography'

const Results = connectStateResults(
  ({ searchState: state, searchResults: res, children }) =>
    res && res.nbHits > 0 ? children : `No results for '${state.query}'`
)

const Stats = connectStateResults(
  ({ searchResults: res }) =>
    res && res.nbHits > 0 && `${res.nbHits} result${res.nbHits > 1 ? `s` : ``}`
)

const useClickOutside = (ref, handler, events) => {
  if (!events) events = [`mousedown`, `touchstart`]
  const detectClickOutside = event =>
    !ref.current.contains(event.target) && handler()
  useEffect(() => {
    for (const event of events) { document.addEventListener(event, detectClickOutside) }
    return () => {
      for (const event of events) { document.removeEventListener(event, detectClickOutside) }
    }
  })
}

export default function Search ({ indices, collapse, hitsAsGrid }) {
  const ref = createRef()
  const [query, setQuery] = useState(``)
  const [focus, setFocus] = useState(false)
  const searchClient = algoliasearch(
    process.env.GATSBY_ALGOLIA_APP_ID,
    process.env.GATSBY_ALGOLIA_SEARCH_KEY
  )
  useClickOutside(ref, () => setFocus(false))

  const show = query.length > 0 && focus ? { display: 'grid' } : { display: 'none' }

  return (
    <InstantSearch
      searchClient={searchClient}
      indexName={indices[0].name}
      onSearchStateChange={({ query }) => setQuery(query)}
      root={{ Root, props: { ref } }}
    >
      <CssBaseline />
      <Input onFocus={() => setFocus(true)} {...{ collapse, focus }} />

      <HitsWrapper asGrid={hitsAsGrid} style={show} >
        {indices.map(({ name, title, hitComp }) => (
          <Index key={name} indexName={name}>
            <header>
              <Typography gutterBottom variant="display" component="h2">{title}</Typography>
              <Stats />
            </header>
            <Results>
              <Hits hitComponent={hitComps[hitComp](() => setFocus(false))} />
            </Results>
          </Index>
        ))}
        <PoweredBy />
      </HitsWrapper>

    </InstantSearch>
  )
}
