import React from 'react'
import TagItem from './TagItem'
import PropTypes from 'prop-types'

export default function Taglist ({ threads, setActiveTag }) {
  const tags = threads.map(thread => thread.category)
  // new Set() will remove duplicate tags
  const uniqueTags = [...new Set(tags)]
  return uniqueTags.map(tag => <TagItem key={tag} tag={tag} setActiveTag={setActiveTag}/>)
}

Taglist.propTypes = {
  threads: PropTypes.array,
  setActiveTag: PropTypes.func
}
