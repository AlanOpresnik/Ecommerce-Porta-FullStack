import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import React from 'react'

const FaqItemUi = ({faq}) => {
    return (
        <div className='w-full'>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ArrowDownwardIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                >
                    <div className='flex justify-between w-full'>
                        <p className='font-semibold'>{faq.question}</p>
                    </div>
                </AccordionSummary>
                <AccordionDetails>
                    <p>
                        {faq.answer}
                    </p>
                </AccordionDetails>
            </Accordion>
        </div>
    )
}

export default FaqItemUi