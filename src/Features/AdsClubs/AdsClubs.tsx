import axios, { AxiosRequestConfig } from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import IAdsPaginationResponse from "./Interface/Response/AdsPaginationResponse.interface.interface";
import IAdsPaginationRequest from "./Interface/Request/AdsPaginationRequest.interface";
import { Box, Button, Card, CardContent, CardHeader, CircularProgress, Grid, MenuItem, Pagination, Select, Table, TableBody, TableCell, TableHead, TableRow, TableSortLabel, TextField, Typography, styled, tableCellClasses } from "@mui/material";
import IAdsClubs from "./Interface/AdsClubs.interface";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#1C3766",
    color: theme.palette.common.white,
    fontWeight: "bold",
  },
}));

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const StyledTableCellSmall = styled(TableCell)(({ theme }) => ({
  padding: "8px 16px",
  fontSize: "12px",
}));

const AdsClubs = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<IAdsPaginationResponse>({
    data: [] as IAdsClubs[],
    pageCount: 0
  });

  const [request, setRequest] = useState<IAdsPaginationRequest>({
    PageNumber: 1,
    Club: '',
    PageSize: 10,
    Sku: '',
    StartDate: ''
  });
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc" | "";
  }>({
    key: "",
    direction: "asc",
  });

  const handleSortClick = (key: string) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });

    const arrowIcons = document.querySelectorAll('.MuiTableSortLabel-icon');
    arrowIcons.forEach(icon => {
      const arrow = icon as HTMLElement;
      arrow.style.color = "white";
    });
  };

  const fetchAdsClubs = async () => {
    try {
      setLoading(true);

      const getItem: AxiosRequestConfig = {
        method: 'POST',
        url: `https://localhost:7020/api/TotalAdsClub/GetPaginatedTotalAdsClubs`,
        data: request,
      };
      const response1 = await axios(getItem);

      if (response1 != null) {
        console.log("API Response:", response1.data); // Debugging line

        setResponse(response1.data);
        console.log("State Response:", response, "test");
      }
    } catch (error) {
      console.error("Error fetching item:", error);
    } finally {
      if (response.data !== undefined) {
        setLoading(false);
      }
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRequest({
      ...request,
      [name]: value,
    });

  };

  const convertDate = (date: string) => {
    const dateObject = new Date(date);
    const formattedDate = dateObject.toLocaleDateString();

    return formattedDate;
  }

  useEffect(() => {
    document.title = 'Ads | Per Clubs';
    fetchAdsClubs()
  }, [request.PageNumber, request.PageSize]);

  if (!loading && response.data !== undefined) {
    console.log(response.data, "test1")
    return (
      <Box>

        <Box margin="16px">
          <Card sx={{ maxWidth: "100%", height: "100%" }}>
            <CardHeader
              title="Ads Per Clubs"
              sx={{
                backgroundColor: "#1C3766",
                color: "white",
                fontWeight: "fontWeightBold"
              }}
            />
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box display="flex" alignItems="center">
                  <Typography sx={{ fontWeight: "fontWeightBold" }}>Show</Typography>
                  <Box marginLeft={1}>
                    <Select
                      value={request.PageSize}
                      variant="outlined"
                      size="small"
                      name="PageSize"
                      onChange={(e) => {
                        setRequest({
                          ...request,
                          PageSize: e.target.value
                        });
                      }}
                    >
                      <MenuItem value={10}>10</MenuItem>
                      <MenuItem value={25}>25</MenuItem>
                      <MenuItem value={50}>50</MenuItem>
                      <MenuItem value={100}>100</MenuItem>
                    </Select>
                  </Box>
                  <Box marginLeft={1}>
                    <Typography sx={{ fontWeight: "fontWeightBold" }}>entries</Typography>
                  </Box>
                </Box>
                <Box display="flex" alignItems="center">
                  {/* <Box marginRight={1}>
                    <Typography sx={{ fontWeight: "fontWeightBold" }}>Search:</Typography>
                  </Box> */}
                  <Grid container spacing={2} direction="row">
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        variant="outlined"
                        size="small"
                        label="Sku"
                        name="Sku"
                        value={request.Sku} // Default to an empty string if undefined
                        onChange={handleChange}
                      // error={submitted && !fieldValues.DCId}
                      // helperText={submitted && !fieldValues.DCId && "DC Code is required"}
                      >
                      </TextField>
                    </Grid>
                    <Grid item xs>
                      <TextField
                        fullWidth
                        variant="outlined"
                        size="small"
                        label="Club"
                        name="Club"
                        value={request.Club}
                        onChange={handleChange}
                      // onChange={(e) => handleChange("BuildingName", e.target.value.trim() === ''? '' : e.target.value)}
                      // error={submitted && !fieldValues.BuildingName}
                      // helperText={submitted && !fieldValues.BuildingName && "Building Name is required"}
                      />
                    </Grid>
                    <Grid item xs>
                      <TextField
                        fullWidth
                        variant="outlined"
                        size="small"
                        label="Start Date"
                        required
                        name="StartDate"
                        value={request.StartDate}
                        onChange={handleChange}
                      // onChange={(e) => handleChange("Address1", e.target.value.trim() === ''? '' : e.target.value)}
                      // error={submitted && !fieldValues.Address1}
                      // helperText={submitted && !fieldValues.Address1 && "Address Line 1 is required"}
                      />
                    </Grid>
                    <Grid item xs>
                      <Button
                        onClick={() => {
                          fetchAdsClubs();
                        }}
                        variant="contained"
                      >Submit</Button>
                    </Grid>
                  </Grid>
                  {/* <TextField variant="outlined"
                    size="small"
                    value={searchQuery}
                    onChange={(event) => {
                      const query = event.target.value;
                      setSearchQuery(query);
                      setPage(1);
                    }} /> */}
                </Box>
              </Box>
              <Box marginTop={2}>
                <Box sx={{ minWidth: 800 }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <StyledTableCell>
                          <TableSortLabel
                            active={sortConfig.key === "clubs"}
                            direction={sortConfig.direction as "asc" | "desc" | undefined}
                            onClick={() => handleSortClick("clubs")}
                            IconComponent={ArrowDownwardIcon}
                            sx={{
                              color: sortConfig.key === "clubs" ? "white !important" : "white !important",
                              "&:hover": {
                                color: "white",
                              },
                              "&.MuiTableSortLabel-active": {
                                color: "white ",
                              },
                            }}
                          >
                            Clubs
                          </TableSortLabel>
                        </StyledTableCell>
                        <StyledTableCell>
                          <TableSortLabel
                            active={sortConfig.key === "sku"}
                            direction={sortConfig.direction as "asc" | "desc" | undefined}
                            onClick={() => handleSortClick("sku")}
                            IconComponent={ArrowDownwardIcon}
                            sx={{
                              color: sortConfig.key === "sku" ? "white !important" : "white !important",
                              "&:hover": {
                                color: "white",
                              },
                              "&.MuiTableSortLabel-active": {
                                color: "white ",
                              },
                            }}
                          >
                            Sku
                          </TableSortLabel>
                        </StyledTableCell>
                        <StyledTableCell>
                          <TableSortLabel
                            active={sortConfig.key === "ads"}
                            direction={sortConfig.direction as "asc" | "desc" | undefined}
                            onClick={() => handleSortClick("ads")}
                            IconComponent={ArrowDownwardIcon}
                            sx={{
                              color: sortConfig.key === "ads" ? "white !important" : "white !important",
                              "&:hover": {
                                color: "white",
                              },
                              "&.MuiTableSortLabel-active": {
                                color: "white !important",
                              },
                            }}
                          >
                            Ads
                          </TableSortLabel>
                        </StyledTableCell>
                        <StyledTableCell>
                          <TableSortLabel
                            active={sortConfig.key === "divisor"}
                            direction={sortConfig.direction as "asc" | "desc" | undefined}
                            onClick={() => handleSortClick("divisor")}
                            IconComponent={ArrowDownwardIcon}
                            sx={{
                              color: sortConfig.key === "divisor" ? "white !important" : "white !important",
                              "&:hover": {
                                color: "white",
                              },
                              "&.MuiTableSortLabel-active": {
                                color: "white !important",
                              },
                            }}
                          >
                            Divisor
                          </TableSortLabel>
                        </StyledTableCell>
                        <StyledTableCell>
                          <TableSortLabel
                            active={sortConfig.key === "sales"}
                            direction={sortConfig.direction as "asc" | "desc" | undefined}
                            onClick={() => handleSortClick("sales")}
                            IconComponent={ArrowDownwardIcon}
                            sx={{
                              color: sortConfig.key === "sales" ? "white !important" : "white !important",
                              "&:hover": {
                                color: "white",
                              },
                              "&.MuiTableSortLabel-active": {
                                color: "white !important",
                              },
                            }}
                          >
                            Sales
                          </TableSortLabel>
                        </StyledTableCell>
                        <StyledTableCell>
                          <TableSortLabel
                            active={sortConfig.key === "startDate"}
                            direction={sortConfig.direction as "asc" | "desc" | undefined}
                            onClick={() => handleSortClick("startDate")}
                            IconComponent={ArrowDownwardIcon}
                            sx={{
                              color: sortConfig.key === "startDate" ? "white !important" : "white !important",
                              "&:hover": {
                                color: "white",
                              },
                              "&.MuiTableSortLabel-active": {
                                color: "white !important",
                              },
                            }}
                          >
                            Start Date
                          </TableSortLabel>
                        </StyledTableCell>
                        <StyledTableCell>
                          <TableSortLabel
                            active={sortConfig.key === "endDate"}
                            direction={sortConfig.direction as "asc" | "desc" | undefined}
                            onClick={() => handleSortClick("endDate")}
                            IconComponent={ArrowDownwardIcon}
                            sx={{
                              color: sortConfig.key === "endDate" ? "white !important" : "white !important",
                              "&:hover": {
                                color: "white",
                              },
                              "&.MuiTableSortLabel-active": {
                                color: "white !important",
                              },
                            }}
                          >
                            End Date
                          </TableSortLabel>
                        </StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {
                        // response.data === null || undefined
                        //   ?
                        //   <TableRow hover>
                        //     <TableCell align="center" colSpan={15}>No Data</TableCell>
                        //   </TableRow>
                        //   :
                        response.data.map((item: IAdsClubs) => {
                          const endDate = convertDate(item.endDate)
                          const startDate = convertDate(item.startDate)

                          return (
                            <TableRow hover key={item.id}>
                              <StyledTableCellSmall>{item.clubs}</StyledTableCellSmall>
                              <StyledTableCellSmall>{item.sku}</StyledTableCellSmall>
                              <StyledTableCellSmall>{item.ads}</StyledTableCellSmall>
                              <StyledTableCellSmall>{item.divisor}</StyledTableCellSmall>
                              <StyledTableCellSmall>{item.sales}</StyledTableCellSmall>
                              <StyledTableCellSmall>{startDate}</StyledTableCellSmall>
                              <StyledTableCellSmall>{endDate}</StyledTableCellSmall>
                            </TableRow>
                          );
                        })}
                    </TableBody>
                  </Table>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
                <Pagination
                  variant="outlined"
                  shape="rounded"
                  count={response.pageCount}
                  page={request.PageNumber}
                  onChange={(event, value) => {
                    setRequest({
                      ...request,
                      PageNumber: value,
                    })
                  }}
                />
              </Box>
            </CardContent>
          </Card>
        </Box>

      </Box>

    )
  } else {
    console.log(response.data, "test2")
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100vh"
      >
        <CircularProgress size={80} />
        <Typography variant="h6" color="textSecondary" style={{ marginTop: '16px' }}>
          Loading...
        </Typography>
      </Box>
    );
  }

}

export default AdsClubs