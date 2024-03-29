import React, {useEffect, useState} from 'react';
import {Button, ButtonGroup, CircularProgress, Grid, Typography} from "@material-ui/core";
import {MY_BASE_PATH, MY_GAMES, MY_GAMES_FILTER} from "../resources/ApiUrls";
import axios from "axios";
import GridGames from "../components/GridGames/GridGames";
import {useHistory} from "react-router-dom";
import SearchBar from "../components/SearchBar/SearchBar";
import {makeStyles} from "@material-ui/core/styles";
import eldenImage from "../img/elden_background.jpeg"
import {AppColors} from "../resources/AppColors";
import {LabelsMain} from "../locale/en";
import styled from "@emotion/styled";
import ProfileButton from "../components/ProfileButton/ProfileButton";

const ButtonToggle = styled(Button)`
  opacity: 1;
  background-color: #1D1D1D;
  color: #6563FF ${({active}) =>
          active &&
          `opacity: 1;
        background-color: ${AppColors.PRIMARY};
        color: white;
        &:hover {
            color: white;
            background-color: #6563FF;
          }
        `};

`;


const useStyles = makeStyles((theme) => ({

    singleBlogBg: {
        content: '',
        position: "relative",
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%)',
        opacity: ".5",
    }, imageIcon: {
        height: '100%'
    }, avatar: {
        border: '1px solid #C6D2E3',
        "&.MuiAvatar-img": {
            width: '20px',
            height: '20px',

        }

    }, root: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        "& > *:not(:last-child)": {
            marginRight: theme.spacing(2)
        }
    }


}))

const MainPage = () => {
    const [games, setGames] = useState();
    const history = useHistory()
    const classes = useStyles();
    const sort_text = {popular: LabelsMain.POPULAR, released: LabelsMain.RELEASED, rating: LabelsMain.RATING};
    const [sortActive, setSortActive] = useState("popular");
    const [loading, setLoading] = useState(false);

    //Function to get all the games
    const getGames = async () => {
        try {
            var data = []
            const response = await axios.get(`${MY_BASE_PATH}${MY_GAMES}`);
            setGames(response.data.games[0].results)
            setLoading(false)

        } catch (err) {
            console.log(err.message)
        }
    }


    const getGamesFilter = async () => {
        try {
            var data = []
            const response = await axios.get(`${MY_BASE_PATH}${MY_GAMES_FILTER(sortActive)}`);
            setGames(response.data.games.results)
            setLoading(false)

        } catch (err) {
            console.log(err.message)
        }
    }


    useEffect(() => {

        setLoading(true)
        switch (sortActive) {
            case "popular":
                getGames()
                break
            case "released":
                getGamesFilter()
                break
            case "rating":
                getGamesFilter()
                break
        }
    }, [sortActive]);

    return (
        <>
            <Grid container alignItems={"center"}>
                <Grid container alignItems="flex-start"
                      direction={"column"} style={{
                    backgroundImage: `linear-gradient(to bottom, rgba(255,255,255,0), rgba(29,29,29,1)),url(${eldenImage})`,
                    backgroundSize: "cover",

                }}>
                    <Grid container direction={"row"} justifyContent={"space-between"} spacing={20}>
                        <Grid item style={{margin: '2em'}}>
                            <SearchBar/>
                        </Grid>

                        <Grid item style={{margin: '2em'}}>
                            <ProfileButton/>
                        </Grid>


                    </Grid>
                    <Grid item style={{margin: '4em'}}>
                        <Typography style={{
                            fontSize: '100px',
                            color: AppColors.WHITE,
                            fontWeight: 'bold'
                        }}>{LabelsMain.WELCOME}</Typography>
                        <Typography
                            style={{
                                fontSize: '80px',
                                color: AppColors.YELLOW_SUBTEXT,
                                fontWeight: 'bold'
                            }}>{LabelsMain.DOLOR}</Typography>
                    </Grid>
                </Grid>
                <Grid container
                      direction={"column"}>
                    <Grid item style={{marginLeft: '4em'}}>
                        <Typography
                            style={{
                                fontSize: '40px',
                                color: AppColors.WHITE,
                                fontWeight: 'bold'
                            }}>{LabelsMain.DISCOVERY}</Typography>
                    </Grid>
                    <Grid container>
                        <Grid item style={{marginBottom: '4em', marginLeft: '4em'}}>
                            <Typography
                                style={{fontSize: '20px', color: AppColors.SUBTEXT}}>{LabelsMain.SORT}</Typography>
                        </Grid>
                        <Grid item style={{marginLeft: '5em'}}>
                            <ButtonGroup style={{width: '500px'}} color="primary"
                                         aria-label="outlined primary button group">
                                {Object.entries(sort_text).map(([key, value]) => (
                                    <ButtonToggle active={sortActive === key}
                                                  onClick={() => (setSortActive(key))}>
                                        {value}
                                    </ButtonToggle>
                                ))}
                            </ButtonGroup>
                        </Grid>

                    </Grid>
                    {
                        loading ?
                            <div style={{display: 'flex', justifyContent: 'center'}}>
                                <CircularProgress/>
                            </div>
                            :
                            <Grid item>
                                {games && <GridGames mainPage={true} games={games}/>}
                            </Grid>}
                </Grid>
            </Grid>
        </>
    )
}

export default MainPage;
