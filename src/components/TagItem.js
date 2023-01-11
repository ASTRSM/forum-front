import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

export default function TagItem ({ tag, setActiveTag }) {
  const activeTag = useSelector((states) => states.activeTag)

  useEffect(() => {
    if (activeTag === tag) {
      document.getElementById(tag).classList.add('tag-active')
    } else {
      document.getElementById(tag).classList.remove('tag-active')
    }
  }, [activeTag, tag])

  return (
    <div className="tag-item">
      <button className="tag transition-01" id={tag} onClick={setActiveTag}>{tag}</button>
    </div>
  )
}

TagItem.propTypes = {
  tag: PropTypes.string,
  setActiveTag: PropTypes.func
}
