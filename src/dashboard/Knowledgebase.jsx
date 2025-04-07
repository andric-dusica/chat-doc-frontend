import React from 'react'
import filePages from '../assets/img/file_pages.svg';
import botImg from '../assets/logo/logo.png';



function KnowledgebaseMsg({ message, type }) {
    return (
        <div className='botMessage'>
            <img className='' src={botImg} alt='profile photo' style={{ width: '20px', height: '20px' }} />
            <div className='textMessageBot'>
                <p>
                    How are you?
                </p>
                <div className='filePages'>
                    <img className='' src={filePages} alt='file_pages' /> 
                    <p className='pages'>
                        <span>1</span>
                        <span>2</span> 
                        <span>3</span>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default KnowledgebaseMsg;