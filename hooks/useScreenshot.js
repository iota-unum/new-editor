import { toJpeg, toPng } from 'html-to-image'
import React from 'react'

/**
 * Hook to generate screenshot
 */
function useScreenshot() {
  const captureRef = React.useRef()

  const [status, setStatus] = React.useState('idle')

  async function generateImage(reference, imgSize) {
    console.log('outer function')
    // console.log('REFERENCE', reference)
    if (!reference) {
      // console.log('DIV NOT MOUNTED YET')
      return
    }
    try {
      console.log('inizio')
      setStatus('loading')
      const [width, height] = imgSize
      const imgBase64 = await toJpeg(reference, {
        quality: 7,
        pixelRatio: 1,
        width,
        height
        ,
      })
      setStatus('success')
      console.log('success')
      //   download(imgBase64, 'generated.png')
      return imgBase64
    } catch (error) {
      setStatus('error')
      console.error(error)
    }
  }

  return {
    generateImage,
    captureRef,
    status,
  }
}

export default useScreenshot
