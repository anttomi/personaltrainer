import React, {useState} from 'react';
import AppBar from'@material-ui/core/AppBar';
import Tabs from'@material-ui/core/Tabs';
import Tab from'@material-ui/core/Tab';
import Customerlist from './Customerlist'
import Traininglist from './Traininglist'
import TrainingsCalendar from './TrainingsCalendar'

function TabApp() {
    const [value, setValue] = useState('customerlist')

    const changeValue = (event, value) => {
        setValue(value)
    }
    return (
    <div>
        <AppBar position="static">
            <Tabs value={value} onChange={changeValue}>
                <Tab value="customerlist" label="Customerlist" />
                <Tab value="traininglist" label="Traininglist"/>
                <Tab value="calendar" label="Calendar"/>
            </Tabs>
        </AppBar>
        {value === 'customerlist' && <Customerlist/>}
        {value === 'traininglist' && <Traininglist/>}
        {value === 'calendar' && <TrainingsCalendar/>}

    </div>
    );
}

export default TabApp;