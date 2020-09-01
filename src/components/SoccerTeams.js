import React, { Component } from 'react';
import axios from 'axios';
import '../App.css';

class SoccerTeams extends Component {

    state = { selectRow: [], teamsDetails: [], selected: [] }

    getData = () => {
        const authAxios = axios.create({
            headers: {
                'X-Auth-Token': 'f89a60081fa14988bfc882f9721da9e2'
            }
        })
        authAxios.get('https://api.football-data.org/v2/teams?X-Auth-Token=f89a60081fa14988bfc882f9721da9e2')
            .then(res => {

                console.log(res.data.teams);
                const favorites = JSON.parse(localStorage.getItem('Favorite'));
                res.data.teams.forEach((team, i) => {
                    team.favorite = favorites ? favorites[i].favorite : false;
                });
                this.setState({ teamsDetails: res.data.teams })
                console.log(this.state.teamsDetails);
            })
            .catch(err => {
                console.log(err);
            })
    }

    componentDidMount() {
        this.getData()
        localStorage.getItem('Fevorite')
    }

    render() {

        return (
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Fvorite</th>
                            <th scope="col">Name</th>
                            <th scope="col">Year-Founded</th>
                            <th scope="col">Crest</th>
                        </tr>
                    </thead>
                    <tbody className='tableHover'>
                        {this.state.teamsDetails.map((team, i) => {
                            return (
                                <tr key={i} onClick={this.changeColor(i)} >
                                    <td>{
                                        team.favorite
                                            ?
                                            <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-heart-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
                                            </svg>
                                            :
                                            <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-heart" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" d="M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                                            </svg>

                                    }</td>
                                    <td>{team.name}</td>
                                    <td>{team.founded}</td>
                                    <td><img src={team.crestUrl} alt='crestUrl' className='crestUrl' /></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>     
            </div>
        );
    }

    changeColor = (selectRow) => e => {
        if (selectRow !== undefined) {
            const teamsDetails = this.state.teamsDetails;
            teamsDetails[selectRow].favorite = !teamsDetails[selectRow].favorite
            this.setState({ teamsDetails })
            console.log(this.state.teamsDetails);
            localStorage.setItem('Favorite', JSON.stringify(teamsDetails))

        }
    }

}

export default SoccerTeams;