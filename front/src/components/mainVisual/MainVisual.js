import React from 'react';
import PropTypes from 'prop-types';
import './index.css';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Work from '../work/work';

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const MainVisual = () => {
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className="main-container">
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider', justifyContent: 'flex-end', display: 'flex' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs">
                        <Tab label="장애인 일자리" {...a11yProps(0)} />
                        <Tab label="지역별 일자리" {...a11yProps(1)} />
                        <Tab label="산업재해" {...a11yProps(2)} />
                    </Tabs>
                </Box>
                <CustomTabPanel value={value} index={0}>
                    <Work />
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                    지역별 일자리
                </CustomTabPanel>
                <CustomTabPanel value={value} index={2}>
                    산업재해
                </CustomTabPanel>
            </Box>
        </div>
    )
}

export default MainVisual;