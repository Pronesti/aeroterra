import React from 'react'
import {Card} from 'antd';

export default function PopUp({visible, children}) {
    if(visible){
        return (
            <Card>
                {children}
            </Card>
        )
    }else{
        return <React.Fragment />
    }
    }
    
