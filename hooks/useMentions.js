import React, {useEffect} from 'react'

const useMentions = () => {
    useEffect(() => {
        function handleMentions(e) {
          const char = e.key
          
          if(char === '@' || char === '#') {
            document.execCommand(document.execCommand('foreColor', true, '000000'))      }
          if(char === ' ') {
            document.execCommand(document.execCommand('foreColor', true, 'FFFFFF'))      }
    
        }
      
         
    
        document.addEventListener('keypress', handleMentions)
        
        
        return () => {
          document.removeEventListener('keypress', handleMentions)
        }
      }, [])
  
}

export default useMentions