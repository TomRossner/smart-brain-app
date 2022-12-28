import React from 'react';

const BoundingBox = ({box}) => {
    const {left, top, right, bottom} = box;
  return (
    <div className='bounding-box' style={{left: left, top: top, right: right, bottom: bottom}}></div>
  )
}

export default BoundingBox;