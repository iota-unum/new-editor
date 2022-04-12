import React, { useState } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
function Playground() {
  const [isOpen, setIsOpen] = useState(true);
  const percentage = 66;
  return (
    <div className='playground'>

<CircularProgressbar value={percentage} text={`3`} > 

</CircularProgressbar>
;



<style global jsx>

  {`
  .playground {
    width: 20%;
  }
  
  .CircularProgressbar-path {
  stroke: rgb(221, 255, 0) !important;
}
.CircularProgressbar-trail {
  stroke: rgb(218, 23, 23);
}
.CircularProgressbar-text {
  fill: yellow;
}
.CircularProgressbar-background {
  fill: green;
}
  `}
</style>
    </div>
  );
}

export default Playground;
