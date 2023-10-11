import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import useAdsChain from '../../Hooks/useAdsChain'
import { DataGrid } from '@mui/x-data-grid';
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from 'dayjs';

function AdsChains() {
    const { chain } = useAdsChain();

    const columns = [
        { field: 'clubs', headerName: 'Club', width: 200 },
        { field: 'sku', headerName: 'Sku', width: 200 },
        { field: 'ads', headerName: 'Average', width: 200 },
        { field: 'sales', headerName: 'Sales', width: 200 },
        { field: 'divisor', headerName: 'Divisor', width: 200 },
        { field: 'startDate', headerName: 'Start Date', width: 200 },
        { field: 'endDate', headerName: 'End Date', width: 200 },
    ];

    const handlePageChange = () => {
        console.log('page changed');
    }

    const handlePageSizeChange = () => {
        console.log('page size changed');
    }

    if (chain.data.length > 0) {
        return (
            <Box sx={{ height: 520, width: '95%', margin: 'auto' }}>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Box display="flex" alignItems="flex-start" justifyContent="space-evenly">
                        <Grid container spacing={1} direction="row">
                            <Grid item xs={3}>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    size="small"
                                    label="Sku"
                                    name="Sku"
                                // value={request.Sku} // Default to an empty string if undefined
                                // onChange={handleChange}
                                >
                                </TextField>
                            </Grid>
                            <Grid item xs={3}>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    size="small"
                                    label="Club"
                                    name="Club"
                                // value={request.Club}
                                // onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={3} display="flex" flexGrow={"inherit"}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        sx={{ marginBottom: '10px', width: "150px", maxWidth: "300px" }}
                                        //   onChange={(e: Dayjs) => { handleDateChange(e)}}
                                        label="Start Date"
                                        //   value={startDate ?  startDate : dayjs(Date.now())}
                                        slotProps={{ textField: { size: 'small', fullWidth: true } }}
                                    />
                                </LocalizationProvider>
                            </Grid>
                            <Grid item xs>
                                <Button
                                    sx={{
                                        backgroundColor: "#1C3766",
                                        color: "white",
                                        fontWeight: "fontWeightBold"
                                    }}
                                    // onClick={() => {
                                    //   fetchAdsClubs();
                                    // }}
                                    variant="contained"
                                >Apply</Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <DataGrid
                    columns={columns} rows={...chain.data}
                    rowHeight={38}
                    checkboxSelection
                    disableRowSelectionOnClick
                    onFilterModelChange={(e) => console.log(e)}
                    onSortModelChange={(e) => console.log(e)}
                    onPaginationModelChange={(e) => console.log(e)} />
            </Box>
        )
    }
    else {
        return (
            <Box sx={{ height: 520, width: '100%' }}>
                test
            </Box>
        )
    }

}

export default AdsChains