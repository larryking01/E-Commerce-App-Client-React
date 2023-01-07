import React from 'react'
// import { Row, Col } from 'react-bootstrap'
import Footer from './Footer'





const FAQs = () => {

  // the FAQs array
  let faqsArray = [
    {
      question: 'What is the weather like for holidays in the Caribbean?',
      answer: 'The Caribbean’s tropical climate brings warmth and sunshine all year round, supporting Caribbean holidays as the destination of choice for many holidaymakers. Added to this, the Caribbean Sea has an average temperature of 27 degrees. During the summer months, from May to October, the temperature heats up and the islands see the most significant rainfall, which is heavier on north-east facing coasts and mountains. This is when the Atlantic hurricane season affects the Caribbean, bringing slightly increased rainfall and stronger winds, however, major storms are very rare. In the event of a hurricane we have a hurricane policy in place.'
    },

    {
      question: 'What is the weather like for holidays in the Caribbean?',
      answer: 'The Caribbean’s tropical climate brings warmth and sunshine all year round, supporting Caribbean holidays as the destination of choice for many holidaymakers. Added to this, the Caribbean Sea has an average temperature of 27 degrees. During the summer months, from May to October, the temperature heats up and the islands see the most significant rainfall, which is heavier on north-east facing coasts and mountains. This is when the Atlantic hurricane season affects the Caribbean, bringing slightly increased rainfall and stronger winds, however, major storms are very rare. In the event of a hurricane we have a hurricane policy in place.'
    },

    {
      question: 'What is the weather like for holidays in the Caribbean?',
      answer: 'The Caribbean’s tropical climate brings warmth and sunshine all year round, supporting Caribbean holidays as the destination of choice for many holidaymakers. Added to this, the Caribbean Sea has an average temperature of 27 degrees. During the summer months, from May to October, the temperature heats up and the islands see the most significant rainfall, which is heavier on north-east facing coasts and mountains. This is when the Atlantic hurricane season affects the Caribbean, bringing slightly increased rainfall and stronger winds, however, major storms are very rare. In the event of a hurricane we have a hurricane policy in place.'
    },

    {
      question: 'What is the weather like for holidays in the Caribbean?',
      answer: 'The Caribbean’s tropical climate brings warmth and sunshine all year round, supporting Caribbean holidays as the destination of choice for many holidaymakers. Added to this, the Caribbean Sea has an average temperature of 27 degrees. During the summer months, from May to October, the temperature heats up and the islands see the most significant rainfall, which is heavier on north-east facing coasts and mountains. This is when the Atlantic hurricane season affects the Caribbean, bringing slightly increased rainfall and stronger winds, however, major storms are very rare. In the event of a hurricane we have a hurricane policy in place.'
    },

    {
      question: 'What is the weather like for holidays in the Caribbean?',
      answer: 'The Caribbean’s tropical climate brings warmth and sunshine all year round, supporting Caribbean holidays as the destination of choice for many holidaymakers. Added to this, the Caribbean Sea has an average temperature of 27 degrees. During the summer months, from May to October, the temperature heats up and the islands see the most significant rainfall, which is heavier on north-east facing coasts and mountains. This is when the Atlantic hurricane season affects the Caribbean, bringing slightly increased rainfall and stronger winds, however, major storms are very rare. In the event of a hurricane we have a hurricane policy in place.'
    },

    {
      question: 'What is the weather like for holidays in the Caribbean?',
      answer: 'The Caribbean’s tropical climate brings warmth and sunshine all year round, supporting Caribbean holidays as the destination of choice for many holidaymakers. Added to this, the Caribbean Sea has an average temperature of 27 degrees. During the summer months, from May to October, the temperature heats up and the islands see the most significant rainfall, which is heavier on north-east facing coasts and mountains. This is when the Atlantic hurricane season affects the Caribbean, bringing slightly increased rainfall and stronger winds, however, major storms are very rare. In the event of a hurricane we have a hurricane policy in place.'
    }

  ]


  return (

    <div>
      <div className='faq-title mt-4'>
          <h3 className='faq-title-text'>Frequently Asked Questions</h3>
      </div>

      <div className='faq-body'>
        {

          faqsArray.map((faq, index) => (
            <div className={ index % 2 === 0? 'light' : 'dark'}>
              <div className='faq-item'>
              <h3>{ faq.question }</h3>
              <span>{ faq.answer }</span>
              </div>
            </div>
        ))

        }

      </div>





    <Footer />

    </div>

  )


}




export default FAQs